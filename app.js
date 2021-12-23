const app = require("express")();
const http = require("http").Server(app);
var cors = require("cors");
app.use(cors());

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Pass to next layer of middleware
  next();
});

app.use("/", (req, res) => {
  res.send("I am call");
  console.log("i am call");
});

const io = require("socket.io")(http, {
  allowEIO3: true,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  console.log("connected");

  socket.on("player", function () {
    console.log("pplayer emit");
    /// io.sockets.emit("getMedia");
  });
});

var port = process.env.PORT || 6262;
http.listen(port, function () {
  console.log(`listening on *:6262`);
});
