const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
//define the app file only after the content in the config file is read
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../Modals/tourModals');

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

//Reading file from document
//need dirname because other wise (../../) will start from rootdirectory not current directory
const tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

//import Data
const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log('import success');
  } catch (err) {
    console.log(err);
  }
  //to automaticall stop the server after execution or it will keep running
  process.exit();
};

//delete data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted data');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//process.argv can be used to run commands in the command line
//In this case I ran => node dev-data/data/import-dev-data.js --import
//check the console, the import thing comes as the 3rd index value of the process.argv output
console.log(process.argv);

if (process.argv[2] === '--import') {
  importData();
  console.log('import hit');
} else if (process.argv[2] === '--delete') {
  deleteData();
  console.log('delete hit');
}
