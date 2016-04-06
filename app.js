
	
var express = require('express');
var app = express();
var routes = require('./route');
var bodyParser = require('body-parser');

// lida com o body contido no request
app.use(bodyParser.urlencoded({extended : true})); 
app.use(bodyParser.json());

// lida com o roteamento de requisições
app.use('/', routes); 

// lida com requisições inválidas
app.use(function(req, res) {
	res.status(404).json({
		mensagem: 'Recurso não existente'
	});
});

app.listen(3000, function () {
	console.log('Server no ar');
});