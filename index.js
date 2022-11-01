console.log("Welcome to the conversor bot!");

const puppeteer = require("puppeteer");
require("dotenv").config();

const bot = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--start-maximized"],
    defaultViewport: null,
  }); // default headless is true
  const page = await browser.newPage();

  // data
  const baseCurrency = process.env.INITIAL_CURRENCY;
  const finalCurrency = process.env.FINAL_CURRENCY;
  const url = `https://www.google.com/search?q=${baseCurrency}+para+${finalCurrency}&rlz=1C1GCEU_pt-BRBR1017BR1017&oq=${baseCurrency}+para+${finalCurrency}&aqs=chrome..69i57j0i131i433i512j0i512l8.2478j1j7&sourceid=chrome&ie=UTF-8`;
  const currencyNumber = process.env.NUMBER;

  // launch into the url page
  await page.goto(url);

  // clear the currency input
  await page.evaluate(() => {
    document.querySelector(".lWzCpb.ZEB7Fb").value = "";
  });

  // put the monetary value into the base Currency input
  await page.type(".lWzCpb.ZEB7Fb", currencyNumber);

  // get the final Currency
  const result = await page.evaluate(
    () => document.querySelector(".lWzCpb.a61j6").value
  );

  // log the result in the terminal
  console.log(
    `${currencyNumber} em ${baseCurrency} equivale a ${result} em ${finalCurrency}`
  );

  // close the browser
  await browser.close();
};

bot();
