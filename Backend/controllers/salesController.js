const mysql = require("mysql2/promise");
const DB_CONFIG = require("../dbConfig"); 

// Helper function to execute SQL queries
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

// Get the best influencer based on brand ID from sales
async function getBestInfluencer(req, res) {
  const { brandId } = req.params;
  const { from, to } = req.query; 

  try {
    let bestInfluencerQuery = `
      SELECT s.affiliateid, u.firstName, SUM(s.amount) AS total_sales
      FROM sales s
      JOIN influencers u ON s.affiliateid = u.affiliate_id
      WHERE s.brand_id = ?
    `;

    if (from && to) {
      bestInfluencerQuery += ` AND s.createdat BETWEEN ? AND ?`;
    }

    bestInfluencerQuery += `
      GROUP BY s.affiliateid
      ORDER BY total_sales DESC
      LIMIT 1
    `;

    const params = from && to ? [brandId, from, to] : [brandId];
    const bestInfluencer = await executeQuery(bestInfluencerQuery, params);

    if (bestInfluencer.length > 0) {
      res.status(200).json({
        bestInfluencer: bestInfluencer[0],
      });
    } else {
      res.status(404).json({ message: "No sales data found for this brand." });
    }
  } catch (error) {
    console.error("Error fetching best influencer:", error);
    res.status(500).json({ message: "Failed to fetch best influencer" });
  }
}

// Get the sales percentage per influencer for a given brand
async function getSalesPercentagePerInfluencer(req, res) {
  const { brandId } = req.params;
  const { from, to } = req.query; 

  try {
    let totalSalesQuery = `
      SELECT SUM(s.amount) AS total_sales
      FROM sales s
      WHERE s.brand_id = ?
    `;

    if (from && to) {
      totalSalesQuery += ` AND s.createdat BETWEEN ? AND ?`;
    }

    const totalSalesResult = await executeQuery(
      totalSalesQuery,
      from && to ? [brandId, from, to] : [brandId]
    );
    const totalSales = totalSalesResult[0]?.total_sales || 0;

    if (totalSales === 0) {
      return res
        .status(404)
        .json({ message: "No sales data found for this brand." });
    }

    let salesPerInfluencerQuery = `
      SELECT s.affiliateid, u.firstName, SUM(s.amount) AS total_sales
      FROM sales s
      JOIN influencers u ON s.affiliateid = u.affiliate_id
      WHERE s.brand_id = ?
    `;

    if (from && to) {
      salesPerInfluencerQuery += ` AND s.createdat BETWEEN ? AND ?`;
    }

    salesPerInfluencerQuery += `
      GROUP BY s.affiliateid
      ORDER BY total_sales DESC
    `;

    const salesPerInfluencer = await executeQuery(
      salesPerInfluencerQuery,
      from && to ? [brandId, from, to] : [brandId]
    );

    if (salesPerInfluencer.length > 0) {
      const salesPercentage = salesPerInfluencer.map((influencer) => ({
        userId: influencer.affiliate_id,
        name: influencer.name,
        total_sales: influencer.total_sales,
        percentage_of_total_sales: parseFloat(
          ((influencer.total_sales / totalSales) * 100).toFixed(2)
        ),
      }));

      res.status(200).json( salesPercentage );
    } else {
      res.status(404).json({ message: "No sales data found for this brand." });
    }
  } catch (error) {
    console.error("Error fetching sales percentage per influencer:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch sales percentage per influencer" });
  }
}

// Get Chiffre d'Affaires (CA), Transactions, and Panier Moyen (average basket value) for a given brand
async function getSalesMetrics(req, res) {
  const { brandId } = req.params;
  const { from, to } = req.query; 

  try {
    // Query for CA (Chiffre d'Affaires) - Total sales
    let totalSalesQuery = `
      SELECT SUM(s.amount) AS total_sales
      FROM sales s
      WHERE s.brand_id = ?
    `;

    if (from && to) {
      totalSalesQuery += ` AND s.createdat BETWEEN ? AND ?`;
    }

    const totalSalesResult = await executeQuery(
      totalSalesQuery,
      from && to ? [brandId, from, to] : [brandId]
    );
    const totalSales = totalSalesResult[0]?.total_sales || 0;

    // Query for total transactions (number of sales)
    let totalTransactionsQuery = `
      SELECT COUNT(*) AS total_transactions
      FROM sales s
      WHERE s.brand_id = ?
    `;

    if (from && to) {
      totalTransactionsQuery += ` AND s.createdat BETWEEN ? AND ?`;
    }

    const totalTransactionsResult = await executeQuery(
      totalTransactionsQuery,
      from && to ? [brandId, from, to] : [brandId]
    );
    const totalTransactions =
      totalTransactionsResult[0]?.total_transactions || 0;

    // Calculate Panier Moyen (average basket value)
    let panierMoyen = 0;
    if (totalTransactions > 0) {
      panierMoyen = (totalSales / totalTransactions).toFixed(2);
    }

    
    res.status(200).json({
      CA: totalSales,
      transactions: totalTransactions,
      panierMoyen: panierMoyen,
    });
  } catch (error) {
    console.error("Error fetching sales metrics:", error);
    res.status(500).json({ message: "Failed to fetch sales metrics" });
  }
}

module.exports = {
  getBestInfluencer,
  getSalesPercentagePerInfluencer,
  getSalesMetrics,
};
