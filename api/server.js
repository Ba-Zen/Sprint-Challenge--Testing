const express = require('express');
const server = express();
server.use(express.json());

const db = require('../data/dbConfig.js');

//const namesRouter = require('../names/namesRouter.js');

//server.use('/api/names', namesRouter);

server.get('/', (req, res) => {
  res.status(200).json({ api: 'we are up and running' });
});

server.get('/games', async (req, res) => {
  const games = await db('games');

  try {
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post('/games', async (req, res) => {
  const game = req.body;
  try {
    const result = await db.insert(game).into('games');
    res.status(201).json(result);
  } catch (err) {
    res.status(422).json(err);
  }
});

module.exports = server;
