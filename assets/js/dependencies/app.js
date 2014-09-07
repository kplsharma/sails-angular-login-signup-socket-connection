var socket = io.socket;

socket.get('/user/subscribe', function ( response ) {
    console.log("con", response);
});

socket.on('message', function (msg) {
        console.log('we have somthing : ', msg);
      //console.log('Received new message from Sails about group #', msg.id);
      //console.log('Here\'s what happened:',msg.verb);
      //console.log('Here\'s the relevant data:', msg.data);
});
