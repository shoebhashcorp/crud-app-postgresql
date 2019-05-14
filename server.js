const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/api/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", users);

app.listen(5000, () => console.log("Running on localhost:5000"));
