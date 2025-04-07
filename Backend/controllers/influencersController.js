const mysql = require("mysql2/promise");
const DB_CONFIG = require("../dbConfig"); 


async function executeQuery(query, params) {
  const connection = await mysql.createConnection(DB_CONFIG);
  try {
    const [rows] = await connection.query(query, params);
    return rows;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
}

// Get the total number of influencers for a given brand
async function getTotalInfluencers(req, res) {
  const { brandId } = req.params;
  const { from, to } = req.query; // Optional date range

  try {
    let totalInfluencersQuery = `
      SELECT COUNT(DISTINCT s.affiliateid) AS total_influencers
      FROM sales s
      WHERE s.brand_id = ?
    `;

    
    if (from && to) {
      totalInfluencersQuery += ` AND s.createdat BETWEEN ? AND ?`;
    }

    const params = from && to ? [brandId, from, to] : [brandId];
    const totalInfluencersResult = await executeQuery(
      totalInfluencersQuery,
      params
    );

    const totalInfluencers = totalInfluencersResult[0]?.total_influencers || 0;

    res.status(200).json({ totalInfluencers });
  } catch (error) {
    console.error("Error fetching total influencers:", error);
    res.status(500).json({ message: "Failed to fetch total influencers" });
  }
}

// Get the total number of active influencers for a given brand
async function getActiveInfluencers(req, res) {
  const { brandId } = req.params;
  const { from, to } = req.query; 

  try {
    let activeInfluencersQuery = `
    SELECT COUNT(DISTINCT s.affiliateid) AS active_influencers
    FROM sales s
    JOIN influencers i ON s.affiliateid = i.affiliate_id
    WHERE s.brand_id = ?
    AND i.isOnline = 'true'
  `;

    
    if (from && to) {
      activeInfluencersQuery += ` AND s.createdat BETWEEN ? AND ?`;
    }

    const params = from && to ? [brandId, from, to] : [brandId];
    const activeInfluencersResult = await executeQuery(
      activeInfluencersQuery,
      params
    );

    const activeInfluencers =
      activeInfluencersResult[0]?.active_influencers || 0;

    res.status(200).json({ activeInfluencers });
  } catch (error) {
    console.error("Error fetching active influencers:", error);
    res.status(500).json({ message: "Failed to fetch active influencers" });
  }
}

module.exports = {
  getTotalInfluencers,
  getActiveInfluencers,
};
