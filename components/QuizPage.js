// QuizPage.js
import React, { useState, useEffect } from "react"

export default function QuizPage({ allQuiz, onPlayAgain }) {
    const [answers, setAnswers] = useState(allQuiz.map(() => null));
    const [correctAnswers, setCorrectAnswers] = useState(allQuiz.map(quiz => quiz.correct_answer));
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        setAnswers(allQuiz.map(() => null));
        setCorrectAnswers(allQuiz.map(quiz => quiz.correct_answer));
    }, [allQuiz]);

    function selectAnswer(questionIndex, option) {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = option;
            return newAnswers;
        });
    }

    function checkAnswers() {
        const score = answers.reduce((total, answer, index) => {
            if (answer === correctAnswers[index]) {
                return total + 1;
            }
            return total;
        }, 0);
        setScore(score);
        setShowResults(true);
    }

    if (!allQuiz || allQuiz.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="QuizPage">
            <img src="../images/block1.png" className="QuizPage--block1" />
            <img src="../images/block2.png" className="QuizPage--block2" />
            {allQuiz.map((quizItem, index) => (
                <div key={index} className="question-container">
                    <h3>{quizItem.question}</h3>
                    {quizItem.incorrect_answers.concat(quizItem.correct_answer).sort().map(option => (
                        <button
                            key={option}
                            className={`option-button ${answers[index] === option ? "selected" : ""} ${showResults && option === correctAnswers[index] ? "correct" : ""} ${showResults && answers[index] === option && answers[index] !== correctAnswers[index] ? "incorrect" : ""}`}
                            onClick={() => selectAnswer(index, option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ))}
    {showResults ? (
        <div className="results-container">
            <p>You scored {score}/{allQuiz.length} correct answers</p>
            <button onClick={onPlayAgain}>Play again</button>
        </div>
    ) : (
        <button className="check-answers-button" onClick={checkAnswers}>Check answers</button>
    )}
        </div>
    );
}