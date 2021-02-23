import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad, all, avg, positive }) => {
    return (
        <div>
            good {good}
            <br />
            neutral {neutral}
            <br />
            bad {bad}
            <br />
            all {all}
            <br />
            average {avg}
            <br />
            positive {positive * 100} %
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [avg, setAvg] = useState(0)
    const [positive, setPositive] = useState(0)

    const handleGood = () => {
        setGood(good + 1)
        setAll(all + 1)
        setAvg((good + 1 - bad) / (all + 1))
        const pos = (good + 1) / (all + 1)
        setPositive(pos)
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
        setAvg((good - bad) / (all + 1))
        const pos = good / (all + 1)
        setPositive(pos)
    }
    const handleBad = () => {
        setBad(bad + 1)
        setAll(all + 1)
        setAvg((good - bad - 1) / (all + 1))
        const pos = good / (all + 1)
        setPositive(pos)
    }

    const renderStatistics = () => {
        if (all) {
            return (
                <Statistics
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    all={all}
                    avg={avg}
                    positive={positive}
                />
            )
        } else {
            return 'No feedback given'
        }
    }
    return (
        <div>
            <h2>give feedback</h2>
            <div>
                <button onClick={handleGood}>good</button>
                <button onClick={handleNeutral}>neutral</button>
                <button onClick={handleBad}>bad</button>
            </div>
            <br />
            <br />
            <h2>statistics</h2>
            {renderStatistics()}
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))
