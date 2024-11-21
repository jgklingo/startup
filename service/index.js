const express = require('express');
const uuid = require('uuid');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const artistNames = require('./artistNames');
const DB = require('./database');

const authCookieName = 'authToken';
const app = express();

app.endpoints = [
  {
    method: 'POST',
    path: '/api/auth',
    description: 'Register a new user',
    example: `curl -X POST localhost:3000/api/auth -d '{"email":"test@mail.com", "password":"tester", "classCode":"D8VD8"}' -H 'Content-Type: application/json'`,
    response: '{"token": tttttt}',
  },
  {
    method: 'PUT',
    path: '/api/auth',
    description: 'Login existing user',
    example: `curl -X PUT localhost:3000/api/auth -d '{"email":"test@mail.com", "password":"tester", "classCode":"D8VD8"}' -H 'Content-Type: application/json'`,
    response: '{"token": tttttt}',
  },
  {
    method: 'DELETE',
    path: '/api/auth',
    requiresAuth: true,
    description: 'Logout a user',
    example: `curl -X DELETE localhost:3000/api/auth -H 'Authorization: tttttt'`,
    response: '{"msg": "Logged out"}',
  },
  {
    method: 'GET',
    path: '/api/questions/:classCode',
    requiresAuth: true,
    description: 'Get questions for a class',
    example: `curl -X GET localhost:3000/api/questions/D8VD8 -H 'Authorization: tttttt'`,
    response: '{ \
        "uniqueID": "9ca22092-bc47-4f8a-b68e-9020c88e598a", \
        "userName": "Anonymous Giraffe", \
        "text": "What is the mitochondria?", \
        "votes": 0, \
        "timePosted": "2024-11-08T22:00:00.000Z" \
    },',
  },
  {
    method: 'POST',
    path: '/api/questions/:classCode',
    requiresAuth: true,
    description: 'Add a question to a class',
    example: `curl -X POST localhost:3000/api/questions/D8VD8 -d '{userName: "test@test.test", text: "Who are you?"}' -H 'Authorization: tttttt'`,
    response: '{"msg": "Question added"}',
  }
];

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true)

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Register a new user
apiRouter.post('/auth', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);

    res.send({ id: user._id });
  }
});

// Login existing user
apiRouter.put('/auth', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout a user
apiRouter.delete('/auth', (req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).send({ msg: 'Logged out' });
});

// Endpoints beyond this point are secure
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Get questions for a class
secureApiRouter.get('/questions/:classCode', async (req, res) => {
  const classCode = req.params.classCode;
  const document = await DB.getQuestions(classCode);
  const classQuestions = document.questions || [];
  res.send(classQuestions);
});

// Add a question to a class
secureApiRouter.post('/questions/:classCode', async (req, res) => {
  const classCode = req.params.classCode;
  const document = await DB.getQuestions(classCode);
  const classQuestions = document.questions || [];
  if (!artistNames.initialized) {
    await artistNames.init();
  }
  const artistName = await artistNames.getName(req.body.userName);
  classQuestions.push({
    uniqueID: crypto.randomUUID(),
    userName: artistName,
    text: req.body.text,
    votes: 0,
    timePosted: new Date().toISOString()
  });
  await DB.setClassQuestions(classCode, classQuestions);
  res.status(201).send({ msg: 'Question added' });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
