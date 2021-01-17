var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
// const expressSession = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer')

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var filmRouter = require('./routes/films');
const GMAIL_USER = 'lamlevu2610@gmail.com';
const GMAIL_PASS = 'LaM261019@'
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.static('public'));
app.use(bodyParser.json());
// app.use(expressSession({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: 60 * 60 * 24,
//    },
// }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/film', filmRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('DB Connected')
);

module.exports = app;
