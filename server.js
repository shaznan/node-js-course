const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
//define the app file only after the content in the config file is read
const app = require('./app');

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

//1) First define a schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    //required the string is to show error message
    required: [true, 'Tour must have a name'],
    unique: true,
  },
  rating: {
    type: String,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have price'],
  },
});

//2) Then define a modal (use first upper case - usual convention)
const Tour = mongoose.model('Tour', tourSchema);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
