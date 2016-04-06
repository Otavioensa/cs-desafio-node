	
	var router = require('express').Router();
	var controller = require('../controller');

	router.post('/usuario', controller.cadastrarUsuario);
	router.get('/usuario', controller.retornarUsuario);
	
	// Falta melhor especificação para o endpoint abaixo
	router.post('/signIn', controller.signIn);

	module.exports = router;