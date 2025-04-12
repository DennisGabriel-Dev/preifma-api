import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Question from './Question.js';

const Answer = sequelize.define('Answer', {
  text: DataTypes.STRING,
  is_correct: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

Question.hasMany(Answer, { foreignKey: 'question_id' });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

export default Answer;
