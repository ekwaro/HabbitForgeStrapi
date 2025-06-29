const tips = require('./tip.js');
const dotenv = require('dotenv');
const axios = require('axios');

// ✅ Load env first
dotenv.config();

const STRAPI_URL = "http://localhost:1337/api/tips";
const STRAPI_LOGIN_URL = "http://localhost:1337/api/auth/local";

// ✅ Login credentials from .env or hardcoded (for local dev)
const identifier = process.env.STRAPI_ADMIN_EMAIL || 'dominicnoelchris@gmail.com';
const password = process.env.STRAPI_ADMIN_PASSWORD || 'Razor@123#';

async function seedTips() {

  try {
    // ✅ Get JWT by logging in
    const loginRes = await fetch(STRAPI_LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
      console.error("❌ Login failed:", loginData.error?.message || "Unknown error");
      return;
    }

    const jwt = loginData.jwt;
    console.log("✅ Logged in, seeding tips...", jwt);

    for (const tip of tips) {
      try {
        await axios.post(
          STRAPI_URL,
          { data: tip },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log(`✅ Created: ${tip.text.slice(0, 50)}...`);
      } catch (error) {
        console.error(`❌ Failed to create: ${tip.text?.slice(0, 50)}...`);
        console.error("Error:", error.response?.data || error.message);
      }
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

seedTips();
