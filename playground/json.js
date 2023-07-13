const file = require('fs');

const read = file.readFileSync("jsontext.json");

const strData = read.toString();
const parseData = JSON.parse(strData);
parseData.title = "book two";
parseData.author = "nshuti";
const toObject = JSON.stringify(parseData);
const write = file.writeFileSync("jsontext.json", toObject);