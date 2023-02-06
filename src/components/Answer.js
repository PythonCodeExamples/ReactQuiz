const Answer = ({children, index, correctAnswer, currentAnswer, onSelectAnswer}) => {
    const letterMapping = ["A", "B", "C", "D"]

    const isCorrectAnswer = currentAnswer && children === correctAnswer;
    const isWrongAnswer = currentAnswer === children && currentAnswer !== correctAnswer;

    const correctAnswerClass = isCorrectAnswer ? "correct-answer " : "";
    const wrongAnswerClass = isWrongAnswer ? "wrong-answer " : "";
    const disabledClass = currentAnswer ? "disabled-answer " : "";

    return (
        <div
            className={`answer ${correctAnswerClass + wrongAnswerClass + disabledClass}`}
            onClick={() => onSelectAnswer(children)}
        >
            <div className="answer-letter">{letterMapping[index]}</div>
            <div className="answer-text">{children}</div>
        </div>
    );
}

export default Answer;