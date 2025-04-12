import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  console.log('DB conectado');
});

export default app;
