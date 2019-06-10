require("dotenv").config({ path: "./secrets/.env" });
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const session = require("express-session");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

const cloudSocket = require("./cloudSocket");
// const colorChange = require("./colorChange");
const authRouter = require("./routes/api/auth");

var currentProcessEnv = process.env.NODE_ENV.toUpperCase();
const app = express();
const port = process.env[`${currentProcessEnv}_PORT`];

// Rate Limiting

app.use(express.static(path.join(__dirname, "client", "build")));

//Body Parser middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
    parameterLimit: 50000
  })
);

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(
  session({
    secret: process.env.SECRET_OR_KEY,
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

// Users API
app.use("/api/users", users);
app.use("/api/profile", profile);

app.use("/auth", authRouter);
app.use("/test", (req, res) => {
  res.status(200).json({ status: "success" });
});

// process.setMaxListeners(0);

const server = http.createServer(app);
const io = socketIO(server);
app.set("io", io);

io.on("connection", socket => {
  console.log("User Connected");
  app.set("socket", socket);

  // colorChange(socket, io);
  // cloudSocket(socket);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

function clientServing(req, res) {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}
app.get("/*", clientServing);

const runningServer = server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = {
  server
};
