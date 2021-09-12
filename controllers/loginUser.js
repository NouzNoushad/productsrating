const passport = require('passport');
const loginUser = (req, res) => {

    try {
        
        return res.render('login');

    } catch (err) {
        
        console.log(err);
    }
    

}

const postLoginUser = passport.authenticate('local', {

    successRedirect: '/',
    failureRedirect: '/login',
    successFlash: true,
    failureFlash: true

});

module.exports = {

    loginUser,
    postLoginUser

}