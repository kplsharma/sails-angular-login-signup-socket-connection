/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

 schema : true,

  attributes: {
  	
  	fullname:{
  		type:"string",
  		required:true

  	},
  	username:{
  		type:"string",
  		required:true,
  		unique:true
	},
  	email:{
  		type:"string",
  		required:true,
  		email:true,
  		unique:true
  	},
  	password:{
  		type:"string",
  		required:true
  	},
  	activated: {
      type: 'boolean',
      defaultsTo: false
    },
    activationToken: {
      type: 'string'
    },
    online:{
      type:'boolean',
      defaultsTo:false
    },
    admin:{
      type: 'boolean',
      defaultsTo:false
    },
    toJSON: function() {
  		var obj =this.toObject();
  		delete obj._csrf;
  		delete obj.password;
  		delete obj.activated;
  		delete obj.activationToken;
  		return obj ; 
  	},



  },
  beforeCreate: function (vals, next) {
  	// if (vals.password) {};
  	var bcrypt = require('bcrypt');
  	bcrypt.hash(vals.password, 10, function passwordEncrypted (err, encryptedPassword) {
  		if (err) return next(err);
  		vals.password = encryptedPassword;
  		vals.activated = false; //make sure nobody is creating a user with activate set to true, this is probably just for paranoia sake
      vals.admin=false;
  		var salt1 = bcrypt.genSaltSync(7);
		var hash1 = bcrypt.hashSync(new Date().getTime()+vals.email, salt1);
		vals.activationToken = hash1 //bcrypt.hashSync(, 3);
  		//vals.online = true ;
  		next();
  	});
  	
  }

};

