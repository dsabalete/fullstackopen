import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <strong>give feedback</strong>
            <div>
                <button onClick={() => setGood(good + 1)}>good</button>
                <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
                <button onClick={() => setBad(bad + 1)}>bad</button>
            </div>
            <strong>statistics</strong>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))
