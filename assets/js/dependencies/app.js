var socket = io.socket;

socket.get('/user/subscribe', function ( response ) {
    console.log("con", response);
});


// socket.get('/user', function ( response ) {
//     console.log("con", response);
// });

socket.on('message', function (msg) {
      console.log('Received new message from Sails about group #', msg.id);
      console.log('Here\'s what happened:',msg.verb);
      console.log('Here\'s the relevant data:', msg.data);
});


// socket.on('message', function(message) {
//   console.log("onuser message", message);
//   // if(message.verb === 'created') {
//   //   console.log('new remark');
//   //   console.log(message);
//   //   //appendNewRemark(message.data);
//   // }
// });

// socket.get('/user/subscribe', function(data){
//   console.log('Subscribed', data);
// });

// // function appendNewRemark(remark) {
// //   console.log('inside appendNewRemark');
// //   var $chats = $('.chats');
// //   $('.chats').prepend('<li class="chat">' +
// //     '<strong>MC Solar</strong>' +
// //     '<em>5 minutes ago</em>' +
// //     '<p>' + remark.payload + '</p>' +
// //   '</li>');
// // }

// socket.get('/user', function(remarks) {
//   console.log('inside get',remarks);
//   // var remark;
//   // remarks = remarks.reverse();
//   // for (var i in remarks) {
//   //   remark = remarks[i];
//   //   appendNewRemark(remark);
//   // }
// });

// $(function whenTheDomIsReady() {

//   var $form = $('[data-form] input');

//   $form.keypress(function(e) {
//     if(e.keyCode == 13) {
//       var chatToSend = $form.val();

//       console.log('inside');
//       //TODO lock input, draw loading spinner
//       socket.post('/remark', {
//                  payload: chatToSend
//       }, function whenTheServerResponds() {
//         //TODO clear input, hide loading spinner
//         console.log('posted to remark');
//         $(e.currentTarget).val();
//       });
//     }
//   });
// });























// /**
//  * app.js
//  *
//  * This file contains some conventional defaults for working with Socket.io + Sails.
//  * It is designed to get you up and running fast, but is by no means anything special.
//  *
//  * Feel free to change none, some, or ALL of this file to fit your needs!
//  */

// io.socket.on("*", function(event){
//   console.log('first : '+event);

  

// });

//io.socket.get("user", function(resData, jwres) {console.log(resData);});
// io.socket.on('connect', function messageReceived(m) {
//   // /console.log(m);

//   io.socket.get('/user');

//   console.log(this.socket);

//   io.socket.on('user', function (tmessage) {

//     console.log(tmessage);
    
//   });

// });

// io.socket.get('/user/subscribe', function (message) {


//   // io.socket.get($scope.url, function (resData) {
//   //           $scope.output = resData;
//   //           $scope.$apply();
//   //         });
//     // Attach a listener which fires every time the server publishes
//     // a message to the firehose, then dispatch messages to simple handlers
//     // io.socket.on('subscribe', function newMessageFromSails(message) {
//     //     console.log('Firehose message: ', message);

//     //     // switch (message.model) {

//     //     //     // Handle messages related to Rooms
//     //     //     case 'room':
//     //     //         processRoomMessage(message);
//     //     //         break;

//     //     //     // Handle messages related to Person(s)
//     //     //     case 'person':
//     //     //         processPersonMessage(message);
//     //     //         break;

//     //     //     default:
//     //     //         break;

//     //     // }
//     // });
// });


// (function (io) {

//   // as soon as this file is loaded, connect automatically, 

//   var socket = io.connect();
//   if (typeof console !== 'undefined') {
//     log('Connecting to Sails.js...');
//   }

//   socket.on('connect', function socketConnected() {

//     console.log("This is from the connect: ", this.socket.sessionid);

//     // Listen for the socket 'message'

