require("./routes/main");
require("dotenv").config();
const connectDB = require("../config/db");
const express = require("express");
const path = require("path");
const port = 1203;

// Express app
const app = express();

// YearDate
getFormattedDate = () => new Date().getFullYear();

// Connect to DB
// connectDB();

// Specify the views directory
app.set("views", path.join(__dirname, "../views"));

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// Registre view engine
app.set("view engine", "ejs");

app.use("/", require("./routes/main"));
app.use("/", require("./routes/admin"));
app.use("/teacher", require("./routes/main"));
app.use("/student", require("./routes/main"));

// listen to Request
app.listen(port);
