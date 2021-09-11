const User = require('../models/User');

const getProduct = async (req, res) => {

    try {
        
        const users = await User.find();

        //Average rating
        let totalRating = 0;
        const userRatings = users.map(user => user.rating);
        const sumRatings = userRatings.reduce((acc, curr) => {

            totalRating++;
            return acc + curr;

        }, totalRating);

        const averageRatings = (sumRatings / totalRating).toString().slice(0, 3);

        res.render('index', { users: users, averageRatings: averageRatings });

    } catch (err) {
        
        console.log(err);
    }
    
}

module.exports = getProduct;