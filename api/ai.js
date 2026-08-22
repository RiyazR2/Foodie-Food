const { TASKS } = require("./_prompts");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-120b";

const readBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch (e) {
      return {};
    }
  }
  return req.body;
};

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "AI service is not configured" });
    return;
  }

  const { task, payload } = readBody(req);
  const config = TASKS[task];

  if (!config) {
    res.status(400).json({ error: "Unknown task" });
    return;
  }

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: config.system },
          { role: "user", content: config.build(payload) },
        ],
        temperature: config.temperature,
        max_tokens: config.maxTokens,
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      res.status(response.status).json({ error: "AI request failed" });
      return;
    }

    const json = await response.json();
    const content = json?.choices?.[0]?.message?.content;

    res.status(200).json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ error: "AI request failed" });
  }
};
