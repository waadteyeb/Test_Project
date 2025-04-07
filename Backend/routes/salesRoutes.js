const express = require("express");
const {
  getBestInfluencer,
  getSalesPercentagePerInfluencer,
  getSalesMetrics,
} = require("../controllers/salesController");

const router = express.Router();

router.get("/best-influencer/:brandId", getBestInfluencer);
router.get("/sales-percentage/:brandId", getSalesPercentagePerInfluencer);
router.get("/sales-metrics/:brandId", getSalesMetrics);

module.exports = router;
