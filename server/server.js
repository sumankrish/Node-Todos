const {ObjectID} = require('mongodb');
const _= require('lodash');


var express = require('express');

var bodyParser = require('body-parser');




var{mongoose} = require('./db/mongoose');

var{Todo} = require('./models/todo');

var{User} = require('./models/Users');

var { authenticate}=require('./middleware/authenticate');


var app=express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{

var todo = new Todo({
  text : req.body.text
});

todo.save().then((result)=>{
  console.log(result);
res.send(result);
},(err)=>{

  console.log('unable to save');
  res.status(400).send(err);
});

});

// app.post('/user',(req,res)=>{
//
// var user=new User({
//
// email : req.body.email
//
// });
//
// user.save().then((result)=>{
// res.send(result);
//
// },(err)=>{
//
//   res.status(400).send(err);
// });
//
// });

app.get('/todos',(req,res)=>{
Todo.find().then((todos)=>{
  res.send({todos});
},(err)=>{
  res.status(400).send(err);
});

});


app.get('/todos/:id',(req,res)=>{

var id=req.params.id;

if(!ObjectID.isValid(id)){

 console.log('Id is invalid');
 return res.status(404).send();
}
else{

Todo.findById(id).then((todos)=>{

if(!todos)
{
return  res.status(404).send();
}

res.send({todos});

},(err)=>{

  res.status(400).send();
});

}
});


app.delete('/todos/:id',(req,res)=>{

  var id=req.params.id;

  console.log(id);

if(!ObjectID.isValid(id)){
  console.log('Invalid Id');
  return res.status(404).send();
}

Todo.findByIdAndRemove(id).then((result)=>{
  if(!result){
    console.log('Not found');
    return res.status(404).send();
  }

 res.send(result);

}).catch((e)=>{
  console.log('error occured');
  res.status(400).send();
});

});

app.patch('/todos/:id',(req,res)=>{

var id=req.params.id;

var body=_.pick(req.body,['text','completed']);

if(!ObjectID.isValid(id)){
  return res.status(404).send();
}

if(_.isBoolean(body.completed)&& body.completed){
  console.log('if boolean');
  body.completedAt = new Date().getTime();

}else{
  console.log('else boolean');
  body.completed=false;
  body.completedAt=null;
}

Todo.findByIdAndUpdate(id,{$set : body},{new : true}).then((todo)=>{
  if(!todo){
    return res.status(404).send();
  }
  res.send({todo});
}).catch((e)=>{
  res.status(400).send();
})

});


app.post('/user',(req,res)=>{

var body=_.pick(req.body,['email','password']);

console.log(body);

var user = new User(body);

console.log('server 1');

user.save().then(()=>{
  //res.send(user);
console.log('server 2');

  return user.generateAuthToken();
}).then((token)=>{
  res.header('x-auth',token).send(user);
}).catch((e)=>{
  res.status(400).send(e)
});

});

app.get('/user/me',authenticate,(req,res)=>{

console.log('enter in server');
res.send(req.Users);

});

app.post('/user/login',(req,res)=>{


var body=_.pick(req.body,['email','password']);

User.findByCredentials(body.email,body.password).then((user)=>{

  var tk=user.tokens.token;

  console.log('fffgfgf :',tk);

return user.generateAuthToken().then((token)=>{
  res.header('X-auth',token).send(user);
});
//res.send(user);

}).catch((e)=>{
  res.status(400).send();
});

});


app.listen(port,()=>{
  console.log(`Server is up and running on ${port}`);
});

// var newUser=new User({
//   email : 'suman.logon@gmail.com'
// });
//
// newUser.save().then((res)=>{
//   console.log('Email :',res);
// },(err)=>{
//   console.log('err occcured');
// });
//
// var newTodo = new Todo({
//   text : 'Rupa Loves Suman',
//   completed : true,
// });
//
// newTodo.save().then((doc)=>{
//   console.log('Saving :',doc);
// },(err)=>{
//   console.log('unable to save')
// });


module.exports={app};
