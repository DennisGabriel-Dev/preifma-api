import request from 'supertest';
import app from '../index.js';
import dotenv from 'dotenv';
dotenv.config({path: '.env.test'});
import sequelize from '../config/database.js';
import User from '../models/User.js';

var token;
var userId;
var questionId;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('🔥 Initial Tests', () => {
  it('create an user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Test', email: 'test@example.com', password: '123456' });

    const user = await User.findByPk(1);
    await user.update({isAdmin: true});

    expect(res.status).toBe(201);
    userId = res.body.id;
  });

  it('should be able to login and receive a token', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('should be able to create a question', async () => {
    const res = await request(app)
      .post('/api/questions/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        text: 'Qual é a capital da França?',
        answers: [
          { text: 'Paris', is_correct: true },
          { text: 'Londres', is_correct: false },
          { text: 'Roma', is_correct: false }
        ]
      });

    expect(res.status).toBe(201);
    expect(res.body.question.id).toBeDefined();
    questionId = res.body.question.id;
  });

  it('should be able to submit a correct answer', async () => {
    const res = await request(app)
      .post(`/api/simulate/answer`)
      .set('Authorization', `Bearer ${token}`)
      .send({ answer_id: 1, question_id: questionId });

    expect(res.status).toBe(200);
    expect(res.body.correct).toBe(true);
  });
});
