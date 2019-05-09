// Dependencies //
    const express = require("express");
    const router = express.Router();
    const mongoose = require("mongoose");
    require("../models/User");
    const User = mongoose.model("user");
    const bcrypt = require("bcryptjs");
    const passport = require("passport");

// Routes
    // Home //
        router.get("/", (req, res) => {
            res.render("user/dashboard");
        });
    
    // Register new user
        router.get("/register", (req, res) => {
            res.render("user/register")
        });

        router.post("/register", async (req, res) => {
            let error = [];
            const username = req.body.username;
            const phone = req.body.phone;
            const email = req.body.email;
            const password = req.body.password;
            
            // Begin of validation
            if (!username || username === undefined || typeof username === null) {
                error.push({
                    error_message:
                        "Nome de usuário inválido. Por favor, revise o campo 'Nome de usuário'"
                });
            }

            if (!phone || phone === undefined || typeof phone === null || phone < 10) {
                error.push({
                    error_message:
                        "Telefone inválido. Certifique-se de que informou o código de área."
                });
            }

            if (!email || email === undefined || typeof email === null) {
                error.push({
                    error_message: "Email inválido. Por favor, revise o campo 'Email'."
                });
            }

            if (!password || password === undefined || typeof password === null) {
                error.push({
                    error_message: "Senha inválida. Por favor, revise o campo 'senha'."
                });
            }

            if (password.length < 8) {
                error.push({
                    error_message:
                        "Senha muito curta. A senha deve conter no mínimo 8 caracteres."
                });
            }

            if (password != req.body.pwdConfirm) {
                error.push({ error_message: "As senhas não coincidem." });
                console.log(password, req.body.pwdConfirm)
            }

            if (error.length > 0) {
                console.log(error);
                req.flash("error", "teste");
                res.redirect("/user/register");
            } else { 
                
                await User.findOne({ email:email })
                    .then(user => {
                        if (user) {
                            error.push({ error_message: "Email já cadastrado!" });
                            console.log(error);
                            res.redirect("/user/register");

                            // End of validation
                        } else {
                            // Starting the user creation at Database
                            const newUser = new User({
                                name: req.body.username,
                                phone: req.body.phone,
                                email: req.body.email,
                                password: req.body.password
                            });

                            // Password encryption
                            bcrypt.genSalt(10, (error, salt) => {
                                bcrypt.hash(newUser.password, salt, (error, hash) => {
                                    if (error) {
                                        res.send(error);
                                    }

                                    // Forgeting what was typed and saving as encrypted form
                                    newUser.password = hash;

                                    newUser
                                        .save()
                                        .then(() => {
                                            res.redirect("/user/login");
                                        })
                                        .catch(error => {
                                            res.send(error);
                                        });
                                });
                            });

                            // console.log(username, phone, email, password)
                            
                        }
                    })
                    .catch(error => {
                        res.send(error);
                    });
            }
        });
    
    // Login //
        router.get("/login", (req, res) => {
            res.render("user/login");
        });

        router.post("/login", (req, res, next) => {
            passport.authenticate("local", {
                successRedirect: "/user/",
                failureRedirect: "/user/login",
                failureFlash: true
            })(req, res, next);
        });

    // Logout //
        router.get("/logout", (req, res) => {
            req.logOut();
            req.flash("success_msg", "Deslogado com sucesso!");
            res.redirect("/user/login");
        });

    module.exports = router;
