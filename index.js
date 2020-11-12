const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const AuthRoute = require('./app/routes/auth')
const IndexRoute = require('./app/routes/index')

mongoose.connect('mongodb://localhost:27017/netflix-db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection

db.on('error', (err) => {
	console.log(err)
})

db.once('open', () => {
	console.log("Database Connection Etablished")
})

const app = express()

 
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(express.static("public"));

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`)
})

app.use('/',IndexRoute)
app.use('/users',AuthRoute)