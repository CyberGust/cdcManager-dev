// Dependencies //
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Merchan");
const User = mongoose.model("merchan");

// Routes
// Home //
    router.get("/", (req, res) => {
        res.render("merchan/dashboard");
    });

// Register new user
    router.get("/create", (req, res) => {
        res.render("merchan/create");
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
            
            await Merchan.findOne({ id:id })
                .then(merchan => {
                    if (merchan) {
                        error.push({ error_message: "'ID' já cadastrado!" });
                        console.log(error);
                        res.redirect("/merchan/create");

                        // End of validation
                    } else {
                        // Starting the user creation at Database
                        const newMerchan = new Merchan({
                            category: req.body.category,
                            subcategory: req.body.subcategory,
                            details: req.body.details,
                            id: req.body.id
                        });
                        
                    }
                })
                .catch(error => {
                res.send(error);
                });
            }
        });

module.exports = router;
