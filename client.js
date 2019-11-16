/* eslint-disable no-console */
const Parse = require('parse/node');

Parse.initialize(process.env.MY_APP_ID || 'myAppId');
Parse.serverURL = process.env.SERVER_URL || 'http://localhost:1337/parse';

async function createGameScoreFromCloud() {
  const response = await Parse.Cloud.run('createGameScores');
  console.log(response);
}
async function createGameScoreFromClient() {
  const GameScore = Parse.Object.extend('GameScore');
  const score = new GameScore();
  score.set('score', 200000);
  await score.save();
  console.log('score', score.get('score'));
}
createGameScoreFromClient();
createGameScoreFromCloud();
