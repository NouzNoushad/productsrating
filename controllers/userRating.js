const User = require('../models/User');

const getUserRating = (req, res) => {

    try {
        
        let errors = [];
        return res.render('rating', {errors: errors});

    } catch (err) {
        
        console.log(err);
    }
    
}

const postUserRating = async (req, res) => {

    try {

        //validations
        const { username, rating, review, message } = req.body;

        let errors = [];
        //check all fields
        if (!username || !rating || !review || !message) {
            
            errors.push({ message: 'Please provide all fields' });
        }

        //check rating is a number
        if (!Number(rating)) {
            
            errors.push({ message: 'Please rate in Numbers. Rate 1-5'})
        }

        //ratings limited to 5
        if (rating > 5) {
            
            errors.push({ message: 'Rating should not exceed 5' });
        }

        //review limited to 20 characters
        if (review.length > 20) {
            
            errors.push({ message: 'Please provide breif review' });
        }
        
        //errors
        if (errors.length > 0) {
            
            return res.render('rating', { errors: errors });

        } else {
            
            //create new user
            const newUser = await User.create(req.body);
            req.flash('success_msg', `${newUser.username} has rated the product`);
            return res.redirect('/');

        }

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = {

    getUserRating,
    postUserRating

}