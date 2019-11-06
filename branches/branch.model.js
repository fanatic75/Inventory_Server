const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    branchName : {
        type: String,
        unique:true 
    },
    address:{
        type:String
    },
    products:[
        { type:mongoose.Schema.Types.ObjectId,ref:'Products'}
    ],
    users:[
        {type:mongoose.Schema.Types.ObjectId,ref:'User'}
    ]
},{
    timestamps:true
});


module.exports = mongoose.model('Branch', schema);