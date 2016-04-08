
  var db = require('../db');
  var model = {};

  model.cadastrarUsuario = function (params, callback) {
    db.collection('concrete_solutions_document').insert(params, callback);
  };

  model.retornarUsuario = function (params, callback) {
    db.collection('concrete_solutions_document').find(params, callback);  	
  };

  model.atualizarUsuario = function (params, usuario, callback) {
  	db.collection('concrete_solutions_document').update(params, usuario, callback);
  };

  module.exports = model;