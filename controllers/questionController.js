import Question from '../models/Question.js';
import Answer from '../models/Answer.js';

export async function createQuestion(req, res) {
  const { text, answers } = req.body;

  try {
    const question = await Question.create({ text });

    const createdAnswers = await Promise.all(
      answers.map(answer =>
        Answer.create({
          text: answer.text,
          question_id: question.id,
          is_correct: answer.is_correct || false,
        })
      )
    );

    res.status(201).json({
      message: 'Questão criada com sucesso',
      question,
      answers: createdAnswers,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
