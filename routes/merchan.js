// Dependencies //
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Merchan");
const Merchan = mongoose.model("merchan");
require("../models/Category");
const Category = mongoose.model("category");
require("../models/Provider");
const Provider = mongoose.model("provider");

// Available Merchandise //
router.get("/", async (req, res) => {
    // const providers = await Provider.find({}).sort({ name: "asc" });
    const merchandise = await Merchan.find({ status: "available" }).sort({ name: "asc" });
    res.render("merchan/available", {
        merchandise: merchandise,
    });
});

// Sold Merchandise //
router.get("/sell", async (req, res) => {
    const merchandise = await Merchan.find({ status: "sell" })
      .sort({ name: "asc" });
    res.render("merchan/sold", { merchandise: merchandise });
});

// Rented Merchandise //
router.get("/rent", async (req, res) => {
    const merchandise = await Merchan.find({ status: "rent" })
      .sort({ name: "asc" });

    res.render("merchan/rented", { merchandise: merchandise });
});

// Register new merchandise //
router.get("/create", async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ name: "asc" });
        res.render("merchan/create", { categories: categories });
    } catch (error) {
        res.redirect("/");
    }
});

router.post("/create", async (req, res) => {
    let error = [];
    const code = req.body.code;
    const category = req.body.category;
    const sellPrice = req.body.sellPrice;
    const buyPrice = req.body.buyPrice;
    const provider = req.body.provider;

    // Begin of validation

    if (!sellPrice || sellPrice === undefined || typeof sellPrice === null) {
        error.push({
            error_message: "Valor de venda inválido."
        });
    }

    if (!category || category === undefined || typeof category === null) {
        error.push({
            error_message:
                "Por favor, dê uma identificação alfanumérica para o produto."
        });
    }

    if (error.length > 0) {
        req.flash("error_msg", error);
        res.redirect("/merchan/create");
    } else {
        // Starting the user creation at Database
        const newMerchan = new Merchan({
            code: code,
            category: category,
            sellPrice: sellPrice,
            buyPrice: buyPrice,
            provider: provider
        });

        await Category.findOne({ name: category }).then(category => {
            category.has += 1;
            category.save();
        });

        await newMerchan.save().then(() => {
            res.redirect("/merchandise");
        });
    }
});

// Edit Merchandise //
router.get("/edit/:id", async (req, res) => {
    await Merchan.findOne({ _id: req.params.id })
        .then(merchandise => {
            res.render("merchan/edit", { merchandise: merchandise });
        })
        .catch(error => {
            res.redirect("/merchandise");
            console.log(error);
        });
});

router.post("/edit", async (req, res) => {
    // Begin of the validation
    let $id = req.body.id
    let $code = req.body.code;
    let $category = req.body.category;
    let $sellPrice = req.body.sellPrice;
    let $buyPrice = req.body.buyPrice;
    let $provider = req.body.provider;

    try {
        const merchan = await Merchan.findOne({ _id: $id });
        merchan.code = $code;
        merchan.category = $category;
        merchan.sellPrice = $sellPrice;
        merchan.buyPrice = $buyPrice;
        merchan.provider = $provider

        await merchan
            .save()
            .then(() => {
                res.redirect("/merchandise");
            })
            .catch(error => {
                res.redirect("/merchandise");
                console.log(error);
            });
    } catch (err) {
        res.redirect("/merchandise");
        console.log(error);
    }
});

// Delete //
router.post("/delete", async (req, res) => {
    try {
        await Category.findOne({ _id: req.body.category }).then(category => {
            category.has = category.has - 1;
            category.save();
        });

        function deleteMerchan() {
          Merchan.findOneAndDelete({ _id: req.body.id }).then(() => {
              res.redirect("/merchandise")
          });
        }
        await deleteMerchan();

    } catch (error) {
        await deleteMerchan();
      }
});

module.exports = router;
