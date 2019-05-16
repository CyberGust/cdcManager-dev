// Dependencies //
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const flash = require("connect-flash");

// Task, Customer, Merchan
require("../models/Task");
const Task = mongoose.model("task");
require("../models/Customer");
const Customer = mongoose.model("customer");
require("../models/Merchan");
const Merchan = mongoose.model("merchan");

// Sell, Rent, Consume
require("../models/Sell");
const Sell = mongoose.model("sell")
require("../models/Rent");
const Rent = mongoose.model("rent");
require("../models/Consume");
const Consume = mongoose.model("consume");

// Dashboard show all tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find({}).sort({ name: "asc" });
    res.render("task/dashboard", { tasks:tasks });
});

// Create new tasks
router.get("/create", async (req, res) => {
    const customers = await Customer.find({}).sort({ name: "asc" });
    const merchandise = await Merchan.find({}).sort({ name: "asc" });

    res.render("task/create", { customers:customers, merchandise:merchandise });
});

router.post("/create", async (req, res) => {
    // Begin of the validation
    let error = [];
    let $customer = req.body.customer;
    let $merchandise = req.body.merchandise;
    let $gender = req.body.gender;

    if(!$customer || !$merchandise || !$gender) {
        req.flash("success_message", "Com excessão de 'Detalhes', todos os campos são obrigatórios!");
        console.log("There are blank fields.");
    }

    if($customer === undefined || typeof $customer === null) {
        req.flash("success_message", "Ops, algo deu errado! Tente novamente.");
        console.log("$customer 'undefined' or 'null'.")
    }

    if($merchandise === undefined || typeof $merchandise === null) {
        req.flash("success_message", "Ops, algo deu errado! Tente novamente.");
        console.log("$merchandise 'undefined' or 'null'.")
    }

    if($gender === undefined || typeof $gender === null) {
        req.flash("success_message", "Ops, algo deu errado! Tente novamente.");
        console.log("$gender 'undefined' or 'null'.")
    } else {

        // Start of Task creation
        const newTask = await new Task({
            customer: $customer,
            merchandise: $merchandise,
            gender: $gender,
            details: req.body.details
        });

        if (newTask.gender === "sell") {
            const newSelling = await new Sell({
                task: newTask
            });
            await newSelling.save();
        }

        if (newTask.gender === "rent") {
            const newRenting = await  new Rent({
                task: newTask
            });                                // The 'if' cadence is verifying to which collection shall
            await newRenting.save();          // be added this new task: Sell, Rent or Self consume?
        }

        if (newTask === "consumable") {
            const newConsuming = await new Consume({
                task: newTask
            });
            await newConsuming.save();
        }

        await newTask.save().then(() => {
            req.flash("success_message", "Tarefa criada com sucesso.");
            res.redirect("/task");
        }).catch(error => {
            res.send(error);
        });
    }

});

// Delete
router.post("/delete", async (req, res) => {
    try {
        
        await Task.findOneAndDelete({ _id: req.body.id }).then(() => {
            res.redirect("/task");
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;