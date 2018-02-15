const moment = require('moment');

// Jan 1st 1970 00:00:10 am

// var date = new Date();
// var month = date.getMonth();

// console.log(month);

const date = moment();
console.log(date.format('MMM Do, YYYY'));
console.log(date.format('hh:mm a'));