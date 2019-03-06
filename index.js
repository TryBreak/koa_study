const Koa = require("koa");
const app = new Koa();
const path = require("path");

// const bodyParser = require("koa-bodyparser");
// app.use(bodyParser());
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
// const static = require("./middleware/static");
// app.use(static);

//koa-static中间件使用
// const koa_static = require("./middleware/koa_static");
// app.use(koa_static());

//使用模板引擎
// const views = require("./middleware/ejs");
// app.use(views());

// const index = require("./router/index");
// app.use(index());

//busboy 模块
const { uploadFile } = require("./middleware/upload");
app.use(async ctx => {
  if (ctx.url === "/" && ctx.method === "GET") {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/upload.json" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === "/upload.json" && ctx.method === "POST") {
    // 上传文件请求处理
    let result = { success: false };
    let serverFilePath = path.join(__dirname, "upload-files");

    // 上传文件事件
    result = await uploadFile(ctx, {
      fileType: "album", // common or album
      path: serverFilePath
    });

    ctx.body = result;
  } else {
    // 其他请求显示404
    ctx.body = "<h1>404！！！ o(╯□╰)o</h1>";
  }
});

app.listen(3000);
console.log("[demo] start-quick is starting at port 3000");
