import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/dashboard');
    });

router.get("/login", forwardAuthenticated, (req, res) => {
    const messages = (req.session as any).messages || []; 
    res.render("login", { messages });
    (req.session as any).messages = []; 
});

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/auth/login",
        failureMessage: true,  
    })
);


router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) console.log(err);
    });
    res.redirect("/auth/login");
});

export default router;
