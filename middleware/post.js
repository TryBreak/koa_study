const parsePostData = require("../utils/parsePostData");
const post = async ctx => {
  console.log(ctx.url === "/" && ctx.method === "GET");

  if (ctx.url === "/" && ctx.method === "GET") {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === "/" && ctx.method === "POST") {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    let postData = await parsePostData(ctx);
    ctx.body = postData;
  } else {
    // 其他请求显示404
    ctx.body = "<h1>404！！！ o(╯□╰)o</h1>";
  }
};

module.exports = () => {
  return async (ctx, next) => {
    post(ctx);
    await next();
  };
};
