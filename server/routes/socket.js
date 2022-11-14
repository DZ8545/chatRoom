const Message = require("../models/message.js");
const Room = require("../models/room");
const User = require("../models/user");

const rooms = new Map();
const roomInfos = new Map();
rooms.set("0001", new Map());
roomInfos.set("0001", {
  roomName: "聊天广场",
  roomMasterId: "",
});
let io;
Room.find().then((res) => {
  for (const room of res) {
    roomInfos.set(room.roomId, {
      roomName: room.roomName,
      roomMasterId: room.roomMasterId,
      password: room.password,
    });
    if (!rooms.has(room.roomId)) {
      rooms.set(room.roomId, new Map());
    }
  }
});

function mapToObject(map) {
  const obj = {};
  for ([index, val] of map) {
    obj[index] = val;
  }
  return obj;
}

function getRooms() {
  const arr = [];
  for (const [index, val] of rooms) {
    const room = {
      roomId: index,
      peopleCount: val.size,
      roomName: roomInfos.get(index).roomName,
      roomMasterId: roomInfos.get(index).roomMasterId,
      isSecret: !!roomInfos.get(index).password,
    };
    arr.push(room);
  }
  io.emit("getRooms", arr);
}

function getPeoples(currentRoomId, socket) {
  socket.emit("peoples", mapToObject(rooms.get(currentRoomId)));
}

function roomBroadcast(name, currentRoomId, type) {
  io.to(currentRoomId).emit("broadcast", {
    description: "[" + name + "]" + type + "房间",
    type: "broadcast",
    time: Date.now(),
  });
}

module.exports.fn = (x) => {
  io = x;
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
        quote: historyMessage[i].quote,
      };
      arr.push(item);
    }
    return arr;
  }

  io.on("connection", (socket) => {
    let currentRoomId = "0001";
    socket.join(currentRoomId);
    let messageCount;
    initHistoryMessages();

    socket.on("getUser", async (userId) => {
      const item = await User.findById(userId);
      const info = {
        name: item.name,
        description: item.description,
        userId: item.id,
        headImg: item.headImg,
      };
      socket.emit("initUser", {
        ...info,
        socketId: socket.id,
      });
      if (!rooms.get(currentRoomId).has(socket.id)) {
        rooms.get(currentRoomId).set(socket.id, info);
        getPeoples(currentRoomId, socket);
        getRooms();
        roomBroadcast(info.name, currentRoomId, "进入");
      }
    });

    socket.on("changeProfile", async (info) => {
      await User.findByIdAndUpdate(info.userId, {
        name: info.name,
        description: info.description,
        headImg: info.headImg,
      });
    });

    socket.on("joinRoom", (roomId) => {
      rooms
        .get(roomId)
        .set(socket.id, { ...rooms.get(currentRoomId).get(socket.id) });
      rooms.get(currentRoomId).delete(socket.id);
      currentRoomId = roomId;
      socket.join(currentRoomId);
      socket.emit("roomChange", {
        ...roomInfos.get(currentRoomId),
        roomId: currentRoomId,
      });
      getRooms();
      getPeoples(currentRoomId, socket);
      roomBroadcast(
        rooms.get(currentRoomId).get(socket.id).name,
        currentRoomId,
        "进入"
      );
      initHistoryMessages();
    });

    socket.on("disconnect", () => {
      roomBroadcast(
        rooms.get(currentRoomId).get(socket.id).name,
        currentRoomId,
        "离开"
      );
      rooms.get(currentRoomId).delete(socket.id);
      getRooms();
      getPeoples(currentRoomId, socket);
    });

    socket.on("moreMessages", async () => {
      const messages = await Message.aggregate([
        {
          $match: {
            roomId: currentRoomId,
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
            roomId: currentRoomId,
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
    function initHistoryMessages() {
      Message.aggregate([
        {
          $match: {
            roomId: currentRoomId,
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
    }
  });
};

module.exports.isLogin = (name) => {
  const names = [];
  for (const [index, val] of rooms) {
    for (const item of val) {
      names.push(item[1].name);
    }
  }
  if (names.includes(name)) {
    return true;
  }
  return false;
};
module.exports.roomIsExisted = (roomId) => {
  if (rooms.has(roomId)) {
    return true;
  }
  return false;
};

module.exports.roomAdd = (room) => {
  if (!rooms.has(room.roomId)) {
    rooms.set(room.roomId, new Map());
    roomInfos.set(room.roomId, {
      roomName: room.roomName,
      roomMasterId: room.roomMasterId,
    });
    getRooms();
  }
};

module.exports.joinRoom = (room) => {
  const password = roomInfos.get(room.roomId).password;
  if (password && password !== room.password) {
    return false;
  }
  return true;
};
