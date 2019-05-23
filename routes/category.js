// Dependencies //
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Category");
const Category = mongoose.model("category");
require("../models/Provider");
const Provider = mongoose.model("provider");

// Routes//
// Home
router.get("/", async (req, res) => {
    const categories = await Category.find({}).sort({ name: "asc" });

    res.render("category/dashboard", { categories: categories });
});

// Create Category
router.get("/create", async (req, res) => {
    try {
        const providers = await Provider.find({}).sort("asc");
        res.render("category/create", { providers:providers });
    } catch (error) {
        res.send(error);
    }
});

router.post("/create", async (req, res) => {
    let error = [];
    const name = req.body.name;
    const gender = req.body.gender;
    const mustHave = req.body.mustHave;
    const providerID = req.body.provider;

    // Begin of validation
    if (!name || name === undefined || typeof name === null) {
        error.push({
            error_message: "Nome em branco ou inválido."
        });
    }

    if (
        !gender ||
        gender === "Gênero da Categoria" ||
        typeof gender === null ||
        gender === undefined
    ) {
        error.push({
            error_message: "Selecione um gênero para a categoria!"
        });
    }

    if (error.length > 0) {
        res.redirect("/category/create-category");
    } else {
        await Category.findOne({ name: name })
            .then(async category => {
                if (category) {
                    error.push({ error_message: "Categoria já cadastrada!" });
                    res.redirect("/category/create-category");

                    // End of validation
                } else {
                    
                    // Starting the user creation at Database
                    const newCategory = new Category({
                        name: name,
                        gender: gender,
                        mustHave: mustHave,
                        providerID: providerID
                    });

                    await newCategory.save().then(() => {
                        res.redirect("/category");
                    });
                }
            })
            .catch(error => {
                res.send(error);
            });
    }
});

// Delete
router.post("/delete", async (req, res) => {
    try {
        await Category.findOneAndDelete({ _id: req.body.id }).then(() => {
            res.redirect("/category");
        });
    } catch (error) {
        res.redirect("/");
    }
});

module.exports = router;
