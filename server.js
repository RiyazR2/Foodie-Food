const http = require("http");
const { URL } = require("url");

const PORT = process.env.PORT || 3001;

const handlers = {
  "/api/restaurants": require("./api/restaurants"),
  "/api/menu": require("./api/menu"),
  "/api/ai": require("./api/ai"),
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const requestUrl = new URL(
    req.url,
    `http://${req.headers.host || "localhost"}`,
  );
  const handler = handlers[requestUrl.pathname];

  if (!handler) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }

  const query = Object.fromEntries(requestUrl.searchParams.entries());
  const handlerReq = { ...req, query, body: undefined };
  const chunks = [];

  req.on("data", (chunk) => chunks.push(chunk));
  req.on("end", async () => {
    if (chunks.length) {
      try {
        handlerReq.body = JSON.parse(Buffer.concat(chunks).toString());
      } catch {
        handlerReq.body = {};
      }
    }

    const handlerRes = {
      setHeader: (name, value) => res.setHeader(name, value),
      status: (code) => {
        res.statusCode = code;
        return handlerRes;
      },
      json: (value) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(value));
      },
      send: (value) => res.end(value),
    };

    try {
      await handler(handlerReq, handlerRes);
    } catch (error) {
      if (!res.writableEnded) {
        res.statusCode = 500;
        res.end("Internal server error");
      }
    }
  });
});

server.listen(PORT);
