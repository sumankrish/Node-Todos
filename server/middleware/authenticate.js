var {User}=require('./../models/Users');

var authenticate = (req,res,next)=>{
  var token=req.header('x-auth');

//console.log('token :',token);

  User.findByToken(token).then((user)=>{

  if(!user){
  //  console.log('auth not user');
    return Promise.reject();
  }

req.user=user;
req.token=token;
next();

  }).catch((e)=>{

    ////console.log('auth catch');
    res.status(401).send();
  });
};

module.exports={authenticate};
