// Dependencies //
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Merchan");
const Merchan = mongoose.model("merchan");
require("../models/Category");
const Category = mongoose.model("category");
require("../models/Subcategory");
const Subcategory = mongoose.model("subcategory");

// Routes
// Home //
    router.get("/", async (req, res) => {
        Merchan.find({}).sort({ name: "asc" }).then(merchandise => {
            res.render("merchan/dashboard", { merchandise:merchandise });
        });
    });

// Register new merchandise
    router.get("/create", async (req, res) => {
        const categories = await Category.find({}).sort({ name: "asc" });
        const subcategories = await Subcategory.find({}).sort({ name: "asc" });
        
        res.render("merchan/create", { categories:categories, subcategories:subcategories });

    });

    router.post("/create", async (req, res) => {
        let error = [];
        const category = req.body.category;
        const subcategory = req.body.subcategory;
        const details = req.body.details;
        const id = req.body.id;
        
        // Begin of validation
        if (!category || category === undefined || typeof category === null) {
            error.push({
                error_message:
                    "Categoria em branco ou inválida. Por favor, revise o campo 'Categoria'."
            });
        }

        if (subcategory === undefined || typeof subcategory === null) {
            error.push({
                error_message:
                    "Subcategoria inválida. Por favor, certifique-se de que escolheu uma subcategoria válida."
            });
        }

        if (!id || id === undefined || typeof id === null) {
            error.push({
                error_message: "Por favor, dê uma identificação alfanumérica para o produto."
            });
        }

        if (error.length > 0) {
            console.log(error);
            req.flash("error_msg", error);
            res.redirect("/merchan/create");
        } else { 
            
            // Starting the user creation at Database
            const newMerchan = new Merchan({
                category: req.body.category,
                subcategory: req.body.subcategory,
                details: req.body.details,
                id: req.body.id
            });

            newMerchan.save().then(() => {
                res.redirect("/merchandise");
            });
                        
        }
    });

    // Delete
    router.post("/delete", async (req, res) => {
        try {
            
            await Merchan.findOneAndDelete({ _id: req.body.id }).then(() => {
                res.redirect("/merchandise");
            });
        } catch (error) {
            console.log(error);
        }
    });

module.exports = router;
