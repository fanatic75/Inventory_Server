require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
const rateLimit=require('express-rate-limit');

const limiter = rateLimit({
    windowMs:5*60*1000,
    max:100
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());




// use JWT auth to secure the api
app.use(jwt());


app.use(limiter);


// api routes
app.use('/users', require('./users/users.controller'));

app.use('/branches',require('./branches/branch.controller'));


app.use('/products',require('./products/product.controller'));
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
 app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
