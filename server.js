const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
//define the app file only after the content in the config file is read
const app = require('./app');

console.log(process.env.NODE_ENV);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on ${port} `);
});
