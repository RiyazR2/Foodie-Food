const { buildMenuUrl, fetchUpstream } = require("./_upstream");

module.exports = async (req, res) => {
  const { lat, lng, restaurantId } = req.query || {};

  if (!lat || !lng || !restaurantId) {
    res.status(400).json({ error: "lat, lng and restaurantId are required" });
    return;
  }

  try {
    const { status, body } = await fetchUpstream(
      buildMenuUrl(lat, lng, restaurantId),
    );
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    res.status(status).send(body);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
};
