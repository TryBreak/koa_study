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
const post = require("./middleware/post");
app.use(post());

app.listen(3000);
console.log("[demo] start-quick is starting at port 3000");
