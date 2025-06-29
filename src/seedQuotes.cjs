// seedQuotes.js
const axios = require("axios");
const dotenv = require("dotenv");
const motivation = require("./myquotes.js");

dotenv.config();
// Replace with your Strapi URL
const STRAPI_URL = "http://localhost:1337/api/quotes";
; // Load environment variables from .env file

// Replace with your Bearer token (JWT)
const AUTH_TOKEN = process.env.STRAPI_AUTH_TOKEN  
const quotes = motivation

async function seedQuotes() {
  for (const quote of quotes) {
    console.log(quote)
    try {
      const res = await axios.post(
        STRAPI_URL,
        { data: quote },
        {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`✅ Created: ${quote.text.slice(0, 50)}...`);
    } catch (error) {
      console.error(`❌ Failed to create: ${quote.text.slice(0, 50)}...`);
      console.error(error.response?.data || error.message);
      if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
  }
  else if(error.request){
     console.error("No response received. Check CORS or server.");
    console.error(error.request);

  }
  else {
    console.error("Error:", error.message);
  }
    }
  }
}



seedQuotes();


