let param = {
  title: "hello"
};
module.exports = () => {
  return async ctx => {
    await ctx.render("index", param);
  };
};
