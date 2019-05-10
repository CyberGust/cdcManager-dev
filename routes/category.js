// Dependencies //
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Category");
const Category = mongoose.model("category");
require("../models/Subcategory");
const Subcategory = mongoose.model("subcategory");
// Routes//
// Home 
    router.get("/", async (req, res) => {
        const categories = await Category.find({}).sort({name: "asc" });
        const subcategories = await Subcategory.find({}).sort({name: "asc" });

        res.render("category/dashboard", { categories:categories, subcategories:subcategories });
        // await Category.find()
        //     .sort({ name: "asc" })
        //     .then((categories) => {
        //         res.render("category/dashboard", { categories:categories });
        //     });
    });

// Create Category
    router.get("/create-category", (req, res) => {
        res.render("category/create-category");
    });

    router.post("/create-category", async (req, res) => {
        let error = [];
        const name = req.body.name;
        const subcategory = [];
        const description = req.body.description;
        const gender = req.body.gender;

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
            console.log(gender);
            error.push({
                error_message: "Selecione um gênero para a categoria!"
            });
        }

        if (error.length > 0) {
            console.log(error);
            res.redirect("/category/create-category");
        } else {
            await Category.findOne({ name: name })
                .then(category => {
                    if (category) {
                        error.push({ error_message: "Categoria já cadastrada!" });
                        console.log(error);
                        res.redirect("/category/create-category");

                        // End of validation
                    } else {
                        // Starting the user creation at Database
                        const newCategory = new Category({
                            name: name,
                            subcategory: subcategory,
                            description: description,
                            gender: gender
                        });

                        newCategory.save().then(() => {
                            console.log(`Categoria "${newCategory.name}" criada!`);
                            res.redirect("/category/create-subcategory");
                        });
                    }
                })
                .catch(error => {
                    res.send(error);
                });
        }
    });

// Create Subcategory
    router.get("/create-subcategory", async (req, res) => {
        await Category.find({})
            .sort({ name: "asc" })
            .then(categories => {
                res.render("category/create-subcategory", {
                    categories: categories
                });
            })
            .catch(err => {
                console.log(err);
                res.redirect("/category");
            });
    });

    router.post("/create-subcategory", async (req, res) => {
        let error = [];
        const name = req.body.name;
        const category = req.body.category;
        const description = req.body.description;

        // Begin of validation
        if (!name || name === undefined || typeof name === null) {
            error.push({
                error_message: "Nome em branco ou inválido."
            });
        }

        if (
            !category ||
            category === undefined ||
            typeof category === null ||
            category === ""
        ) {
            error.push({
                error_message: "Por favor, selecione uma categoria pai."
            });
        }

        if (error.length > 0) {
            console.log(error);
            res.redirect("/category/create-subcategory");
        } else {
            await Subcategory.findOne({ name: name })
                .then(async subcategory => {
                    if (subcategory) {
                        error.push({
                            error_message: "Subcategoria já cadastrada!"
                        });
                        console.log(error);
                        res.redirect("/category/create-subcategory");

                        // End of validation
                    } else {
                        // Starting the subcategory creation at Database
                        const newSubcategory = new Subcategory({
                            name: req.body.name,
                            description: req.body.description
                        });

                        await newSubcategory.save().then(() => {
                            console.log(
                                `Subcategoria "${newSubcategory.name}" criada!`
                            );
                        });

                        await Category.findOne({ _id: category }).then(
                            category => {
                                if (category) {
                                    category.subcategory.push(newSubcategory.name);
                                    category.save();
                                    res.redirect("/category");
                                } else {
                                    console.log("Não achei, chefe. D':");
                                    res.redirect("/category");
                                }
                            }
                        );
                    }
                })
                .catch(error => {
                    console.log(error);
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
            console.log(error);
        }
    });

    router.post("/deletee", (req, res) => {
        try {
            Subcategory.findOneAndDelete({ _id: req.body.id }).then(() => {
                res.redirect("/category");
            });
        } catch (error) {
            console.log(error);
        }

    });

module.exports = router;
