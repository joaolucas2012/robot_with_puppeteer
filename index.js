console.log("Welcome to the conversor bot!");

const puppeteer = require("puppeteer");

const bot = async () => {
  const browser = await puppeteer.launch({ headless: false }); // default is true
  const page = await browser.newPage();

  // data
  const baseCurrency = "real";
  const finalCurrency = "euro";
  const url = `https://www.google.com/search?q=${baseCurrency}+para+${finalCurrency}&rlz=1C1GCEU_pt-BRBR1017BR1017&oq=${baseCurrency}+para+${finalCurrency}&aqs=chrome..69i57j0i131i433i512j0i512l8.2478j1j7&sourceid=chrome&ie=UTF-8`;
  const currencyNumber = "2";

  // launch into the url page
  await page.goto(url);

  // clear the currency input
  await page.evaluate(() => {
    document.querySelector(".lWzCpb.ZEB7Fb").value = "";
  });

  // put the monetary value into the base Currency input
  await page.type(".lWzCpb.ZEB7Fb", currencyNumber);

  // get the final Currency
  const result = await page.evaluate(() => {
    return document.querySelector(".lWzCpb.a61j6").value;
  });

  console.log(
    `${currencyNumber} em ${baseCurrency} equivale a ${result} em ${finalCurrency}`
  );
  await browser.close();
};

bot();
