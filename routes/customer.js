// Dependencies //
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Customer");
const Customer = mongoose.model("customer");

// Routes
// Home //
router.get("/", async (req, res) => {
    const customer = await Customer.find({}).sort({ name: "asc" });
    res.render("customer/dashboard", { customer:customer });
});

// Create //
router.get("/new", (req, res) => {
    res.render("customer/new");
});

router.post("/new", (req, res) => {
    let error = [];

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const document = req.body.document;
    const address = req.body.address;

    Customer.findOne({ name: name })
        .then(user => {
            if (user) {
                error.push({ error_message: "Este nome já foi cadastrado." });
                console.log(error);
            } else {
                const newCustomer = new Customer({
                    name: name,
                    email: email,
                    phone: phone,
                    document: document,
                    address: address
                });

                newCustomer
                    .save()
                    .then(() => {
                        res.redirect("/customer");
                    })
                    .catch(err => {
                        error.push({ error_message: err });
                    });
            }
        })
        .catch(err => {
            error.push({ error_message: err });
        });
});

module.exports = router;
