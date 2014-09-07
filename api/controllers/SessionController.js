/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
module.exports = {
	'login':function  (req, res) {
		// var oldDateObj = new Date();
		// var newDateZObj =  new Date(oldDateObj.getsimeTime()+60000);
		// req.session.cookie.expires = newDateZObj;
		// req.session.authenticated = true;
		// console.log(req.session);
		//res.view('sess/new');
		if (req.isSocket) {
			console.log("login page in socket");
            return res.json({status: 403, redirectTo: "/sess/new"});
        } else {
             res.view('sess/new');
        }
	},
	'create': function  (req,res, next) {
		if (!req.param('email') || !req.param('password')) {
			var usernamePasswordRequiredError = [{name : 'usernamePasswordRequired', message:'You must enter both username and password'}]
			req.session.flash ={
				err: usernamePasswordRequiredError
			}
			res.redirect('/session/login');
			return;
		}
		User.findOneByEmail(req.param('email'), function  (err, user) {
			if (err) return next(err);
			if (!user) {
				var noAccountError = [{name:'noAccount', message:'The email address '+req.param('email')+' not found'}];
				req.session.flash = {
					err:noAccountError
				}
				res.redirect('/session/login');
				return;
			};
			bcrypt.compare(req.param('password'), user.password, function  (err, valid) {
				if (err) return next(err);
				if (!valid) {
					var usernamePasswordMismatchError = [{name:'usernamePasswordMismatch', message:'Invalid username and password combination'}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/login');
					return;
				};
				req.session.authenticated = true;
				req.session.User = user;
				user.online = true;
				// console.log(user);
				user.save(function  (err,user) {
					if (err) return next(err);
					// Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
					console.log('loged in publishUpdate');
					User.publishUpdate(user.id, {
						loggedIn: true,
						id: user.id,
						name: user.fillname,
						action: ' has logged in.'
					});
					console.log('loged in publishUpdate');


					if (req.session.User.admin) {
						res.redirect('/user');
						return;
					};
				});

				res.redirect('/user/');

			});
		});
		
	},
	'logout':function  (req, res, next) {
		//console.login(req.session.User);
		User.findOne(req.session.User.id, function foundUser (err, user) {
			var userId = req.session.User.id;
			User.update(userId,{
				online:false
			}, function  (err) {
				if (err) return next(err);

				// Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.

					User.publishUpdate(userId, {
						loggedIn: false,
						id: userId,
						name: user.fullname,
						action: ' has logged out.'
					});

				req.session.destroy();
				return res.redirect('/session/login');
			});
		});
		
	}
};

