const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("./plugins/db.js")();
require("./routes")(app);
const port = 3001;

const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
require("./routes/socket.js").fn(io);

http.listen(8001, () => {
  console.log(`ws://localhost:8001`);
});

app.use("/", express.static(__dirname + "/build"));
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
