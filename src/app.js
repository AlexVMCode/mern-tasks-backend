const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { createRoles } = require('./libs/initialSetup')

// Run Express
const app = express();
createRoles();

// settings
app.set('port', process.env.PORT || 4000);


// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1.0', require('./routes/index.routes'));

module.exports = app;