const static = require("koa-static");
const staticPath = "../static";
const path = require("path");

module.exports = () => {
  return static(path.join(__dirname, staticPath));
};
