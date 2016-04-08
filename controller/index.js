//TO DO: Criar arquivo que conterá mensagens, afim de nao
// mante-las no código 

  var async = require('async');
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
        res.status(422).json({ mensagem: 'E-mail já existente.' });
      } else {
        
        var response = {          
          usuario: result,
          data_criacao: moment().format('YYYY-MM-DD'),
          data_atualizacao: moment().format('YYYY-MM-DD'), // quando fizer login
          ultimo_login: moment().format('YYYY-MM-DD') // quando fizer login
        };

        res.json(response);
      }

    });
  };

  // TO DO: implementar verificação de token expirado
  controller.retornarUsuario = function (req, res) {
    
    try {
      var decoded = jwt.verify(req.token, 'shhhhh');
    } catch(err) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    var params = {
      '_id': req.params.id
    };

    model.retornarUsuario(params, function (err, result) {      

      if (err) {
        res.status(422).json({ mensagem: 'Problema ao inserir no banco de dados' });
      } else if (result[0].token !== req.token) {
        res.status(401).json({ mensagem: 'Não autorizado' });
      } else {
        res.json(result);
      }

    });

  };

  // TO DO: Atualizar usuario quando realizar login
  // TO DO: implementar token que expire
  // TO DO: Ajustar status code
  controller.signIn = function (req, res) {

    var self = this;
    var params = {
      $and: [
        { 'email': req.body.email },
        { 'senha': req.body.senha }
      ]
    };

    self.atualizarUsuario = function (result, callback) {

    };

    async.waterfall([

      function (callback) {
        model.retornarUsuario(params, callback);
      },

      function (result, callback) {
        if (result.length < 1)
          callback({ statusErro: 422, mensagem: 'Usuário e/ou senha inválidos' })
        else
          self.atualizarUsuario(result, callback);
      }

    ], 
    function (err, result) {

      console.log(err)
      console.log(result)

    });




    /*model.retornarUsuario(params, function (err, result) {      

      if (err) {
        res.status(422).json({ mensagem: 'Erro ao realizar login' });
      } else if (result.length < 1) {
        res.status(422).json({ mensagem: 'Usuário e/ou senha inválidos' });
      } else {
        res.json(result);
      }


    });*/
    
    

  };

  module.exports = controller;  
