const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const HEADERS = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
};

// Proxy for restaurant list API
app.get("/api/restaurants", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(url, { headers: HEADERS });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Restaurant list error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy for restaurant menu API (uses /mapi/ to bypass WAF)
app.get("/api/menu", async (req, res) => {
  try {
    const { lat, lng, restaurantId } = req.query;
    const url = `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

    const response = await fetch(url, { headers: HEADERS });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Menu error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
