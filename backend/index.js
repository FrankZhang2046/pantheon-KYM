const axios = require("axios");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const url = `https://en.wikipedia.org/wiki/Odin`;
const imageUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Georg_von_Rosen_-_Oden_som_vandringsman%2C_1886_%28Odin%2C_the_Wanderer%29.jpg/220px-Georg_von_Rosen_-_Oden_som_vandringsman%2C_1886_%28Odin%2C_the_Wanderer%29.jpg`;

async function scrapeGodsInfo(urlToSrape) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlToSrape);
  return await page.evaluate(() => {
    const listOfGods = [];
    const listOfParagraphs = [];
    document.querySelectorAll('h3 + p').forEach(item => listOfParagraphs.push(item.textContent));
    let godInfoObject = {};
    [...document.querySelectorAll('h3')].filter(item => !item.textContent.includes(' ')).forEach((god, index) => {
      const godObject = {
        name: god.textContent,
        description: listOfParagraphs[index]
      };
      godInfoObject = {...godInfoObject, ...{[god.textContent]: godObject}}
    });
    return godInfoObject;
  });

}

async function downloadImage(imageUrl) {
  console.log(`imageUrl is: `, imageUrl);
  const filePath = `${__dirname}/myImage.jpg`;
  console.log(`filePath`, filePath);
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url: imageUrl,
    method: "GET",
    responseType: "stream",
  });

  response.data.pipe(writer);

  return new Promise((res, rej) => {
    writer.on("finish", res);
    writer.on("error", rej);
  });
}

scrapeGodsInfo('https://www.centreofexcellence.com/norse-gods-goddesses/')
    .then(returnVal => {
      fs.writeFile('./norseGods.json', JSON.stringify(returnVal), ()=>{
        console.log(`data written to json file`);
      })
    });
