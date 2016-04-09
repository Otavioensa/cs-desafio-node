
  /*
    * TO DO: Criar arquivo que conterá mensagens, afim de nao
    * mante-las no código 
  */

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
          data_atualizacao: moment().format('YYYY-MM-DD'),
          ultimo_login: moment().format('YYYY-MM-DD')
        };

        res.json(response);
      }
    });

  };

  controller.retornarUsuario = function (req, res) {

    try {
      var decoded = jwt.verify(req.token, 'shhhhh');
    } catch(err) {

      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ mensagem: 'Sessão inválida' });
      } else {
        return res.status(401).json({ mensagem: 'Não autorizado' });
      }

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

  // TO DO: Ajustar status code
  controller.signIn = function (req, res) {

    //1800 segundos = 30 minutos
    var token = jwt.sign({ foo: 'bar' }, 'shhhhh', {expiresInSeconds: 1800});
    
    var params = {
      
      query: {
        $and: [
          { 'email': req.body.email },
          { 'senha': req.body.senha }
        ]
      },
      
      update: { 
        $set: { 
          ultimo_login: moment().format('YYYY-MM-DD'),
          data_atualizacao: moment().format('YYYY-MM-DD'),
          token: token
        } 
      },

      new: true    
    };

    model.signIn(params, function (err, result, lastErrorObject) {      

      if (err) {
        res.status(503).json({ mensagem: 'Erro ao fazer login.' });
      } else if (lastErrorObject.n < 1){
        res.status(422).json({mensagem: 'Usuário e/ou senha inválidos'});
      } else {
        res.json({ sigIn: true });
      }    

    }); 

  };

  module.exports = controller;  
