/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'signup':function (req, res) {

		if (req.isSocket) {
            return res.json({status: 403, redirectTo: "/user/signup"});
        } else {

			res.view();
		}
	},

	'create': function (req, res, next) {
		console.log("got sothing "+req.param('fullname'));
		//"req: "+req.param('fullname')
		var params = {
			'fullname' : req.param('fullname'),
			'username' : req.param('username'),
			'email' : req.param('email'),
			'password' : req.param('password')
		};

		User.create( params,function userCreated(err, user) {
			if (err) {
				req.session.flash = {
					err:err
				}
				return res.redirect('/user/signup');
			}

			req.session.authenticated = true;
			req.session.User = user;
			//res.status(201)
			//res.json(user);
			user.online = true;
			user.save(function  (err, user) {
				if (err) return next(err);

				User.publishCreate(user.id, user);
				res.redirect('/user/show/'+user.id);
			});
			

			// if(err){
			// 	res.json(err);
			// } //return// next(err);
			// else
			// {
			// 	req.session.authenticated = true;
			// 	req.session.User = user;
			// 	res.status(201)
			// 	res.json(user);
			// }
		});
	},

	'update': function (req, res, next) {

		//console.log(req.params.all());
		//"req: "+req.param('fullname')
		var id = req.param('id');

		var params = {
			'fullname' : req.param('fullname'),
			'username' : req.param('username'),
			'email' : req.param('email')
		};

		User.update(req.param('id'), req.params.all(), function userUpdated(err, user) {
			if(err){
				return res.redirect('/user/edit/'+id);
			} //return// next(err);
			User.publishUpdate(user.id, {
						loggedIn: true,
						id: user.id,
						name: user.fillname,
						action: ' has logged in.'
					});
			res.redirect('/user/show/'+id);
		});
	},
///user/update
	'show':function (req, res, next) {

	//console.log("got sothing "+req.param('id'));
	var id = req.param('id');
		
		User.findOne(req.param("id"), function foundUser (err, user) {
			if(err) return next(err);
			if(!user) return next();

			User.publishUpdate(user.id, user);

			res.view({
				user:user
			});
		});
	},

	'index':function (req, res, next) {
	
		User.find(function foundUsers (err, users) {
			if(err) return next(err);
			
			if (req.isSocket) {
				
				

            	return res.json({status: 403, redirectTo: "/user"});
        	} else {

				res.view({
					users:users
				});
			}

		});
	},
	'edit':function (req, res, next) {

	console.log("got sothing "+req.param('id'));
	var id = req.param('id');
		
		User.findOne(req.param("id"), function foundUser (err, user) {
			if(err) return next(err);
			if(!user) return next('User does\'t exist.');
			res.view({
				user:user
			});
		});
	},
	destroy :function (req, res, next) {
		User.findOne(req.param('id'), function foundUser (err, user) {
			if (err) return next(err);
			if (!user) return next('User does\'t exist.');
			User.destroy(req.param('id'), function userDestroyed (err) {
				if (err) return next(err);

				//publish
				var a = User.publishUpdate(user.id, {
	          		name: user.fullname,
	          		action: ' has been destroyed.'
	        	});
				console.log(a);
	        	// Let other sockets know that the user instance was destroyed.
	        	User.publishDestroy(user.id);


			});
			res.redirect('/user');
		});
	},
	'subscribe':function  (req, res) {
		User.find(function foundUsers (err, users) {
		//User.subscribe(req.socket);
		// console.log("in subscribe");
		 	if (req.isSocket) {
      			User.watch(req.socket);
      			res.send(200);
    		}
		// User.watch(req);

		// User.subscribe(req.socket, users);

		
  //       res.send(200);
	});
	}
	
};

