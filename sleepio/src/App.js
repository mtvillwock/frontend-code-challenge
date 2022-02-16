import React from 'react';
import logo from './logo.svg';
import './App.css';
import { timeToNumber, numberToTime } from './utils'
// TODO: fetch this from server or import from separate file
const allHalfHourIntervals = [
  "0:00",
  "0:30",
  "1:00",
  "1:30",
  "2:00",
  "2:30",
  "3:00",
  "3:30",
  "4:00",
  "4:30",
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30"
]
const allNumberofMinutes = allHalfHourIntervals.map(interval => timeToNumber(interval))
let entries = {}
allNumberofMinutes.forEach((num, index) => {
  entries[num] = allHalfHourIntervals[index]
})

const App = () => {
  const [result, setResult] = React.useState(null)
  const [durationInBed, setDurationInBed] = React.useState(null)
  const [durationAsleep, setDurationAsleep] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true)
    setResult(false)

    // Does this need to handle if asleep is less than in bed?
    const result = Math.round((100 * durationAsleep / durationInBed))
    const data = JSON.stringify({ score: result })
    console.log(data)
    // make API call
    const response = await fetch('http://localhost:5000/api/sleep_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: data,
    })

    console.log("Server response: ", response)

    if (response.ok) {
      setResult(result)
    } else if (response.badRequest) {
      setResult('Request failed, please try again')
    }
    setLoading(false)
  }

  // probably can simplify this by making a component that is a SelectWithLabel or similar
  const handleUpdateDurationInBed = e => {
    let number = timeToNumber(e.target.value)
    console.log('in bed: ', number)
    setDurationInBed(number)
  }

  const handleUpdateDurationAsleep = e => {
    let number = timeToNumber(e.target.value)
    console.log('asleep: ', number)
    setDurationAsleep(number)
  }

  return (
    <div className="App" style={{ maxWidth: '300px' }}>
      <h1>Sleep Calculator</h1>
      <form
        style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}
        onSubmit={e => handleSubmit(e)}
      >
        <label>Duration in bed</label>
        <select onChange={e => handleUpdateDurationInBed(e)}>
          {allHalfHourIntervals.map(option => <option key={`in-bed-${option}`} value={option}>{option}</option>)}
        </select>
        <label>Duration asleep</label>
        <select onChange={e => handleUpdateDurationAsleep(e)}>
          {allHalfHourIntervals.map(option => <option key={`asleep-${option}`} value={option}>{option}</option>)}
        </select>
        <input disabled={!durationInBed || !durationAsleep} type="submit" value="Calculate" />
      </form>
      {loading && <div>Loading...</div>}
      {result && <div>Result: {result}</div>}
    </div>
  );
}

export default App;
