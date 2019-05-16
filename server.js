const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const passport = require("passport");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);

app.listen(5000, () => console.log("Running on localhost:5000"));
