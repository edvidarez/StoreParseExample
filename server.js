const express = require('express');
const { ParseServer } = require('parse-server');
const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const app = express();
const api = new ParseServer({
  databaseURI: process.env.DATABASE_URL || 'mongodb://localhost:27017/dev',
  cloud: './cloud/build/main.js', // Absolute path to your Cloud Code entry point
  appId: process.env.MY_APP_ID || 'myAppId',
  masterKey: process.env.MY_MASTER_KEY || 'myMasterKey', // Keep this key secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
});


app.use('/parse', api);
app.listen(1337, () => {
  // eslint-disable-next-line no-console
  console.log('parse-server-example running on >>', process.env.SERVER_URL || 'http://localhost:1337/parse');
});
