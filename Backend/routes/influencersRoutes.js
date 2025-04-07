const express = require("express");
const { getTotalInfluencers, getActiveInfluencers } = require("../controllers/influencersController");

const router = express.Router();

// Route to get the total number of influencers for a given brand
router.get("/total-influencers/:brandId", getTotalInfluencers);

// Route to get the total number of active influencers for a given brand
router.get("/active-influencers/:brandId", getActiveInfluencers);

module.exports = router;
