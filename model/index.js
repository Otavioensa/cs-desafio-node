
	var db = require('../db');
	var model = {};

  model.cadastrarUsuario = function (params, callback) {
    db.collection('concrete-solutions-document').insert(params, callback);
  }

  module.exports = model;