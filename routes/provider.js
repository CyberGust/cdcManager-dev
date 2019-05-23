// Dependencies //
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Provider");
const Provider = mongoose.model("provider");


// Home //
router.get("/", async (req, res) => {
    const providers = await Provider.find({}).sort({ name: "asc" });
    res.render("provider/dashboard", { providers: providers });
});

// Create Category //
router.get("/new", async (req, res) => {
    try {
        res.render("provider/new");
    } catch (error) {
        res.send(error);
    }
});

router.post("/new", async (req, res) => {
    let error = [];
    const name = req.body.name;
    const address = req.body.address;
    const document = req.body.document;
    const phone = req.body.phone;

    // Begin of validation
    if (!name || name === undefined || typeof name === null) {
        error.push({
            error_message: "Nome em branco ou inválido."
        });
    }

    if (error.length > 0) {
        res.redirect("/provider");
    } else {
        await Provider.findOne({ name: name })
            .then(provider => {
                if (provider) {
                    error.push({ error_message: "Fornecedor já cadastrado!" });
                    res.redirect("/provider");

                    // End of validation
                } else {
                    // Starting the user creation at Database
                    const newProvider = new Provider({
                        name: name,
                        address: address,
                        document: document,
                        phone: phone
                    });

                    newProvider.save().then(() => {
                        res.redirect("/provider");
                    });
                }
            })
            .catch(error => {
                res.send(error);
            });
    }
});

// Edit Provider //
router.get("/edit/:id", async (req, res) => {
    await Provider.findOne({ _id: req.params.id })
        .then(providers => {
            res.render("provider/edit", { providers:providers });
        })
        .catch(error => {
            res.send(error);
        });
});

router.post("/edit", async (req, res) => {
    // Begin of the validation
    let error = [];
    const $id = req.body.id
    let name = req.body.name;
    let address = req.body.address;
    let document = req.body.document;
    let phone = req.body.phone;

    try {
        const provider = await Provider.findOne({ _id: $id });
        if(provider) {
                provider.name = name;
                provider.address = address;
                provider.document = document;
                provider.phone = phone;

            await provider
            .save()
            .then(() => {
                res.redirect("/provider");
            })
            .catch(err => {
                error.push(err);
                res.redirect("/provider")
            });
        } else {
            error.push({ error_msg: "Falha ao encontrar fornecedor." });
            res.redirect("/provider");
        }

    } catch (err) {
        res.redirect("/provider");
        error.push(err);
    }
});

// Delete //
router.post("/delete", async (req, res) => {
    try {
        await Provider.findOneAndDelete({ _id: req.body.id }).then(() => {
            res.redirect("/provider");
        });
    } catch (error) {
        res.redirect("/");
    }
});

module.exports = router;
