
//const MongoClient = require('mongodb').MongoClient;

//const ObjectID=require('mongodb').ObjectID;

const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err , client)=>{
  if(err){
return  console.log('unable to connect db');
  }
  console.log('connected successfully');
  const db=client.db('TodoApp')

// db.collection('Todos').deleteMany({text :'one'}).then((result)=>{
//   console.log(result);
// });

// db.collection('Todos').deleteOne({name : 'suman'}).then((result)=>{
//   console.log(result);
// });

db.collection('Todos').findOneAndDelete({completed : 'false'}).then((results)=>{
  console.log(results);
});
});
