const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

//var text='Rupa is my wife';

var data ={
  text: 10
};

var token = jwt.sign(data,'Love');
console.log(token);

var decode = jwt.verify(token,'Love');
console.log(decode);

// var hash = SHA256(text).toString();
//
// console.log(`Text : ${text}`);
// console.log(`Hash : ${hash}`);
