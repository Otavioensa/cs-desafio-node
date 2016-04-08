//TO DO: Criar arquivo que conterá mensagens, afim de nao
// mante-las no código 

  var guid = require('guid');
  var moment = require('moment');
  var jwt = require('jsonwebtoken');
  var model = require('../model');
  var controller = {};

  controller.cadastrarUsuario = function (req, res) {

    var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

    var params = {
      _id: String(guid.create()),
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
      token: token,
      telefones: req.body.telefones
    };

    model.cadastrarUsuario(params, function (err, result) {     
      
      if (err) {
        res.status(422).json({ mensagem: 'Problema ao inserir no banco de dados' });
      } else {
        
        var response = {          
          usuario: result,
          data_criacao: moment().format('YYYY-MM-DD'),
          data_atualizacao: moment().format('YYYY-MM-DD'), // data quando atualizr - fizer login ?
          ultimo_login: moment().format('YYYY-MM-DD')
        };

        res.json(response);
      }

    });
  };

  controller.retornarUsuario = function (req, res) {
    
    try {
      var decoded = jwt.verify(req.headers.token, 'shhhhh');
    } catch(err) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    var params = {
      '_id': req.params.id
    };

    model.retornarUsuario(params, function (err, result) {      

      if (err) {
        res.status(422).json({ mensagem: 'Problema ao inserir no banco de dados' });
      } else if (result[0].token !== req.headers.token) {
        res.status(401).json({ mensagem: 'Não autorizado' });
      } else {
        res.json(result);
      }

    });

  };

  // Nao esquecer de atualizar usuario quando realizr login
  controller.signIn = function (req, res) {
  };

  module.exports = controller;  
