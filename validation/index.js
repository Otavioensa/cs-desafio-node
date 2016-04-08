
  var validation = {};

  validation.cadastrarUsuario = function (req, res, next) {
    
  	req.checkBody("email", "Informe um email válido").notEmpty().isEmail();
  	req.checkBody("nome", "Informe um nome").notEmpty();
  	req.checkBody("senha", "Informe um senha").notEmpty();
  	req.checkBody("telefones[0].numero", "Informe pelo menos um número de telefone").notEmpty();
  	req.checkBody("telefones[0].ddd", "Informe pelo menos um ddd de telefone").notEmpty();

	  var errors = req.validationErrors();

	  if (errors) {
	    res.status(400).json({
	    	mensagem: errors[0].msg
	    });
	    return;
	  }

	  next();
  };

  validation.retornarUsuario = function (req, res, next) {

  	req.checkParams("id", "Informe um id").notEmpty();  	
  	req.checkParams("id", "Informe um id com 36 caracteres").isLength(36);  	
  	
	  var errors = req.validationErrors();  

  	if (errors) {
	    res.status(400).json({
	    	mensagem: errors[0].msg
	    });
	    return;
	  }

	  next();
  };

  validation.signIn = function (req, res, next) {

    req.checkBody("email", "Informe um email válido").notEmpty().isEmail();
    req.checkBody("senha", "Informe um senha").notEmpty();
    
    var errors = req.validationErrors();

    if (errors) {
      res.status(400).json({
        mensagem: errors[0].msg
      });
      return;
    }

    next();
  };

  module.exports = validation;