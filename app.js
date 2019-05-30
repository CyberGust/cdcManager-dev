// Modules
const express = require("express");
const app = express();
const expbs = require("express-handlebars");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/auth")(passport);
require("./models/Task");

// Config
// Body Parser //
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(require("method-override")());

// Handlebars //
const hbs = expbs.create({
    // ENGINE //
    defaultLayout: "index",
    layoutsDir: path.join(__dirname, "views/Layout"),
    partialsDir: path.join(__dirname, "views/Components"),
    extname: ".hbs",

    // Helpers //
    helpers: {}
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// Session //
app.use(
    session({
        secret: "n0d3",
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware //
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

// Mongoose //
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost/dev", {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("Database connection succefull.");
    })
    .catch(e => {
        console.log("Failed to connect to Database. ERROR:  " + e);
    });

// Public //
app.use(express.static(path.join(__dirname, "public")));

// Routes Dependencies //
const user = require("./routes/user");
const customer = require("./routes/customer");
const merchan = require("./routes/merchan");
const category = require("./routes/category");
const task = require("./routes/task");
const provider = require("./routes/provider");

// Routes //
app.get("/", async (req, res) => {
    const Task = mongoose.model("task");
    let taskExecuted = await Task.find({
        status: false
    });
    let taskExecuting = await Task.find({
        status: true
    });
    let taskCounter = taskExecuting.length;
    let tot = Number(0);

    taskExecuted.map(task => {
        tot += Number(task.earnings);
    });

    res.render("home", {
        earnings: tot,
        taskCounter: taskCounter
    });
});
app.use("/user", user);
app.use("/customer", customer);
app.use("/merchandise", merchan);
app.use("/category", category);
app.use("/task", task);
app.use("/provider", provider);

// Express Server //
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});