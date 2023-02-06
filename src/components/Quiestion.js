import { useContext } from "react";
import { QuizContext } from "../contexts/quiz";
import Answer from "./Answer";

const Question = () => {
    const [state, dispatch] = useContext(QuizContext);
    const currentQuestion = state.questions[state.currentQuestion];
    return (
    <>
        <div className="question">
            {currentQuestion.question}
        </div>
        <div className="answers">
            {state.answers.map((answer, index) =>
                <Answer 
                    key={answer}
                    index={index}
                    correctAnswer={currentQuestion.correctAnswer}
                    currentAnswer={state.currentAnswer}
                    onSelectAnswer={(answerText) => dispatch({type: "SELECT_ANSWER", payload: answerText})}
                >
                    {answer}
                </Answer>)}
        </div>
    </>
    );
}

export default Question;