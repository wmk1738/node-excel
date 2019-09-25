var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let studentsRouter = require('./routes/students');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(require('cors')())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

require('./plugins/index')(app);
require('./routes/students')(app);

// app.listen('5000', () => {
//     console.log('监听5000端口')
// })
app.set('port', 5000); // 设定监听端口

// //启动监听
// var server = app.listen(app.get('port'), function () {
//     // debug('Express server listening on port ' + server.address().port);
// });

module.exports = app;
