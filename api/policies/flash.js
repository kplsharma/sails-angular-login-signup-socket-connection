module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
 res.locals.flash ={};
 if(!req.session.flash) return next();
 res.locals.flash = _.clone(req.session.flash);

 // clear flash

 req.session.flash ={};
 next();
};
