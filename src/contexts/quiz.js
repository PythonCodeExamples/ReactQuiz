import { createContext, useReducer } from "react";
import { normalizeQuestions, shuffleAnswers } from "../helpers";

const initialState = {
    questions: [],
    currentQuestion: 0,
    showResults: false,
    answers: [],
    currentAnswer: "",
    correctAnswersCounter: 0
};

const reducer = (state, action) => {
    switch (action.type) {
        case "NEXT_QUESTION":
            const showResults = state.currentQuestion === state.questions.length - 1;
            const currentQuestion = showResults ? state.currentQuestion : state.currentQuestion + 1;
            return {
                ...state,
                currentQuestion,
                showResults,
                answers: showResults ? [] : shuffleAnswers(state.questions[currentQuestion]),
                currentAnswer: ""
            };

        case "RESTART":
            return initialState;

        case "SELECT_ANSWER":
            const isCorrectAnswer = action.payload === state.questions[state.currentQuestion].correctAnswer;
            return {
                ...state,
                currentAnswer: action.payload,
                correctAnswersCounter: isCorrectAnswer ? state.correctAnswersCounter + 1 : state.correctAnswersCounter
            };

        case "LOADED_QUESTIONS":
            const normalizedQuestions = normalizeQuestions(action.payload);
            console.log(normalizedQuestions)
            return {
                ...state,
                questions: normalizedQuestions,
                answers: shuffleAnswers(normalizedQuestions[0])
            }

        default:
            return state;
    }
};

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(reducer, initialState);
    return (
        <QuizContext.Provider
            value={value}
        >
            {children}
        </QuizContext.Provider>
    );
}