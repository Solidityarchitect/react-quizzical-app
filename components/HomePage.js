export default function HomePage({ startQuiz }) {
    return(
        <div className="HomePage">
            <h1 className="HomePage--title">Quizzical</h1>
            <h2 className="HomePage--text">Some description if needed</h2>
            <img src="../images/block1.png" className="HomePage--block1" />
            <img src="../images/block2.png" className="HomePage--block2" />
            <button className="HomePage--button" onClick={startQuiz}>Start quiz</button>
        </div>
    )
}