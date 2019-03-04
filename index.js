const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());
//中间件写法;
// const loggerAsync = require("./middleware/logger-async");
// app.use(loggerAsync());

//默认返回
// app.use(async (ctx, next) => {
//   ctx.body = "hello koa2";
//   await next();
// });

//返回路由地址
// app.use(async (ctx, next) => {
//   let url = ctx.request.url;
//   ctx.body = url;
//   await next();
// });

//自定义路由
// const viewList = require("./middleware/viewList");
// app.use(viewList());

//使用 koa-router
// const router = require("./middleware/router");
// app.use(router.routes()).use(router.allowedMethods());

//get 请求
// const get = require("./middleware/get");
// app.use(get);

//post 请求
// const post = require("./middleware/post");
// app.use(post());

//静态资源服务器
const path = require("path");
const content = require("./utils/content");
const mimes = require("./utils/mimes");
const staticPath = "./static";

// 解析资源类型
function parseMime(url) {
  let extName = path.extname(url);
  extName = extName ? extName.slice(1) : "unknown";
  return mimes[extName];
}

app.use(async ctx => {
  // 静态资源目录在本地的绝对路径
  let fullStaticPath = path.join(__dirname, staticPath);

  // 获取静态资源内容，有可能是文件内容，目录，或404
  let _content = await content(ctx, fullStaticPath);

  // 解析请求内容的类型
  let _mime = parseMime(ctx.url);

  // 如果有对应的文件类型，就配置上下文的类型
  if (_mime) {
    ctx.type = _mime;
  }

  // 输出静态资源内容
  if (_mime && _mime.indexOf("image/") >= 0) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200);
    ctx.res.write(_content, "binary");
    ctx.res.end();
  } else {
    // 其他则输出文本
    ctx.body = _content;
  }
});

app.listen(3000);
console.log("[demo] start-quick is starting at port 3000");
