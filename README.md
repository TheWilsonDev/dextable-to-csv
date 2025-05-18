# Dextable to CSV

This tool converts HTML table data from Dexscreener pages into CSV format, suitable for data analysis in various tools.

## Features

- Extracts key trading data: Date, Type, Amounts (USD, Token, Native), Price, Maker Address, and Transaction Hash.
- Processes all `.html` files found in the `data/input` directory.
- Generates a corresponding `.csv` file for each input HTML file in the `data/output` directory.
- Handles numbers with commas and properly formats CSV output.
- Creates the output directory if it doesn't exist.

## Prerequisites

- Node.js (v14 or later recommended)
- npm (comes with Node.js)

## Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/dextable-to-csv.git
    cd dextable-to-csv
    ```

    _(Replace `your-username` with your actual GitHub username after creating the repository)_

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

1.  **Place your HTML files in the `data/input` directory.**

    - The repository includes example HTML files in `data/input` for your reference. You can use these to test the script or replace them with your own Dexscreener HTML data.
    - See the "How to get HTML from Dexscreener" section below.

2.  **Run the conversion script:**

    ```bash
    npm start
    ```

    Alternatively, you can run:

    ```bash
    node convert.js
    ```

3.  **Find your CSV files.**
    - The script will process each `.html` file in `data/input` and save the corresponding CSV data to a file with the same name (but with a `.csv` extension) in the `data/output` directory. For example, `data/input/mytrades.html` will be converted to `data/output/mytrades.csv`.

## How to get HTML from Dexscreener

1.  Go to the Dexscreener page for the trading pair you want to analyze (e.g., a specific token pair).
2.  Locate the "Top Trades" or similar table showing recent transactions.
3.  Right-click anywhere on the table.
4.  Select "Inspect" or "Inspect Element" from the context menu. This will open your browser's developer tools.
5.  In the developer tools, find the HTML element that encompasses the entire table. This is often a `<table>` tag or a `<div>` that wraps the table. Ensure you select the main table containing all the rows and columns of trade data.
6.  Right-click on the selected HTML element.
7.  Choose "Copy" > "Copy outerHTML" (or a similar option like "Copy as HTML").
8.  Paste the copied HTML content into a new text file.
9.  Save this file with an `.html` extension (e.g., `sol-usdc-trades.html`) inside the `data/input` directory of this project.

## Directory Structure

```
dextable-to-csv/
├── .git/
├── .gitignore
├── convert.js         # The main conversion script
├── data/
│   ├── input/         # Place your source HTML files here (examples provided)
│   └── output/        # Generated CSV files will be saved here (gitignored)
├── node_modules/      # Project dependencies (gitignored)
├── package-lock.json
├── package.json       # Project metadata and dependencies
└── README.md          # This file
```

## CSV Output Format

The output CSV files will contain the following columns:

- `Date`: Date and time of the trade.
- `Type`: Type of trade (e.g., "Buy" or "Sell").
- `USD Amount`: Value of the trade in USD.
- `Token Amount`: Amount of the token traded.
- `Native Amount`: Amount of the native currency (e.g., SOL, ETH) traded.
- `Price`: Price of the token at the time of the trade.
- `Maker`: Wallet address of the maker.
- `Transaction`: Transaction hash.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a new Pull Request.

Alternatively, you can open an issue to discuss changes or report bugs.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details (if you choose to add one - a `LICENSE` file is not strictly necessary for the MIT license if specified here).
You can typically just create a file named `LICENSE` in the root of your project and paste the MIT License text into it.
For convenience, the MIT License text is:

```
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

Replace `[year]` and `[fullname]` with the current year and your name/organization name.
