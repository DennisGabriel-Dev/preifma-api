import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import routes from './routes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/users', routes.userRoutes);
app.use('/api/simulate', routes.simulateRoutes);
app.use('/api/questions', routes.questionRoutes);


sequelize.sync().then(() => {
  console.log('DB conectado');
});

export default app;
