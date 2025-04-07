const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();
const articleRoutes = require("./routes/articleRoutes");
const salesRoutes = require("./routes/salesRoutes");
const influencersRoutes = require("./routes/influencersRoutes");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database configuration
const DB_CONFIG = require("./dbConfig");

const TABLE_DEFINITIONS = [
  {
    name: "brands",
    schema: `
      id INT AUTO_INCREMENT PRIMARY KEY,
      description TEXT,
      premium VARCHAR(255),
      href TEXT,
      offerId INT,
      name VARCHAR(255) UNIQUE,
      currency VARCHAR(3),
      createdAt DATETIME,
      displayName VARCHAR(255),
      categ TEXT,
      \`key\` VARCHAR(255),
      localisation TEXT,
      private VARCHAR(255)
    `,
  },
  {
    name: "categories",
    schema: `
      cle VARCHAR(255) PRIMARY KEY,
      img TEXT,
      subCateg TEXT,
      \`text-en\` TEXT,
      \`text-es\` TEXT,
      \`text-fr\` TEXT,
      \`text-pl\` TEXT
    `,
  },
  {
    name: "subcategories",
    schema: `
      cle VARCHAR(255) PRIMARY KEY,
      categ VARCHAR(255),
      \`text-en\` TEXT,
      \`text-fr\` TEXT,
      FOREIGN KEY (categ) REFERENCES categories(cle)
    `,
  },
  {
    name: "colors",
    schema: `
      cle VARCHAR(255) PRIMARY KEY,
      code VARCHAR(255),
      name_en TEXT,
      name_fr TEXT
    `,
  },
  {
    name: "influencers",
    schema: `
      affiliate_id VARCHAR(255) PRIMARY KEY,
      android VARCHAR(255),
      appVersion TEXT,
      bank TEXT,
      banner TEXT,
      camp_blocked DECIMAL(10,2),
      civility TEXT,
      code33 VARCHAR(255),
      country TEXT,
      createdAt DATETIME,
      dateOfBirthTimestamp DATETIME,
      firstName TEXT,
      hasProduct DECIMAL(10,2),
      isOnline DECIMAL(10,2) DEFAULT 0,
      language TEXT,
      lastName TEXT,
      newsletter DECIMAL(10,2),
      phoneCode VARCHAR(255),
      phoneCountryCode TEXT,
      phoneNumber TEXT,
      private DECIMAL(10,2),
      referredBy TEXT,
      uid TEXT,
      univers TEXT,
      \`key\` TEXT,
      agentId TEXT,
      communitySize TEXT,
      favoriteBrandsIds TEXT,
      lastConnexion DATETIME,
      kol_id TEXT,
      ios TEXT,
      activateDirectShortlinks TEXT,
      hasProducts TEXT,
      score TEXT,
      hubspotId TEXT,
      favouriteBrands TEXT,
      verfied TEXT,
      hasEmptyWishlists TEXT,
      latName TEXT,
      stability TEXT,
      amzn_id TEXT
    `,
  },
  {
    name: "articles",
    schema: `
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT,
      image TEXT,
      likesNbr INT,
      offerId INT,
      \`order\` INT,
      site TEXT,
      tracking_link TEXT,
      uid INT,
      url TEXT,
      wishlistId INT,
      articles TEXT,
      createdAt DATETIME,
      hasWishlist TEXT,
      plugin TEXT,
      test TEXT,
      categ VARCHAR(255),
      subcateg VARCHAR(255),
      maincolor VARCHAR(255),
      brand_id INT,
      FOREIGN KEY (categ) REFERENCES categories(cle),
      FOREIGN KEY (subcateg) REFERENCES subcategories(cle),
      FOREIGN KEY (maincolor) REFERENCES colors(cle),
      FOREIGN KEY (brand_id) REFERENCES brands(id)
    `,
  },
  {
    name: "sales",
    schema: `
      id INT AUTO_INCREMENT PRIMARY KEY,
      afclickid INT,
      influencer TEXT,
      offerid INT,
      clickid INT,
      affiliateid VARCHAR(255),
      amount DECIMAL(10,2),
      commission DECIMAL(10,2),
      commissionaffiliate DECIMAL(10,2),
      commissionagent TEXT,
      articleid INT,
      articleimgurl TEXT,
      articlepathurl TEXT,
      brandname TEXT,
      brand_id INT,
      categ TEXT,
      subcateg TEXT,
      maincolor TEXT,
      createdat DATETIME,
      lastmodified DATETIME,
      countrycode TEXT,
      currency VARCHAR(3),
      devisetype TEXT,
      os TEXT,
      goal INT,
      isprivate TEXT,
      status INT,
      advertiser TEXT,
      commissionreferredinfluencer INT,
      customfield2 TEXT,
      customfield3 TEXT,
      customfield4 TEXT,
      customfield5 TEXT,
      customfield6 TEXT,
      paiement_status TEXT,
      sales_bill_id INT,
      referral_bill_id TEXT,
      local_amount DECIMAL(10,2),
      local_commission DECIMAL(10,2),
      currency_exchange DECIMAL(10,2),
      referral_influencer TEXT,
      smi_sales_payment_status INT,
      smi_referral_payment_status INT,
      customfield7 TEXT,
      voucher TEXT,
      FOREIGN KEY (articleid) REFERENCES articles(id),
      FOREIGN KEY (affiliateid) REFERENCES influencers(affiliate_id),
      FOREIGN KEY (brand_id) REFERENCES brands(id)
    `,
  },
];

