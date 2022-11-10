const jwt = require("jsonwebtoken");
const axios = require("axios");
const { isLogin } = require("./socket.js");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  //用户
  const User = require("../models/user.js");
  router.post("/users/register", async (req, res) => {
    const item = await User.find({ name: req.body.name });
    if (item.length === 0) {
      const imgURL = (
        await axios.get("http://api.btstu.cn/sjtx/api.php?format=json")
      ).data.imgurl;
      await User.create({ ...req.body, headImg: imgURL });
      res.send({
        status: 200,
      });
    } else {
      res.send({
        status: 400,
        message: "name重复",
      });
    }
  });
  router.post("/users/login", async (req, res) => {
    if (isLogin(req.body.name)) {
      return res.send({
        status: 401,
        msg: "用户已登录",
      });
    }
    const item = await User.find({
      name: req.body.name,
      password: req.body.password,
    });
    if (item.length !== 0) {
      const token = jwt.sign(
        {
          name: req.params.name,
          userId: item[0].id,
        },
        "dz8545"
      );
      return res.send({
        status: 200,
        name: req.params.name,
        headImg: item[0].headImg,
        userId: item[0].id,
        token,
      });
    }
    return res.send({
      status: 400,
      msg: "用户名密码错误",
    });
  });

  app.use("/api", router);
};
