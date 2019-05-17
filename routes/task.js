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

// Dashboard
// show all tasks //
router.get("/", async (req, res) => {
    const tasks = await Task.find({ status: true }).sort({ name: "asc" });
    res.render("task/dashboard", { tasks: tasks });
});

// Show completed tasks //
router.get("/completed", async (req, res) => {
    const tasks = await Task.find({ status: false }).sort({ name: "asc" });
    res.render("task/dashboard", { tasks: tasks }); 
});

// Create new tasks
router.get("/create", async (req, res) => {
    const customers = await Customer.find({}).sort({ name: "asc" });
    const merchandise = await Merchan.find({}).sort({ name: "asc" });

    res.render("task/create", {
        customers: customers,
        merchandise: merchandise
    });
});

router.post("/create", async (req, res) => {
    // Begin of the validation
    let error = [];
    let $customer = req.body.customer;
    let $merchandise = req.body.merchandise;
    let $gender = req.body.gender;
    let $earnings = req.body.earnings;
    let $deadline = req.body.deadline;

    if (!$customer || !$merchandise || !$gender || !$earnings || !$deadline) {
        req.flash(
            "success_message",
            "Com excessão de 'Detalhes', todos os campos são obrigatórios!"
        );
        error.push("Há campos obrigatórios em branco.")
    }

    if ($customer === undefined || typeof $customer === null) {
        req.flash("success_message", "Ops, algo deu errado! Tente novamente.");
        error.push("Cliente 'nulo' ou 'indefinido'.")
    }

    if ($merchandise === undefined || typeof $merchandise === null) {
        req.flash("success_message", "Ops, algo deu errado! Tente novamente.");
        error.push("Mercadoria nula ou indefinida.")
    }

    if ($gender === undefined || typeof $gender === null) {
        req.flash("success_message", "Ops, algo deu errado! Tente novamente.");
        error.push("Gênero 'nulo' ou 'indefinido'.")
    }
    
    if ($earnings === undefined || typeof $earnings === null) {
        req.flash("success_message", "Ops, algo deu errado! Tente novamente.");
        error.push("Ganhos 'nulo' ou 'indefinido'.")
    }
    
    if ($deadline === undefined || typeof $deadline === null) {
        req.flash("success_message", "Ops, algo deu errado! Tente novamente.");
        error.push("Prazo 'nulo' ou 'indefinido'.")
    }

    if (error.length > 0) {
        req.flash(error);
        console.log(error);
        res.redirect("/task/create")
    } else {
        // Start of Task creation
        const newTask = await new Task({
            customer: $customer,
            merchandise: $merchandise,
            gender: $gender,
            details: req.body.details,
            earnings: $earnings,
            deadline: $deadline
        });

        await newTask
            .save()
            .then(() => {
                req.flash("success_message", "Tarefa criada com sucesso.");
                res.redirect("/task");
            })
            .catch(error => {
                res.send(error);
            });
    }
});

// Complete task
router.post("/complete", async (req, res) => {
    try {
        const task = await Task.findOne({ _id:req.body.id });
        task.status = false;
        await task.save().then(() => {
            res.redirect("/task");
        });
    } catch (err) {
        res.redirect("/task");
        console.log(err);
    }
});

// Edit task
router.get("/edit/:id", async (req, res) => {
    const merchandise = await Merchan.find({}).sort({ name: "asc"});
    await Task.findOne({ _id: req.params.id }).then(tasks => {
        res.render("task/edit", { tasks:tasks, merchandise:merchandise });
    }).catch(error => {
        res.redirect("/client");
        console.log(error);
    });
});

router.post("/edit", async (req, res) => {
    // Begin of the validation
    let error = [];
    let $tag = req.body.tag
    let $customer = req.body.customer;
    let $merchandise = req.body.merchandise;
    let $gender = req.body.gender;
    let $earnings = req.body.earnings;
    let $deadline = req.body.deadline;

    try {
        const task = await Task.findOne({ _id:$tag });
        task.customer = $customer;
        task.merchandise = $merchandise;
        task.gender = $gender;
        task.earnings = $earnings;
        task.deadline = $deadline;

        await task.save().then(() => {
            res.redirect("/task");
        }).catch(err => {
            error.push(err);
            console.log(error);
        });
    } catch (err) {
        res.redirect("/task");
        error.push(err);
        console.log(error);
    };
})

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
