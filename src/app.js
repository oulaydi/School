const express = require("express");
const path = require("path");
require("./routes/main");
const port = 1203;
// require("dotenv").config();
// const sql = require("../config/db");

// Express app
const app = express();

// YearDate
getFormattedDate = () => new Date().getFullYear();

// Specify the views directory
app.set("views", path.join(__dirname, "../views"));

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// Registre view engine
app.set("view engine", "ejs");

app.use("/", require("./routes/main"));
app.use("/teacher", require("./routes/main"));
app.use("/student", require("./routes/main"));

// listen to Request
app.listen(port);
