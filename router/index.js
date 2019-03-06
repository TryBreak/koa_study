let param = {
  title: "helloxxx"
};
module.exports = () => {
  return async ctx => {
    await ctx.render("index", param);
  };
};
