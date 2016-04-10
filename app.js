
  var express = require('express');
  var app = express();
  var routes = require('./route');
  var bodyParser = require('body-parser');
  var validator = require('express-validator');
  var bearerToken = require('express-bearer-token');
  var validation = require('./validation');

  // lida com o body contido no request
  app.use(bodyParser.urlencoded({extended : true})); 
  app.use(bodyParser.json());

  // seta token provindo do Authorization na propriedade req.token
  app.use(bearerToken());

  // middleware para validação
  app.use(validator());

  // valida parametros passados na requisição
  app.post('/usuario', validation.cadastrarUsuario);
  app.get('/usuario/:id', validation.retornarUsuario);
  app.put('/signIn', validation.signIn);

  // lida com o roteamento de requisições
  app.use('/', routes); 

  // lida com requisições inválidas
  app.use(function(req, res) {
    res.status(404).json({
      mensagem: 'Recurso não existente'
    });
  });

  app.listen(process.env.PORT || 3000, function () {
    console.log('Server no ar');
  });