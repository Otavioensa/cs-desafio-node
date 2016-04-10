
  var db = require('../db');
  var model = {};

  model.cadastrarUsuario = function (params, callback) {
    db.collection('concrete_solutions_document').insert(params, callback);
  };

  model.retornarUsuario = function (params, callback) {
    db.collection('concrete_solutions_document').find(params, callback);  	
  };

  model.signIn = function (params, callback) {
    db.collection('concrete_solutions_document').findAndModify(params, callback);
  };

  module.exports = model;