const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true,trim:true },
    hash: { type: String, required: true },
    tokenHash:{type:String,required:true},
    firstName: { type: String ,trim:true},
    lastName: { type: String,trim:true},
    role:{type: String, required:true, default:'User',trim:true},
    branch:{type:Schema.Types.ObjectId ,required:true,ref:'Branch',trim:true}
},{
    timestamps:true
});


module.exports = mongoose.model('User', schema);