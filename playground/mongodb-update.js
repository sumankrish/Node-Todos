
//const MongoClient = require('mongodb').MongoClient;

//const ObjectID=require('mongodb').ObjectID;

const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err , client)=>{
  if(err){
return  console.log('unable to connect db');
  }
  console.log('connected successfully');
  const db=client.db('TodoApp')

// db.collection('Todos').findOneAndUpdate({
//   _id : new ObjectID('5ba146b0e0d23d28187dcdfc')
// },{
//   $set:{
//     wife : 'Dear Rupa'
//   }
// },{
//   returnOriginal:false
// }).then((result)=>{
//   console.log(result);
// });

db.collection('Todos').findOneAndUpdate({
  _id : new ObjectID('5ba1361e3b42833a387edd01')
},{
  $set:{
    text : 'Dear Rupa'
  },
  $inc:{
    age:1
  }
},{
  returnOriginal:false
}).then((result)=>{
  console.log(result);
});
});
