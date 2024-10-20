// controllers/dataController.js
const { googleAuth, authorize } = require("../utils/googleAuth");
const { google } = require("googleapis");

async function getData(req, res) {
  const spreadsheetId = "1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0";
  const range = "Sheet3"; // Ensure this range is valid

  try {
    // Authorize the client
    await authorize();

    // Create a Sheets API client
    const sheets = google.sheets({ version: "v4", auth: googleAuth }); // Use googleAuth here

    // Get data from the specified range
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      majorDimension: "ROWS",
      valueRenderOption: "FORMATTED_VALUE",
      fields: "*",
    });

    const rows = response.data.values;

    if (rows.length) {
      // Transform the rows into an array of objects
      const result = rows.slice(1).map((row) => {
        return {
          day: row[0], // Keeping the date as a string
          age: row[1],
          gender: row[2],
          A: row[3],
          B: row[4],
          C: row[5],
          D: row[6],
          E: row[7],
          F: row[8],
        };
      });

      // Send the transformed data as response
      res.json(result);
    } else {
      console.log("No data found.");
      res.status(404).json({ message: "No data found." });
    }
  } catch (error) {
    console.error("Error accessing the spreadsheet:", error);
    res.status(500).json({ message: "Error accessing the spreadsheet." });
  }
}

// Export the getData function
module.exports = { getData };
