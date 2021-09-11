const bcrypt = require('bcrypt');
const Register = require("../models/Register");

const registerUser = (req, res) => {

    let errors = [];
    res.render('register', { errors: errors });

}

const postRegisterUser = async (req, res) => {

    try {
        
        let errors = [];
        const { name, email, password, confirmPassword} = req.body;

        //validation

        //check all fields
        if (!name || !email || !password || !confirmPassword) {
            
            errors.push({ message: 'Please provide all fields' });
        }
        //check password match
        if (password !== confirmPassword) {
            
            errors.push({ message: 'Password doesnot match. please try again.' });
        }
        //password limited to 10 characters
        if (password.length > 10) {
            
            errors.push({ message: 'Password should be atleast 10 characters' });
        }

        //errors exists
        if (errors.length > 0) {
            
            res.render('register', { errors: errors });

        } else {
            
            //check user exists
            const user = await Register.findOne({ email: email });
            if (user) {
                
                errors.push({ message: 'User already exists' });
                res.render('register', { errors: errors });

            } else {
                
                //create new user
                const newUser = new Register({

                    name,
                    email,
                    password,

                });

                // bcrypt password
                bcrypt.genSalt(10, (err, salt) => {

                    bcrypt.hash(newUser.password, salt, async (err, hash) => {

                        if (err) throw err;

                        //hash
                        newUser.password = hash;

                        //save password
                        await newUser.save();
                        
                        res.redirect('/products/login');

                    });
                });

            }
        }

    } catch (err) {
        
        console.log(err);
    }
}

module.exports = {

    registerUser,
    postRegisterUser
}