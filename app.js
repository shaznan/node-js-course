const express = require('express');
const fs = require('fs');
const app = express();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const port = 8000;
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//listen to a server
app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
