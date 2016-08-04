var express=require('express');
var handlbars=require('express3-handlebars');
var SessionSockets = require('session.socket.io')
var store = require("./store.js");
// var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
// var expressSession = require('express-session');
// var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it

var app=express();

// app.use(cookieParser());
// app.use(expressSession({secret:'chatApp'}));
// app.use(bodyParser());

var server=app.listen(process.env.PORT||7000);
var io=require('socket.io')(server);

app.engine('handlebars',handlbars({defaultLayout:"main"}));
app.set('view engine','handlebars')

app.get('/',(req,res) => {
	var luckyNumber=Math.round(Math.random()*10);
	res.render('index',{name:'Pritesh',company:'Tavisca',luckyNumber:luckyNumber});
});

app.get('/about', (req,res)=> {
	res.render('about');
});

app.get('/chat', (req,res)=> {
	res.render('chat');
});

app.get('/chatLogin', (req,res)=> {
	res.render('chatLogin');
});

app.get('/api/getUsers',(req,res) => {
	var users=store.getUsers();
	res.json({'users':users});
});

app.use('/public',express.static('public'));

io.on('connection', (socket)=> {

	socket.on('userLogin',(userName)=>{
		var result='chat';
		store.addUser(userName);
		console.log('User Connected: ' + userName);
		socket.emit('userLogin',{redirectUrl:result});
	});

  	socket.on('chat message', (msg)=> {
		console.log('message: ' + msg);
		socket.emit('message date',{'date':new Date(),'data':msg});
  });
});

String.format = function() {
      var s = arguments[0];
      for (var i = 0; i < arguments.length - 1; i++) {
          var reg = new RegExp("\\{" + i + "\\}", "gm");
          s = s.replace(reg, arguments[i + 1]);
      }
      return s;
  }



