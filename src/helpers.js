const shuffleArray = arr => arr
    .map(element => ({
        sort: Math.random(),
        value: element
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(element => element.value);

export const shuffleAnswers = question => {
    return shuffleArray([question.correctAnswer, ...question.incorrectAnswers]);
}

export const normalizeQuestions = backendQuestions => {
    return backendQuestions.map(data => ({
        correctAnswer: decodeURIComponent(data.correct_answer),
        question: decodeURIComponent(data.question),
        incorrectAnswers: data.incorrect_answers.map(elem => decodeURIComponent(elem))
    }))
}