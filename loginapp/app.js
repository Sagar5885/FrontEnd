var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db = mongoose.connection;
var mustacheExpress = require('mustache-express');
var cloudinary = require('cloudinary');

var routes = require('./routes/index');
var users = require('./routes/users');
var index1 = require('./routes/index1');
var index2 = require('./routes/index2');

//init APP
var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//Body parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

//Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
	secret: 'secret',
	saveUnitInitialized: true,
	saveUninitialized: true,
	resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.')
		,root = namespace.shift()
		,formParam = root;

		while(namespace.lenght){
			formParam += '[' +namespace.shift()+ ']';
		}

		return{
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

//Connection Flash
app.use(flash());

//Global Vars
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/index1', index1);
app.use('/index2', index2);

//Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port' + app.get('port'));
});

//app.use(cloudinary.v2.uploader.image_upload_tag('image_id', { 
//      resource_type: "video", 
//      eager: [{streaming_profile:"full_hd", format:"m3u8"}], 
//      eager_async: true, 
//      eager_notification_url: "http://mysite/notify_endpoint", html: {id: "my_upload_tag"} 
//}));
