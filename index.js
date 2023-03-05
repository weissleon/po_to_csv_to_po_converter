const path = require("path");
const {
  convertToCsv,
  loadPoFile,
  saveCsvFile,
  loadTranslationFile,
  converToPo,
  savePoFile,
} = require("./handler");
const DIR_SRC = "./src";

const run = async () => {
  //   const result = await convertToCsv(path.join(DIR_SRC, "Lempo.po"));
  //   const result = await loadPoFile(path.join(DIR_SRC, "Lempo.po"));
  //   const csvText = await convertToCsv(path.join(DIR_SRC, "Lempo.po"));
  //   await saveCsvFile("Lempo", csvText);
  //   const result = await loadTranslationFile("out/Lempo.csv");
  const poData = await converToPo("./src/Lempo.po", "./out/Lempo.csv");
  savePoFile("Lempo_translated.po", poData);
};

run();
