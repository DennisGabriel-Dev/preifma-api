import UserAnswer from '../models/UserAnswer.js';
import Answer from '../models/Answer.js';

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
