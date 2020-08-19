const axios = require("axios");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const url = `https://en.wikipedia.org/wiki/Odin`;
const imageUrl = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Georg_von_Rosen_-_Oden_som_vandringsman%2C_1886_%28Odin%2C_the_Wanderer%29.jpg/220px-Georg_von_Rosen_-_Oden_som_vandringsman%2C_1886_%28Odin%2C_the_Wanderer%29.jpg`;

async function scrapeImage(urlToSrape) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(urlToSrape);
  return await page.evaluate(() => {
    const imgElement = document.querySelector("img.thumbimage");
    return imgElement.src;
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

downloadImage('https://upload.wikimedia.org/wikipedia/commons/f/fc/American_pika_%28ochotona_princeps%29_with_a_mouthful_of_flowers.jpg');
// downloadImage()
