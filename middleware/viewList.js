const fs = require("fs");

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}
 */
const render = page => {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`;
    fs.readFile(viewUrl, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
const route = async url => {
  let view = "404.html";
  switch (url) {
    case "/":
      view = "index.html";
      break;
    case "/index":
      view = "index.html";
      break;
    case "/todo":
      view = "todo.html";
      break;
    case "/404":
      view = "404.html";
      break;
    default:
      break;
  }
  let html = await render(view);
  console.log(html);

  return html;
};

module.exports = () => {
  return async (ctx, next) => {
    let url = ctx.request.url;
    let html = await route(url);
    ctx.body = html;
    await next();
  };
};
