const logoutUser = (req, res) => {

    try {
        
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/products');

    } catch (err) {
        
        console.log(err);
    }

}

module.exports = logoutUser;