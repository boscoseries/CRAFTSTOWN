//First we import some useful node libraries into the file using require()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
//define 3rd party middleware (install as dependency)
var cookieParser = require('cookie-parser');
//define 3rd party middleware "morgan" HTTP request for logger (install as dependency)
var logger = require('morgan');

//defina and require() modules from our routes directory.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//Next we create the app object using our imported express module and then use it to set up the view (template) engine.
var app = express();

// view engine setup
  //app.set('port', process.env.PORT || 3000);
// Set directory to contain the templates ('views')
app.set('views', path.join(__dirname, 'views'));
// Set view engine to use pug
app.set('view engine', 'jade');

//tell app to use 3rd party middleware logger
app.use(logger('dev'));

//Built-in middleware to parse JSON requests
app.use(express.json());

//Built-in middleware to parse URLENCODED requests
app.use(express.urlencoded({ extended: false }));

//tell app to use 3rd party middleware cookieParser
app.use(cookieParser());

//Built-in middleware to serve static files in the /public directory in the project root.
app.use(express.static(path.join(__dirname, 'public')));

//call routhe paths for app use.
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//http.createServer(app).listen(app.get('port'), function (){
 // console.log('server listening on port ' + app.get('port'));
//});

module.exports = app;
