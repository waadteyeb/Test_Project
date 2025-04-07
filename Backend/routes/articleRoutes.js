const express = require("express");
const { getArticleStatistics } = require("../controllers/articleController");

const router = express.Router();

// Route to get article statistics based on brand ID and optional date range
router.get("/statistics/:brandId", getArticleStatistics);

module.exports = router;