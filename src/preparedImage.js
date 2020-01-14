const fs = require("fs");
//Animal
const files = fs.readdirSync("./assets/Animal").filter(x => x.includes("jpg"));
const ex =
  "{\n" +
  files.map(x => `"${x.split(".jpg")[0]}": require("./${x}"),`).join("\n") +
  "}";
const res = "export default " + ex;
fs.writeFileSync("./assets/Animal/index.js", res);
//City
const files1 = fs.readdirSync("./assets/City").filter(x => x.includes("jpg"));
const ex1 =
  "{\n" +
  files1.map(x => `"${x.split(".jpg")[0]}": require("./${x}"),`).join("\n") +
  "}";
const res1 = "export default " + ex1;
fs.writeFileSync("./assets/City/index.js", res1);
//Painted
const files2 = fs.readdirSync("./assets/Painted").filter(x => x.includes("jpg"));
const ex2 =
  "{\n" +
  files2.map(x => `"${x.split(".jpg")[0]}": require("./${x}"),`).join("\n") +
  "}";
const res2 = "export default " + ex2;
fs.writeFileSync("./assets/Painted/index.js", res2);
