
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err , client)=>{
  if(err){
return  console.log('unable to connect db');
  }
  console.log('connected successfully');
  const db=client.db('TodoApp')

  db.collection('Todos').insertOne({
    name : 'suman',
    wife : 'rupa'
  },
    (err , result)=>{
      if(err)
      {
        return console.log('unable to insert',err);
      }

    console.log(JSON.stringify(result.ops,undefined,2));
  });

  client.close();
});
