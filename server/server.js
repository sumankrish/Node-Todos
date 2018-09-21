const {ObjectID} = require('mongodb');

var express = require('express');

var bodyParser = require('body-parser');




var{mongoose} = require('./db/mongoose');

var{Todo} = require('./models/todo');

var{User} = require('./models/Users');


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

app.post('/user',(req,res)=>{

var user=new User({

email : req.body.email

});

user.save().then((result)=>{
res.send(result);

},(err)=>{

  res.status(400).send(err);
});

});

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
