require("dotenv").config({ path: "./secrets/.env" });
const express = require("express");
const bodyParser = require("body-parser");
const socketIO = require("socket.io");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const port = process.env[`${currentProcessEnv}_PORT`];
const passport = require("passport");
const app = express();
const path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/profile", profile);

const server = http.createServer(app);
const io = socketIO(server);
app.set("io", io);

io.on("connection", socket => {
  console.log("User Connected");
  app.set("socket", socket);

  // colorChange(socket, io);
  cloudSocket(socket);

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
