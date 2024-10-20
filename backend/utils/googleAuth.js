// utils/googleAuth.js
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

// Load the service account key JSON file
const KEY_PATH = path.join(__dirname, "googleSheetData.json");
const keys = JSON.parse(fs.readFileSync(KEY_PATH, "utf8"));

// Create a JWT client
const googleAuth = new google.auth.JWT(
  keys.client_email,
  null,
  keys.private_key.replace(/\\n/g, "\n"), // Replace escaped newlines
  ["https://www.googleapis.com/auth/spreadsheets.readonly"] // Scopes
);

// Function to authorize the client
async function authorize() {
  try {
    await googleAuth.authorize();
  } catch (error) {
    console.error("Error authorizing Google client:", error);
  }
}

// Export the authorize function and the JWT client
module.exports = { googleAuth, authorize };
