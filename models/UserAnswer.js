import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Question from './Question.js';
import Answer from './Answer.js';

const UserAnswer = sequelize.define('UserAnswer', {});

User.belongsToMany(Question, { through: UserAnswer, foreignKey: 'user_id' });
Question.belongsToMany(User, { through: UserAnswer, foreignKey: 'question_id' });

UserAnswer.belongsTo(User, { foreignKey: 'user_id' });
UserAnswer.belongsTo(Question, { foreignKey: 'question_id' });
UserAnswer.belongsTo(Answer, { foreignKey: 'answer_id' });

export default UserAnswer;
