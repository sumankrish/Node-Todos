const { ObjectID}=require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User}=require('./../server/models/Users');

// Todo.remove({}).then((result)=>{
//   console.log(result);
// });


// Todo.findOneAndRemove({_id : '5ba4647a91daac4718c8f5cc'}).then((result)=>{
//   console.log(result);
// });

Todo.findByIdAndRemove('5ba4647891daac4718c8f5cb').then((result)=>{
  console.log(result);
});
