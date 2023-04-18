const {Schema, model}=require('mongoose');


const FeedSchema= Schema({
   
    created_at:  Date ,
    entry_id: Number,
    field1: String,
    field2: String,

});

module.exports= model('Feed',FeedSchema)