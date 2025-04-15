import UserAnswer from '../models/UserAnswer.js';
import Answer from '../models/Answer.js';
import Question from '../models/Question.js';

export async function submitAnswer(req, res) {
  const userId = req.user.id;
  const { question_id, answer_id } = req.body;

  try {
    const answerSelected = await Answer.findOne({
      where: {
        id: answer_id,
        question_id
      }
    });

    if (!answerSelected) {
      return res.status(404).json({ error: 'Resposta não encontrada' });
    }

    const isCorrect = answerSelected.is_correct;

    const userAnswerExists = await UserAnswer.findOne({
      where: { user_id: userId, question_id }
    });

    if (userAnswerExists) {
      await userAnswerExists.update({ answer_id });
    } else {
      await UserAnswer.create({ user_id: userId, question_id, answer_id });
    }

    res.status(200).json({
      message: 'Resposta registrada com sucesso',
      correct: isCorrect
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}


export async function getResults(req, res) {
  const userId = req.user.id;

  try {
    const userAnswers = await UserAnswer.findAll({ where: { user_id: userId } });
    const correctAnswers = userAnswers.filter(answer => answer.answer.is_correct);
    const totalQuestions = userAnswers.length;
    const score = (correctAnswers.length / totalQuestions) * 100;

    res.status(200).json({
      totalQuestions,
      correctAnswers: correctAnswers.length,
      score
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}


export async function getQuestionById(req, res) {
  const questionId = req.params.id;
  try {
    const question = await Question.findByPk(questionId, {
      include: [Answer]
    });
    ( question != null ?
      res.status(200).json(question) :
      res.status(400).json({ message: "Questão não encontrada!" })
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}


export async function getQuestions(req, res) {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
