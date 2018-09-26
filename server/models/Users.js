const validator = require('validator');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var USerSchema = new mongoose.Schema({
email:{
  type:String,
  require : true,
  trim : true,
  minlength:3,
  unique:true,
  validate:{
    validator:validator.isEmail,
    message:'{VALUE} is not a valid email'
  }
},
password:{
  type:String,
  require:true,
  minlength:6
},
tokens:[{
  access:{
    type:String,
    require:true
  },
  token:{
    type:String,
    require:true
  }
}]

});

USerSchema.methods.toJSON = function(){
  var user =this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id','email']);
};

USerSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

  user.tokens.push({access,token});

  //user.tokens=user.tokens.concat([{access,token}]);

  return user.save().then(()=>{
    return token;
  });
};


var User = mongoose.model('User',USerSchema);
module.exports={User};
