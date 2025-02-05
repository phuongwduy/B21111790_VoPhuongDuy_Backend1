const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error.js');
const contactRouter = require('./app/routers/contact.router.js');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application' });
});
app.use('/api/contacts', contactRouter);

app.use((req, res, next) => {
   return next(new ApiError(404, 'Resourse not found'));
});

app.use((err, req, res, next) => {
   return res.status(err.statusCode || 500).json({ message: err.message || 'Internal server error' });
});


module.exports = app;