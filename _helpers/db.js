const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true,useFindAndModify :false, useNewUrlParser: true ,useUnifiedTopology: true})
.catch(err=>{
    console.error(err);
})
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Branch:require('../branches/branch.model'),
    Product:require('../products/product.model')
};