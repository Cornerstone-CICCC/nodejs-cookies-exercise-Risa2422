"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginAuth = void 0;
// Check authToken cookie for Login page
const checkLoginAuth = (req, res, next) => {
    const { authToken } = req.signedCookies;
    if (authToken === "authenticated") {
        res.redirect("/profile");
    }
    else {
        next();
    }
};
exports.checkLoginAuth = checkLoginAuth;
