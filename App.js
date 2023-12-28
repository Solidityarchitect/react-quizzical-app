import React, { useState } from "react"
import HomePage from "../components/HomePage"
import QuizPage from "../components/QuizPage"

export default function App() {
    const [quizStarted, setQuizStarted] = useState(false)
    const [allQuiz, setAllQuiz] = useState([])

    function startQuiz() {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json())
            .then(data => {
                setAllQuiz(data.results) // 根据API的返回格式设置问题
                setQuizStarted(true) // 开始答题
            })
    }

    function handlePlayAgain() {
        setQuizStarted(false); // 重置答题开始状态
        startQuiz(); // 再次获取问题
    }

    return (
        <div>
            {quizStarted ?
                <QuizPage allQuiz={allQuiz} onPlayAgain={handlePlayAgain} /> :
                <HomePage startQuiz={startQuiz} />
            }
        </div>
    )
}