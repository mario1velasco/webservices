const express = require('express');
const app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const server = require('http').Server(app);
const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

require('./config/socket')();

const chats = require('./routes/chat.routes')


app.use(cors())
// view engine setup
app.use(expressLayouts);
app.set('layout', 'layouts/layout');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

socket(server);

app.use('/', chats)
app.use('/chats', chats)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

server.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});

module.exports = app;