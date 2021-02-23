import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad, all, avg, positive }) => {
    return (
        <table>
            <tbody>
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral} />
                <Statistic text='bad' value={bad} />
                <Statistic text='all' value={all} />
                <Statistic text='avg' value={avg} />
                <Statistic text='positive' value={`${positive * 100} %`} />
            </tbody>
        </table>
    )
}

const Button = ({ clickHandler, text }) => (
    <button onClick={clickHandler}>{text}</button>
)

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
                <Button clickHandler={handleGood} text='good' />
                <Button clickHandler={handleNeutral} text='neutral' />
                <Button clickHandler={handleBad} text='bad' />
            </div>
            <br />
            <br />
            <h2>statistics</h2>
            {renderStatistics()}
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))
