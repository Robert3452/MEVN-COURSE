const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/mevn-database", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/tasks', require('./routes/tasks'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//server is listening
app.listen(app.get('port'), () => {
    console.log(`Server on port `, app.get('port'));
});