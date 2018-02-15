var socket = io();

socket.on('connect', () => {
  const params = jQuery.deparam(window.location.search);
  socket.emit('join', params, (err) => {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
});

function scrollToBottom() {
  // Selector
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child')
  // Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();
  const expectedHeight = clientHeight + scrollTop + newMessageHeight + lastMessageHeight;
  if (expectedHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('newMessage', (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  }); 
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('disconnect', () => {
  console.log('Disconnected from server')
});

socket.on('updateUserList', users => {
  var ol = jQuery('<ol></ol>');

  users.forEach( user => {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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