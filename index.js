const Koa = require("koa");
const app = new Koa();

const router = require("./middleware/router");

// const loggerAsync = require("./middleware/logger-async");
// const viewList = require("./middleware/viewList");

app.use(router.routes()).use(router.allowedMethods());
// app.use(loggerAsync());

// app.use(async (ctx, next) => {
//   console.log(11111111);
//   ctx.body = "hello koa2";
//   await next();
// });

// app.use(async (ctx, next) => {
//   let url = ctx.request.url;
//   ctx.body = url;
//   await next();
// });

// app.use(viewList());

app.listen(3000);
console.log("[demo] start-quick is starting at port 3000");
