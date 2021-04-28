module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "111111") {
      return res.status(200).json({
        user: {
          username: req.body.username,
          token: "123",
        },
      });
    } else {
      return res.status(400).json({
        errorMessage: "账号密码错误",
      });
    }
  }
  next();
};
