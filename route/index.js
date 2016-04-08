	
  var router = require('express').Router();
  var controller = require('../controller');

  router.post('/usuario', controller.cadastrarUsuario);
  router.get('/usuario/:id', controller.retornarUsuario);
  router.put('/signIn', controller.signIn);

  module.exports = router;