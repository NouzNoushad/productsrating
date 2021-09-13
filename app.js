const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const dotenv = require('dotenv');

const productRoute = require('./routes/product');
dotenv.config({ path: './config/.env' });
require('./config/auth/passport')(passport);
const connectDB = require('./config/db');
connectDB();

const app = express();

const PORT = process.env.PORT || 8000;

//ejs engine
app.set('view engine', 'ejs');

//middleware
app.use(expressLayouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV == "production") {
    //static files
    app.use(express.static('public'));
}

//session
app.use(session({

    secret: 'secretKey',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })

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

app.use('/', productRoute);

app.listen(PORT, () => console.log(`Server running on port, http://localhost:${PORT}`));