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

// Get statistics based on brand ID and optional date range (from-to)
async function getArticleStatistics(req, res) {
  const { brandId } = req.params;
  const { from, to } = req.query; // Get optional "from" and "to" dates from the query parameters

  let dateFilter = "";
  let params = [brandId];

  // If both 'from' and 'to' are provided, add date range filter to the query
  if (from && to) {
    dateFilter = " AND s.createdat BETWEEN ? AND ?";
    params.push(from, to);
  } else if (from) {
    dateFilter = " AND s.createdat >= ?";
    params.push(from);
  } else if (to) {
    dateFilter = " AND s.createdat <= ?";
    params.push(to);
  }

  try {
    // 1. Most Used Article (Based on the highest total sales amount)
    const mostUsedArticleQuery = `
      SELECT a.id, a.name, SUM(s.amount) AS total_sales
      FROM sales s
      JOIN articles a ON s.articleid = a.id
      WHERE a.brand_id = ? ${dateFilter}
      GROUP BY a.id
      ORDER BY total_sales DESC
      LIMIT 1
    `;
    const mostUsedArticle = await executeQuery(mostUsedArticleQuery, params);

    // 2. Most Liked Article (Based on the highest number of likes)
    const mostLikedArticleQuery = `
    SELECT a.id, a.name, a.likesNbr
    FROM articles a
    JOIN sales s ON s.articleid = a.id
    WHERE a.brand_id = ? ${dateFilter}
    ORDER BY a.likesNbr DESC
    LIMIT 1
  `;

    const mostLikedArticle = await executeQuery(mostLikedArticleQuery, params);

    // 3. Most Liked Category (Based on the highest number of likes for articles in the category)
    const mostLikedCategoryQuery = `
    SELECT a.categ, SUM(a.likesNbr) AS total_likes
    FROM articles a
    JOIN sales s ON s.articleid = a.id
    WHERE a.brand_id = ? ${dateFilter}
    GROUP BY a.categ
    ORDER BY total_likes DESC
    LIMIT 1
  `;

    const mostLikedCategory = await executeQuery(
      mostLikedCategoryQuery,
      params
    );

    // 4. Most Liked Color (Based on the highest number of likes for articles with a color)
    const mostLikedColorQuery = `
    SELECT a.maincolor, SUM(a.likesNbr) AS total_likes
    FROM articles a
    JOIN sales s ON s.articleid = a.id
    WHERE a.brand_id = ? ${dateFilter}
    GROUP BY a.maincolor
    ORDER BY total_likes DESC
    LIMIT 1
  `;

    const mostLikedColor = await executeQuery(mostLikedColorQuery, params);

    // 5. Best Day of the Week (Based on sales)
    const bestDayOfWeekQuery = `
      SELECT DAYOFWEEK(s.createdat) AS day_of_week, COUNT(*) AS total_sales
      FROM sales s
      JOIN articles a ON s.articleid = a.id
      WHERE a.brand_id = ? ${dateFilter}
      GROUP BY day_of_week
      ORDER BY total_sales DESC
      LIMIT 1
    `;
    const bestDayOfWeek = await executeQuery(bestDayOfWeekQuery, params);

    // 6. Best Time of Day (Based on sales)
    const bestTimeOfDayQuery = `
      SELECT HOUR(s.createdat) AS hour_of_day, COUNT(*) AS total_sales
      FROM sales s
      JOIN articles a ON s.articleid = a.id
      WHERE a.brand_id = ? ${dateFilter}
      GROUP BY hour_of_day
      ORDER BY total_sales DESC
      LIMIT 1
    `;
    const bestTimeOfDay = await executeQuery(bestTimeOfDayQuery, params);

    // 7. Best Country (Based on sales)
    const bestCountryQuery = `
      SELECT s.countrycode, COUNT(*) AS total_sales
      FROM sales s
      JOIN articles a ON s.articleid = a.id
      WHERE a.brand_id = ? ${dateFilter}
      GROUP BY s.countrycode
      ORDER BY total_sales DESC
      LIMIT 1
    `;
    const bestCountry = await executeQuery(bestCountryQuery, params);

    // Return the statistics in the response
    res.status(200).json({
      mostUsedArticle: mostUsedArticle[0] || '',
      mostLikedArticle: mostLikedArticle[0] || '',
      mostLikedCategory: mostLikedCategory[0] ||'',
      mostLikedColor: mostLikedColor[0] || '',
      bestDayOfWeek: bestDayOfWeek[0] || '',
      bestTimeOfDay: bestTimeOfDay[0] || '',
      bestCountry: bestCountry[0] || '',
    });
  } catch (error) {
    console.error("Error fetching article statistics:", error);
    res.status(500).json({ message: "Failed to fetch article statistics" });
  }
}

module.exports = {
  getArticleStatistics,
};
