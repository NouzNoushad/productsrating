const passport = require('passport');
const loginUser = (req, res) => {

    res.render('login');

}

const postLoginUser = passport.authenticate('local', {

    successRedirect: '/products',
    failureRedirect: '/products/login',
    successFlash: true,
    failureFlash: true

});

module.exports = {

    loginUser,
    postLoginUser

}