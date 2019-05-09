// Modules
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/auth")(passport);

// Config
    // Body Parser //
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(require("method-override")());

    // Handlebars //
        app.engine("hbs", hbs({ defaultLayout: "index", extname: "hbs" }));
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
            .connect("mongodb://localhost/dev", { useNewUrlParser: true })
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

// Routes //
    app.get("/", (req, res) => {
        res.send("/");
    });
    app.use("/user", user);
    app.use("/customer", customer);
    app.use("/merchandise", merchan);
    app.use("/category", category);

// Express Server //
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
