const jwt = require("jsonwebtoken");
const axios = require("axios");
const path = require("path");
const { isLogin, roomIsExisted, roomAdd, joinRoom } = require("./socket.js");

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
          name: req.body.name,
          userId: item[0].id,
        },
        "dz8545"
      );
      return res.send({
        status: 200,
        userId: item[0].id,
        token,
      });
    }
    return res.send({
      status: 400,
      msg: "用户名密码错误",
    });
  });

  const Room = require("../models/room");
  router.post("/room/create", async (req, res) => {
    if (roomIsExisted(req.body.roomId)) {
      return res.send({
        status: 400,
      });
    }
    await Room.create(req.body);
    roomAdd(req.body);
    return res.send({
      status: 200,
    });
  });

  router.post("/room/joinRoom", async (req, res) => {
    if (joinRoom({ roomId: req.body.roomId, password: req.body.password })) {
      return res.send({
        status: 200,
      });
    }
    return res.send({
      status: 400,
    });
  });

  const multer = require("multer");
  const upload = multer({ dest: path.join(__dirname, "../uploads") });
  router.post("/upload", upload.single("file"), async (req, res) => {
    const file = req.file;
    file.url = `http://chat.dz8545.xyz/uploads/${file.filename}`;
    res.send({ status: 200, fileUrl: file.url });
  });

  app.use("/api", router);
};
