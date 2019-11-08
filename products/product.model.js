const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    productName : {
        type:String, 
        required:true,   
    },
    productQuantity:{
        type:Number,
        default:0,
        
    },
    branch:{
        type:Schema.Types.ObjectId ,ref:'Branch'
    },
    productPrice:{
        type:Number,

    }



},{
    timestamps:true
});


module.exports = mongoose.model('Product', schema);