const express = require('express');
const uuid = require('uuid');

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
    response: 'TBD',
  },
  {
    method: 'POST',
    path: '/api/questions/:classCode',
    requiresAuth: true,
    description: 'Add a question to a class',
    example: `TBD`,
    response: 'TBD',
  }
];

app.use(express.static('public'));
app.use(express.json());

let users = {};
let questions = {};

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Register a new user
apiRouter.post('/auth', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[user.email] = user;

    res.send({ token: user.token });
  }
});

// Login existing user
apiRouter.post('/auth', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// Logout a user
apiRouter.delete('/auth', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).send({ msg: 'Logged out' });
});

// Get questions for a class
apiRouter.get('/questions/:classCode', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.headers.authorization);
  if (true) {  // TODO: Change to `user` when authentication is enabled
    const classCode = req.params.classCode;
    const classQuestions = questions[classCode] || [];
    res.send(classQuestions);
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Add a question to a class
apiRouter.post('/questions/:classCode', (req, res) => {
  const user = Object.values(users).find((u) => u.token === req.headers.authorization);
  if (true) {  // TODO: Change to `user` when authentication is enabled
    const classCode = req.params.classCode;
    const classQuestions = questions[classCode] || [];
    classQuestions.push(req.body);
    questions[classCode] = classQuestions;
    res.status(201).end();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
