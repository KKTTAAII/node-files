const fs = require("fs");
const axios = require("axios");

function write(path, data) {
  if (path) {
    fs.writeFile(path, data, "utf8", function (err) {
      if (err) {
        console.log("ERROR", err);
      }
    });
  } else {
    console.log(data);
  }
}

function cat(path, outputFile) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error", err);
    } 
    write(outputFile, data);
  });
}

async function webCat(URL, outputFile) {
  try {
    const res = await axios.get(URL);
    const data = res.data;
    write(outputFile, data);
  } catch (e) {
    console.log(e);
  }
}

let data;
let outPath;

if (process.argv[2] === "--out") {
  outPath = process.argv[3];
  data = process.argv[4];
} else {
  data = process.argv[2];
}

if (
  data.startsWith("http:") ||
  data.startsWith("https:")
) {
  webCat(data, outPath);
} else {
  cat(data, outPath);
}
