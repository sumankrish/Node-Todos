var mongoose = require('mongoose');

var User = mongoose.model('User',{
email:{
  type:String,
  require : true,
  trim : true,
  minlength:3
}

});

module.exports={User};
