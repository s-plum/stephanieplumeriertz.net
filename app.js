import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import appData from './data/index';

//route functions
import index from './routes/index';
import code from './routes/code';
import noms from './routes/noms';

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//custom headers and domain information
app.use(function(req, res, next) {
    res.header('X-Powered-By', 'Cupcakes');
    res.locals.domain = (req.connection && req.connection.encrypted ? 'https' : 'http') + '://' + req.headers.host;
    next();
});


app.use('/noms', noms);
app.use('/code', code);
app.use('/', index);

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

//local data
appData.then(data => {
	app.locals.data = data;
});

module.exports = app;
