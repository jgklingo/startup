const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });
const db = client.db('openquestion');
const questionsCollection = db.collection('questions');
const userCollection = db.collection('user');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password, artistName) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    artistName: artistName
  };
  await userCollection.insertOne(user);

  return user;
}

async function getQuestions(classCode) {
  return questionsCollection.findOne({ classCode: classCode });
}

async function setClassQuestions(classCode, questions) {
  await questionsCollection.updateOne(
    { classCode: classCode },
    { $set: { questions: questions } },
    { upsert: true }
  );
}

async function updateVote(classCode, uniqueID, votes) {
  await questionsCollection.updateOne(
    { classCode: classCode, 'questions.uniqueID': uniqueID },
    { $set: { 'questions.$.votes': votes } }
  );
}

async function getAllArtistNames() {
  const artistNames = await userCollection.distinct('artistName');
  return artistNames;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getQuestions,
  setClassQuestions,
  updateVote,
  getAllArtistNames
};
