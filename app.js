var express=require('express');
var handlbars=require('express3-handlebars');

var app=express();

app.engine('handlebars',handlbars({defaultLayout:"main"}));
app.set('view engine','handlebars')

app.get('/',function(req,res){
	var luckyNumber=Math.round(Math.random()*10);
	res.render('index',{name:'Pritesh',company:'Tavisca',luckyNumber:luckyNumber});
});

app.get('/about',function (req,res) {
	res.render('about');
});

app.use('/public',express.static('public'));
app.listen(process.env.PORT||7000);

