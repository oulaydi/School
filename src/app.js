const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
const express = require("express");
const methodOverride = require("method-override");
const connectDB = require("../config/db");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
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

app.use(methodOverride("_method"));

app.use(cookieParser());

// Cookies
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        store: mongoStore.create({
            mongoUrl:process.env.MONGODB_URI,
        }),
        cookie: { maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // 7 days
    })
);


// flash middleware
app.use(flash());

// Serve static assets from the public directory
app.use(express.static(path.join(__dirname, "../public")));

// Specify the views directory
app.set("views", path.join(__dirname, "../views"));

// Registre view engine
app.set("view engine", "ejs");


app.use("/", require("./routes/professeur"));
app.use("/", require("./routes/main"));
app.use("/", require("./routes/admin"));



app.use("/teacher", require("./routes/main"));
app.use("/student", require("./routes/main"));
app.use("/professeur", require("./routes/professeur"));






app.use("/profile", require("./routes/main"));



// listen to Request
app.listen(process.env.PORT);
