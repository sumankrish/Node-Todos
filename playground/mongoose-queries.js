const { ObjectID}=require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User}=require('./../server/models/Users');

var ids= '5ba3bbca68ff3a2ca86e0037';
var id='5ba3bbca68ff3a2ca86e0038';
var eid='5ba2aa16c14ce03f687055b6';

if(!ObjectID.isValid(id)){
  console.log('ID is invalid');
}

Todo.find({
  _id:id
}).then((todos)=>{
  console.log('Todos :',todos);
});

Todo.findOne({
  _id : ids
}).then((todo)=>{
  console.log('Todo :',todo);
});

Todo.findById(id).then((result)=>{
  if(!result){
    console.log('Incorrect Id');
  }
  console.log('Result :',result);
}).catch((e)=>console.log(e));

User.findById(eid).then((email)=>{
  console.log('Email :',email);
}).catch((e)=>console.log(e));
