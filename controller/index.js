
	var guid = require('guid');
	var moment = require('moment');
	var jwt = require('jsonwebtoken');
	var model = require('../model');
	var controller = {};

	controller.cadastrarUsuario = function (req, res) {

		var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

		var params = {
			nome: req.body.nome,
			email: req.body.email,
			senha: req.body.senha,
			telefones: req.body.telefones
		};

		var response = {
			_id: guid.create(),
			data_criacao: moment().format('YYYY-MM-DD'),
			data_atualizacao: moment().format('YYYY-MM-DD'), // data quando atualizr - fizer login ?
			ultimo_login: moment().format('YYYY-MM-DD'),
			token: token,
			usuario: params //será substituído pela resposta do banco de dados
		};

	res.send(response);
	};

	controller.retornarUsuario = function (req, res) {
	};

	// Nao esquecer de atualizar usuario quando realizr login
	controller.signIn = function (req, res) {
	};

	module.exports = controller;	
