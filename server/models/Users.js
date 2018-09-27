const validator = require('validator');
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt=require('bcryptjs');

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

  console.log('inside gene');
  var user = this;
  var access = 'auth';
  var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();

console.log('user 1');

  user.tokens.push({access,token});

  //user.tokens=user.tokens.concat([{access,token}]);

console.log('user 2');

  return user.save().then(()=>{

    console.log(token);
    return token;
  });
};


USerSchema.statics.findByToken = function(token){

var Users=this;
var decoded;

try{
  decoded = jwt.verify(token,'abc123');
  console.log('decoded :',decoded);

  console.log('return:',decoded._id);
  console.log('return to :' ,token);
}catch(e){
  return Promise.reject();
}

return Users.findOne({
  '_id' : decoded._id,
  'tokens.token':token,
  'tokens.access':'auth'
});

};

USerSchema.pre('save',function(next){

  console.log('pre 1');
var user=this;
if(user.isModified('password')){

  console.log('pre 2');

bcrypt.genSalt(10,(err,salt)=>{

  console.log('pre 3',salt);

bcrypt.hash(user.password,salt,(err,hash)=>{
  user.password=hash;
  console.log(hash);
  next();
});

});

}else{
  next();
}

});

USerSchema.statics.findByCredentials=function (email,password){

var User=this;

return User.findOne({email}).then((user)=>{

  console.log(user);
  if(!user){
    return Promise.reject();
  }

return new Promise((resolve,reject)=>{
  bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
      resolve(user);
    }else{
      reject();
    };
  });
});

});

};





var User = mongoose.model('User',USerSchema);
module.exports={User};
