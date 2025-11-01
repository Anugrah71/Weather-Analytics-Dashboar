const express = require("express");
const { getCache, setCache } = require("../utils/cache");

const router = express.Router();

//  Current weather
router.get("/current", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing city name" });

    const cacheKey = `current_${q}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json({ source: "cache", ...cached });

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}&aqi=no`;
    console.log("Fetching current:", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();

    setCache(cacheKey, data);
    res.json({ source: "api", ...data });
  } catch (err) {
    console.error("Current weather error:", err);
    res
      .status(500)
      .json({
        error: "Server error fetching current weather",
        details: err.message,
      });
  }
});

//  Forecast (5–7 days + hourly)
router.get("/forecast", async (req, res) => {
  try {
    const { q, days = 7 } = req.query;
    if (!q) return res.status(400).json({ error: "Missing city name" });

    const cacheKey = `forecast_${q}_${days}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json({ source: "cache", ...cached });

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=${days}&aqi=no&alerts=no`;
    console.log("Fetching forecast:", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();

    setCache(cacheKey, data);
    res.json({ source: "api", ...data });
  } catch (err) {
    console.error("Forecast error:", err);
    res
      .status(500)
      .json({ error: "Server error fetching forecast", details: err.message });
  }
});

//  Historical Data
router.get("/history", async (req, res) => {
  try {
    const { q, date } = req.query;
    if (!q || !date)
      return res.status(400).json({ error: "Missing city name or date" });

    const cacheKey = `history_${q}_${date}`;
    const cached = get(cacheKey);
    if (cached) return res.json({ source: "cache", ...cached });

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${q}&dt=${date}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();

    set(cacheKey, data);
    res.json({ source: "api", ...data });
  } catch (err) {
    console.error("History error:", err);
    res
      .status(500)
      .json({ error: "Server error fetching history", details: err.message });
  }
});

// Search / Autocomplete
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query" });

    const cacheKey = `search_${q}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json({ source: "cache", ...cached });

    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${q}`;
    console.log("Fetching search:", url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();

    setCache(cacheKey, data); 
    res.json({ source: "api", results: data });
  } catch (err) {
    console.error("Search error:", err);
    res
      .status(500)
      .json({
        error: "Server error fetching search results",
        details: err.message,
      });
  }
});

module.exports = router;
