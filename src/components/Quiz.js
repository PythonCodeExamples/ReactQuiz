import Question from "./Quiestion";
import { useContext, useEffect } from "react";
import { QuizContext } from "../contexts/quiz";

const Quiz = () => {
    const [state, dispatch] = useContext(QuizContext);

    const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";

    useEffect(() => {
        if (state.questions.length === 0)
            fetch(apiUrl)
                .then(res => res.json())
                .then(data => dispatch({type: "LOADED_QUESTIONS", payload: data.results}));
    });

    return (
    <div className="quiz">
        {
            state.showResults && (
                <div className="results">
                    <div className="congratulations">Congratulations</div>
                    <div className="results-info">
                        <div>You have completed the quiz!</div>
                        <div>You've got {state.correctAnswersCounter} of {state.questions.length} questions</div>
                        <div
                            className="next-button"
                            onClick={() => dispatch({type: "RESTART"})}
                        >
                            Restart
                        </div>
                    </div>
                </div>
            )
        }
        {
            !state.showResults && state.questions.length > 0 && (
            <>
                <div className="score">
                    Question {state.currentQuestion + 1}/{state.questions.length}
                </div>
                <Question/> 
                <div
                    className="next-button"
                    onClick={() => dispatch({type: "NEXT_QUESTION"})}
                >
                    Next question
                </div>
            </>
            )
        }
    </div>
    );
}

export default Quiz;