// Upstream restaurant data provider configuration.
// Host is read from env so it is not hard-coded in the client bundle.
const PROVIDER_HOST =
  process.env.DATA_PROVIDER_HOST || "https://www.swiggy.com";

const REQUEST_HEADERS = {
  "Content-Type": "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
};

const buildListUrl = (lat, lng) =>
  `${PROVIDER_HOST}/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

const buildMenuUrl = (lat, lng, restaurantId) =>
  `${PROVIDER_HOST}/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`;

const fetchUpstream = async (url) => {
  const response = await fetch(url, { headers: REQUEST_HEADERS });
  const body = await response.text();
  return { status: response.status, body };
};

module.exports = { buildListUrl, buildMenuUrl, fetchUpstream };