async function generateSQL() {
  let sql =
    "CREATE DATABASE IF NOT EXISTS dashboard_db;\nUSE dashboard_db;\n\n";

  // Generate DROP TABLE statements in reverse order
  const dropOrder = [...TABLE_DEFINITIONS].reverse();
  sql += dropOrder.map((t) => `DROP TABLE IF EXISTS ${t.name};\n`).join("");

  // Create tables with explicit schemas
  for (const tableDef of TABLE_DEFINITIONS) {
    sql += `CREATE TABLE IF NOT EXISTS ${tableDef.name} (${tableDef.schema});\n\n`;
  }

  return sql;
}

async function insertSampleData() {
  const connection = await mysql.createConnection(DB_CONFIG);

  try {
    console.log("Starting sample data insertion...");

    // Current date and sample dates
    const now = new Date();
    const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
    const twoMonthsAgo = new Date(now.setMonth(now.getMonth() - 1));

    // Insert brands with specific created dates
    await connection.query(`
        INSERT INTO brands (name, createdAt) VALUES 
          ('SampleBrand1', '${twoMonthsAgo
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}'),
          ('SampleBrand2', '${oneMonthAgo
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}')
      `);

    // Insert categories
    await connection.query(`
        INSERT INTO categories (cle) VALUES 
          ('fashion'),
          ('electronics')
      `);

    // Insert subcategories
    await connection.query(`
        INSERT INTO subcategories (cle, categ) VALUES 
          ('shoes', 'fashion'),
          ('laptops', 'electronics')
      `);

    // Insert colors
    await connection.query(`
        INSERT INTO colors (cle, code) VALUES 
          ('red', '#FF0000'),
          ('blue', '#0000FF')
      `);

    // Insert influencers with birth dates and activity dates
    await connection.query(`
    INSERT INTO influencers (
      affiliate_id, firstName, dateOfBirthTimestamp, createdAt, lastConnexion,isOnline
    ) VALUES 
      ('INF001', 'John Doe', '2000-02-06 23:08:00', '2025-02-06 23:08:00', '2025-04-06 22:08:00',1),
      ('INF002', 'Jane Smith', '2001-02-06 23:08:00', '2025-03-06 23:08:00', '2025-04-05 22:08:00',1)
  `);

    // Insert articles with creation dates
    await connection.query(`
        INSERT INTO articles (
          brand_id, categ,name, subcateg, maincolor,
          image, likesNbr, createdAt
        ) VALUES 
          (1, 'fashion', 'shoe1', 'shoes','red', 'shoe.jpg', 100, '${twoMonthsAgo
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}'),
          (2, 'electronics', 'Msi-pc', 'laptops', 'blue', 'laptop.jpg', 200, '${oneMonthAgo
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}')
      `);

 
    await connection.query(`
        INSERT INTO sales (
          articleid, affiliateid, brand_id,
          amount, commission,countrycode, createdat
        ) VALUES 
          (1, 'INF001', 1, 99.99, 10.00,'fr', '${new Date(Date.now() - 86400000)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}'),
          (2, 'INF002', 2, 1499.99, 150.00,'fr', '${new Date()
            .toISOString()
            .slice(0, 19)
            .replace("T", " ")}')
      `);

    console.log("Sample data with dates inserted successfully!");
  } catch (err) {
    console.error("Error inserting sample data:", err);
    throw err;
  } finally {
    await connection.end();
  }
}

async function createTables(sql) {
  const connection = await mysql.createConnection(DB_CONFIG);

  try {
    await connection.query(sql);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error creating tables:", err);
    throw err;
  } finally {
    await connection.end();
  }
}

app.use("/articles", articleRoutes);
app.use("/sales", salesRoutes);
app.use("/influencers", influencersRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  //  Auto-initialize database on startup
  try {
    const sql = await generateSQL();
    await createTables(sql);
    await insertSampleData();
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
});
