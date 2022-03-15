const express = require('express');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

//defining global middlewares and routes

//below code will run only in development env
if (process.env.NODE_ENV === 'development') {
  console.log('Running in dev Env 😊');
}

//need this middleware to access req.body
app.use(express.json());
//custom middleware to add request time
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//serve html file to the browser
app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/tour', tourRouter);
app.use('/api/v1/users', userRouter);

//listen to a server
module.exports = app;
