const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const investing = require("./investing.json");
let index = -1;

app.set("port", process.env.PORT || 4001);

const emitRate = (socket) => {
  socket.emit("setExchange", { exchange: investing[index] });
};

io.on("connection", (socket) => {
  emitRate(socket);
  socket.on("getRate", () => {
    index=(index === investing.length-1)?0:index+1;
    emitRate(socket);
  });
});

server.listen(app.get("port"), function () {
  console.log("Agr server started in ", app.get("port"));
});
