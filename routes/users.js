var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');


var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        console.log(req.params);
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        console.log(req.body.email);
        res.redirect('/user/profile');
    }
});

//Needs to come first, before the '/' with notLoggedIn function in order to work properly
router.get('/profile', function(req, res, next) {
    res.render('user/profile');
});

module.exports = router;