//     //socket.on('message', cometMessageReceivedFromServer);
//     socket.on('message', function  (message) {
//       console.log("Hello here's the message: ", message);
//     });
//     // Subscribe to the user model classroom and instance room
//     socket.get('/user/subscribe');

//     ///////////////////////////////////////////////////////////
//     // Here's where you'll want to add any custom logic for
//     // when the browser establishes its socket connection to 
//     // the Sails.js server.
//     ///////////////////////////////////////////////////////////
//     // log(
//     //     'Socket is now connected and globally accessible as `socket`.\n' + 
//     //     'e.g. to send a GET request to Sails, try \n' + 
//     //     '`socket.get("/", function (response) ' +
//     //     '{ console.log(response); })`'
//     // );
//     ///////////////////////////////////////////////////////////

//   });


//   // Expose connected `socket` instance globally so that it's easy
//   // to experiment with from the browser console while prototyping.
//   window.socket = socket;


//   // Simple log function to keep the example simple
//   function log () {
//     if (typeof console !== 'undefined') {
//       console.log.apply(console, arguments);
//     }
//   }
  

// })(

//   // In case you're wrapping socket.io to prevent pollution of the global namespace,
//   // you can replace `window.io` with your own `io` here:
//   window.io

// );

// // This function routes the message based upon the model which issued it
// function cometMessageReceivedFromServer(message) {

//   console.log("Here's the message: ", message);

//   // Okay, I need to route this message to the appropriate place.

//   // This message has to do with the User Model
//   if (message.model === 'user') {
//     var userId = message.id
//     updateUserInDom(userId, message);

//     if(message.verb !== "destroy") {
//       displayFlashActivity(message);  
//     } 
//   }  
// }

// function displayFlashActivity(message) {
//   $('#chatAudio')[0].play();
//   $(".navbar").after("<div class='alert alert-success'>" + message.data.name + message.data.action + "</div>");
//   $(".alert").fadeOut(5000);
// }

// function updateUserInDom(userId, message) {

//   // What page am I on?
//   var page = document.location.pathname;

//   // Strip trailing slash if we've got one
//   page = page.replace(/(\/)$/, '');
  
//   // Route to the appropriate user update handler based on which page you're on
//   switch (page) {

//     // If we're on the User Administration Page (a.k.a. user index)
//     case '/user':

//       // This is a message coming from publishUpdate
//       if (message.verb === 'update') {
//         UserIndexPage.updateUser(userId, message);
//       }

//       // This is a message coming from publishCreate
//       if(message.verb === 'create') {
//         UserIndexPage.addUser(message);
//       }
//       // This is a message coming publishDestroy
//       if(message.verb === 'destroy') {
//         UserIndexPage.destroyUser(userId);
//       }
//       break;
//   }
// }

// /////////////////////////////////////////////////
// // User index page DOM manipulation logic
// // (i.e. backbone-style view)
// /////////////////////////////////////////////////
// var UserIndexPage = {

//   // Update the User, in this case their login status
//   updateUser: function(id, message) {
//     if (message.data.loggedIn) {
//       var $userRow = $('tr[data-id="' + id + '"] td img').first();
//       $userRow.attr('src', "/images/icon-online.png");
//     } else {
//       var $userRow = $('tr[data-id="' + id + '"] td img').first();
//       $userRow.attr('src', "/images/icon-offline.png");
//     }
//   },

//   // Add a user to the list of users in the User Administration Page
//   addUser: function(user) {

//   // obj is going to encompass both the new user data as well as the _csrf info from 
//   // the layout.ejs file
//   var obj = {
//     user: user.data,
//     _csrf: window.overlord.csrf || ''
//   };

//   // Add the template to the bottom of the User Administration Page
//     $( 'tr:last' ).after(
      
//       // This is the path to the templates file
//       JST['assets/linker/templates/addUser.ejs']( obj )
//     );
//   },

//   // Remove the user from the User Administration Page
//   destroyUser: function(id) {
//     $('tr[data-id="' + id + '"]').remove();
//   }
// }