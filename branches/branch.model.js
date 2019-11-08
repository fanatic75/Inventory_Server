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
        { type:mongoose.Schema.Types.ObjectId,ref:'Product'}
    ],
    users:[
        {type:mongoose.Schema.Types.ObjectId,ref:'User'}
    ]
},{
    timestamps:true
});
schema.pre('remove',function(next){
    
     this.model('User').deleteMany({branch:this._id},next);
     this.model('Product').deleteMany({branch:this._id},next);
     
});

module.exports = mongoose.model('Branch', schema);