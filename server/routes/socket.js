const peoples = new Map();
const Message = require("../models/message.js");

module.exports.fn = (io) => {
  function fn(historyMessage, count = 10) {
    const totalLength = historyMessage.length;
    let start = 0;
    if (totalLength > count) {
      start = totalLength - count;
    }
    const arr = [];
    for (let i = start; i < totalLength; i++) {
      const item = {
        _id: historyMessage[i]._id,
        message: historyMessage[i].message,
        time: historyMessage[i].time,
        userName: historyMessage[i].user[0].name,
        userHeadImg: historyMessage[i].user[0].headImg,
      };
      arr.push(item);
    }
    return arr;
  }

  function mapToObject(map) {
    const obj = {};
    for ([index, val] of map) {
      obj[index] = val;
    }
    return obj;
  }

  async function getHistoryMessage(roomId) {
    const messages = await Message.aggregate([
      {
        $match: {
          roomId,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userName",
          foreignField: "name",
          as: "user",
        },
      },
    ]);
    return messages;
  }
  io.on("connection", (socket) => {
    let messageCount;
    Message.aggregate([
      {
        $match: {
          roomId: "0001",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userName",
          foreignField: "name",
          as: "user",
        },
      },
    ]).then((res) => {
      messageCount = res.length >= 10 ? 10 : res.length;
      socket.emit("initHistoryMessages", fn(res, messageCount));
    });

    socket.on("addPeople", (info) => {
      if (!peoples.has(socket.id)) {
        peoples.set(socket.id, info);
        io.emit("peoples", mapToObject(peoples));
        io.emit("broadcast", {
          description: "[" + info.name + "]" + "进入房间",
          type: "broadcast",
          time: Date.now(),
        });
      }
    });
    socket.on("disconnect", () => {
      io.emit("broadcast", {
        description: "[" + peoples.get(socket.id).name + "]" + "退出房间",
        type: "broadcast",
        time: Date.now(),
      });
      peoples.delete(socket.id);
      io.emit("peoples", mapToObject(peoples));
    });

    socket.on("moreMessages", async (roomId) => {
      const messages = await Message.aggregate([
        {
          $match: {
            roomId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userName",
            foreignField: "name",
            as: "user",
          },
        },
      ]);
      const totalLength = messages.length;
      if (totalLength > messageCount) {
        let count = 10;
        if (totalLength >= messageCount + 10) {
          messageCount += 10;
        } else {
          count = totalLength - messageCount;
          messageCount = totalLength;
        }
        socket.emit("getMoreMessage", {
          messages: fn(messages, messageCount),
          count,
        });
      }
    });

    socket.on("send", async (item) => {
      await Message.create(item);
      const messages = await Message.aggregate([
        {
          $match: {
            roomId: item.roomId,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userName",
            foreignField: "name",
            as: "user",
          },
        },
      ]);
      messageCount++;
      io.emit("getMessage", fn(messages, messageCount));
    });
  });
};

module.exports.isLogin = (name) => {
  for ([index, val] of peoples) {
    if (val.name === name) {
      return true;
    }
  }
  return false;
};
