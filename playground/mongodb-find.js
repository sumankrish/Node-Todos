
//const MongoClient = require('mongodb').MongoClient;

//const ObjectID=require('mongodb').ObjectID;

const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err , client)=>{
  if(err){
return  console.log('unable to connect db');
  }
  console.log('connected successfully');
  const db=client.db('TodoApp')

db.collection('Todos').find({
  name : 'suman'
}).toArray().then((docs)=>{
  console.log('Todos');
  console.log(JSON.stringify(docs,undefined,2));
} , (err)=>{
  console.log('unable to find :',err);
});

db.collection('Todos').find({wife : 'rupa'}).count().then((count)=>{
  console.log(`Todos Count : ${count}`);
},(err)=>{
  console.log('nothing found');
});
});
