const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
const express = require("express");
const connectDB = require("../config/db");
const path = require("path");
const session = require("express-session");
const port = 1203;
require("./routes/main");
require("dotenv").config();

// Express app
const app = express();

// YearDate
getFormattedDate = () => new Date().getFullYear();

// Connect to DB
connectDB();

// This middleware is necessary for parsing form data in the request body.
app.use(express.urlencoded({ extended: true }));

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, "../public")));

app.use(cookieParser());

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
        // cookie: { maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // 7 days
        cookie: { maxAge: new Date(Date.now() + 10 * 1000) }, // 10s for test
    })
);

// Specify the views directory
app.set("views", path.join(__dirname, "../views"));

// Registre view engine
app.set("view engine", "ejs");

app.use("/", require("./routes/main"));
app.use("/", require("./routes/admin"));
app.use("/teacher", require("./routes/main"));
app.use("/student", require("./routes/main"));

// listen to Request
app.listen(port);
