var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/auth/profile',
    failureRedirect : 'auth/signup'
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/auth/profile',
    failureRedirect : '/auth/fail'
}));

router.get('/fail', (req, res) => {
    res.status(400).json({message:'Login Failed Invalid Username or password'});
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.status(200).json({message:'Login Success' ,data:req.user});
});
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.status(200).json({
        'message': 'successfully logout'
    });
});

module.exports = router;

//route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied Please Login'
    });
}