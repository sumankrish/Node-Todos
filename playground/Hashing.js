const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');


var pass = 'i love you';

// bcrypt.genSalt(10,(err,salt)=>{
//   bcrypt.hash(pass,salt,(err,hash)=>{
//     console.log(hash);
//   })
// })

var hpass = '$2a$10$qKTpktsjQl5oUBnlgXfPXugX/1tvGh/SmgluA1VcNbrYNS0afZNs2';

bcrypt.compare(pass,hpass,(err,result)=>{
  console.log(result);
});
//var text='Rupa is my wife';
//
// var data ={
//   text: 10
// };
//
// var token = jwt.sign(data,'Love');
// console.log(token);
//
// var decode = jwt.verify(token,'Love');
// console.log(decode);

// var hash = SHA256(text).toString();
//
// console.log(`Text : ${text}`);
// console.log(`Hash : ${hash}`);
