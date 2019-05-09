// Modules
const express = require("express");
const hbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

// Config
    // Body Parser //
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

    // Handlebars //
        app.engine("hbs", hbs({ defaultLayout: "index", extname: "hbs" }));
        app.set("view engine", "hbs");

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

// Routes //
    app.get("/", (req, res) => {
        res.send("/");
    });
    app.use("/user", user);
    app.use("/customer", customer);

// Express Server //
    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
