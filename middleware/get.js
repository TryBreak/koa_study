const get = ctx => {
  let url = ctx.url;
  // 从上下文的request对象中获取
  let request = ctx.request;
  let req_query = request.query;
  let req_querystring = request.querystring;

  // 从上下文中直接获取
  let ctx_query = ctx.query;
  let ctx_querystring = ctx.querystring;
  const param = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  };

  ctx.body = param;
};

module.exports = () => {
  return async (ctx, next) => {
    get(ctx);
    await next();
  };
};
