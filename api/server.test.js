const supertest = require('supertest');
const db = require('../data/dbConfig.js');
const server = require('./server');

beforeEach(async () => {
  await db('games').truncate();
});

afterEach(async () => {
  await db('games').truncate();
});

describe('server.js', () => {
  describe('GET /games', () => {
    it('responds with 200 OK', async () => {
      let res = await supertest(server).get('/games');
      expect(res.status).toBe(200);
    });

    it('should respond with an empty array', async () => {
      let expected = [];
      res = await supertest(server).get('/games');

      expect(res.body).toEqual(expected);
    });
    it('should respond with an array of games', async () => {
      let expected = [
        {
          id: 1,
          title: 'NBA 2K19',
          genre: 'Sports',
          releaseYear: '2018'
        },
        {
          id: 2,
          title: 'Madden 2019',
          genre: 'Sports',
          releaseYear: '2018'
        }
      ];
      let res = await supertest(server)
        .post('/games')
        .send({
          title: 'NBA 2K19',
          genre: 'Sports',
          releaseYear: '2018'
        });

      res = await supertest(server)
        .post('/games')
        .send({
          title: 'Madden 2019',
          genre: 'Sports',
          releaseYear: '2018'
        });

      res = await supertest(server).get('/games');

      expect(res.body).toEqual(expected);
    });
  });

  describe('POST /games', () => {
    it('should respond with 201 created', async () => {
      let game = {
        title: 'Madden 2019',
        genre: 'Sports',
        releaseYear: '2018'
      };

      let res = await supertest(server)
        .post('/games')
        .send(game);

      expect(res.status).toBe(201);
    });

    it('should respond with the id of game', async () => {
      let game = {
        title: 'Madden 2019',
        genre: 'Sports',
        releaseYear: '2018'
      };

      let res = await supertest(server)
        .post('/games')
        .send(game);

      expect(res.body).toEqual([1]);
    });

    it('should respond with 422 with missing field', async () => {
      let game = {
        genre: 'Sports',
        releaseYear: '2018'
      };

      let res = await supertest(server)
        .post('/games')
        .send(game);

      expect(res.status).toBe(422);
    });
  });
});
