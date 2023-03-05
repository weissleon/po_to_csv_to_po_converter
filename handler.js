const loadPoFile = async (filePath) => {
  const po = require("pofile");
  const fs = require("fs/promises");

  const text = await fs.readFile(filePath, {
    encoding: "utf-8",
  });

  return po.parse(text);
};

const convertToCsv = async (filePath) => {
  const papa = require("papaparse");
  const { items } = await loadPoFile(filePath);

  const rows = [];
  for (let i = 0; i < items.length; i++) {
    const {
      msgid: text,
      msgctxt: context,
      references,
      msgstr: translation,
    } = items[i];

    const row = {
      context,
      reference: references[0],
      text,
      translation: translation[0],
    };

    rows.push(row);
  }
  const csvText = papa.unparse(rows, {});
  return csvText;
};

const saveCsvFile = async (fileName, csvText) => {
  const fs = require("fs/promises");
  const path = require("path");
  const DIR_OUT = "./out";
  await fs.writeFile(path.join(DIR_OUT, fileName + ".csv"), csvText);
};

const loadTranslationFile = async (filePath) => {
  const papa = require("papaparse");
  const fs = require("fs/promises");

  const text = await fs.readFile(filePath, { encoding: "utf-8" });
  const { data } = papa.parse(text, { header: true });
  const dict = {};

  for (let i = 0; i < data.length; i++) {
    dict[data[i]["context"]] = {
      text: data[i]["text"],
      translation: data[i]["translation"],
    };
  }

  return dict;
};

const converToPo = async (srcFilePath, translationFilePath) => {
  const po = await loadPoFile(srcFilePath);
  const dict = await loadTranslationFile(translationFilePath);

  for (let i = 0; i < po.items.length; i++) {
    //  first compare the msgctxt, and inject the translation if match
    const { msgctxt } = po.items[i];
    const { translation } = dict[msgctxt];

    po.items[i].msgstr[0] = translation;
  }

  return po;
};

const savePoFile = async (fileName, poData) => {
  const path = require("path");
  poData.save(path.join("./out", fileName), (err) => {
    if (err) console.log("Error while saving po file.");
  });
};

module.exports = {
  convertToCsv,
  loadPoFile,
  convertToCsv,
  saveCsvFile,
  converToPo,
  loadTranslationFile,
  savePoFile,
};
