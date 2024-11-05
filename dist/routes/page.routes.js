"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const pageRouter = (0, express_1.Router)();
let users = [{ username: "admin", password: "admin12345" }];
// Home route
pageRouter.get("/", (req, res) => {
    res.status(200).send("<h1>This is your home</h1>");
});
// Login route
pageRouter.get("/login", auth_1.checkLoginAuth, (req, res) => {
    res.status(200).render("login");
});
// Login post
pageRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const found = users.find((user) => user.username === username && user.password === password);
    if (found) {
        res.cookie("user_info", JSON.stringify({
            username: found.username,
            password: found.password,
        }), {
            maxAge: 3 * 60 * 1000,
            httpOnly: true,
        });
        res.redirect("/profile");
    }
    else {
        res.redirect("/login");
    }
});
pageRouter.get("/profile", (req, res) => {
    res.status(200).render("profile");
});
// Logout
pageRouter.get("/logout", (req, res) => {
    res.clearCookie("user_info");
    res.redirect("/");
});
exports.default = pageRouter;
