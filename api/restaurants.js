const { buildListUrl, fetchUpstream } = require("./_upstream");

module.exports = async (req, res) => {
  const { lat, lng } = req.query || {};

  if (!lat || !lng) {
    res.status(400).json({ error: "lat and lng are required" });
    return;
  }

  try {
    const { status, body } = await fetchUpstream(buildListUrl(lat, lng));
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(status).send(body);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};
