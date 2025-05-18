const fs = require("fs");
const cheerio = require("cheerio");
const path = require("path");

/**
 * Converts HTML table data from a Dexscreener page to CSV format.
 * @param {string} html - The HTML string containing the Dexscreener table.
 * @returns {string} A string representing the data in CSV format.
 */
function convertToCSV(html) {
  const $ = cheerio.load(html);
  const rows = [];

  // Add CSV header
  rows.push(["Date", "Type", "USD Amount", "Token Amount", "Native Amount", "Price", "Maker", "Transaction"]);

  // Process each row in the table
  $("tr[data-index]").each((i, element) => {
    // Note: The following selectors are based on current Dexscreener class names
    // and may need updating if the website's structure changes.
    const date = $(element).find(".custom-1oq7u8k").text().trim();
    const type = $(element).find(".custom-5sgvd2").text().trim();
    const usdAmount = $(element).find(".custom-ujwk84").text().trim();
    const tokenAmount = $(element).find(".custom-dajo9q").eq(0).text().trim();
    const nativeAmount = $(element).find(".custom-dajo9q").eq(1).text().trim();

    // Extract price (handling the special formatting)
    let price = $(element).find(".custom-dajo9q").eq(2).text().trim();
    price = price.replace(/\s+/g, ""); // Remove spaces

    // Extract maker address (short form)
    const maker = $(element).find('.chakra-link[href*="account"]').first().text().trim();

    // Extract transaction hash (using the link)
    const txnLink = $(element).find('.chakra-link[href*="tx"]').attr("href");
    const txnHash = txnLink ? txnLink.split("/").pop() : "";

    // Format fields to handle commas and quotes
    const formatField = (field) => {
      if (field.includes(",") || field.includes('"') || field.includes("\n")) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    };

    // Add row to CSV
    rows.push([formatField(date), formatField(type), formatField(usdAmount), formatField(tokenAmount), formatField(nativeAmount), formatField(price), formatField(maker), formatField(txnHash)]);
  });

  // Convert to CSV format
  return rows.map((row) => row.join(",")).join("\n");
}

/**
 * Main function to read HTML files from the input directory,
 * convert them to CSV, and write them to the output directory.
 */
function main() {
  const inputDir = "data/input";
  const outputDir = "data/output";

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Created output directory: ${outputDir}`);
  }

  // Get all HTML files from input directory
  const files = fs.readdirSync(inputDir).filter((file) => file.endsWith(".html"));

  if (files.length === 0) {
    console.log("No HTML files found in the input directory.");
    return;
  }

  // Process each HTML file
  files.forEach((file) => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(".html", ".csv"));

    console.log(`Processing: ${inputPath}`);

    try {
      // Read the HTML file
      const html = fs.readFileSync(inputPath, "utf8");

      // Convert HTML to CSV
      const csv = convertToCSV(html);

      // Write to output file
      fs.writeFileSync(outputPath, csv);

      console.log(`Created CSV file: ${outputPath}`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  });

  console.log("Conversion complete!");
}

main();
