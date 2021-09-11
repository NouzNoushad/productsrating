const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport')
const flash = require('connect-flash');
const dotenv = require('dotenv');

const productRoute = require('./routes/product');
dotenv.config({ path: './config/.env' });
require('./config/db');
require('./config/auth/passport')(passport);

const app = express();

const PORT = process.env.PORT | 8000;

//ejs engine
app.set('view engine', 'ejs');

//middleware
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//session
app.use(session({

    secret: 'secretKey',
    resave: true,
    saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash
app.use(flash());

//Global vars
app.use((req, res, next) => {

    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/products', productRoute);

app.listen(PORT, () => console.log(`Server running on port, http://localhost:${PORT}`));