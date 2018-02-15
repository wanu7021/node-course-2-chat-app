var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('newMessage', (message) => {
  console.log('New Message', message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
  console.log('New Location Message', message);
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server')
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  const messageTextBox = jQuery('[name=message]');
  let submitButton = jQuery('#submit');
  submitButton.disabled = true;
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, () => {
    messageTextBox.val('');
    submitButton.disabled = false;
  });
});

const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled');
  locationButton.text('Sending location...');
  navigator.geolocation.getCurrentPosition( position => {
    locationButton.removeAttr('disabled');
    locationButton.text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, () => {
    locationButton.text('Send location');
    locationButton.removeAttr('disabled');
    alert('Unable to fetch location.');
  });
});