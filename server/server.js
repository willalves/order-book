const puppeteer = require('puppeteer');
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs').promises

const app = express();
const PORT = 5000;

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

// GET categories from goodreads
app.get('/categories', async (req, res) => {
  // Set path
  const location = './public/categories/categories.json';

  // Start browser
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1920,
      height: 1080,
    },
    ignoreDefaultArgs: ['--disable-extensions']
  });

  // Open page
  const page = await browser.newPage();
  await page.goto("https://www.goodreads.com/choiceawards/best-books-2020");

  //Take categories names
  const categories = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#categories > div > div > a > h4")).map(x => x.textContent)
  })
  console.log(categories);
  await fs.writeFile(location, JSON.stringify(categories, null, 4))

  await browser.close();

  res.json({
    success: true,
    categories
    // categories: ['test', 'test1'],
  });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server has started on port ", PORT);
});