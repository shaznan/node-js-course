const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
//define the app file only after the content in the config file is read
const app = require('./app');
const mongoose = require('mongoose');

//Get mongoDB connection string, replace password with password variable
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//Connect to the database , the second object is to get rid of the deprecation warnings
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((connection) => console.log('Connection was successful'))
  .catch((err) => console.log('Connection to the server failed'));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
