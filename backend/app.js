require('./config/config');  // exporting confidential file 
// require('./config/passportConfig');
require('./models/db'); // database


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const passport = require('passport');
const rtsIndex = require('./routes/index.router');

var app = express();     


//------- configure middleware----------
app.use(bodyParser.json()); 
app.use(cors()); 
// app.use(passport.initialize());
app.use('/api', rtsIndex);


//----error handler----------
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message)); // iterateing  all error
        res.status(422).send(valErrors)
    }
});


//-----starting the server--------
app.listen(process.env.PORT, () => console.log(`Server started at port Number : ${process.env.PORT}`));