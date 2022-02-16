import React from 'react'
import { timeToNumber } from './utils'
import halfHourIntervals from './halfHourIntervals'
import DropdownWithLabel from './DropdownWithLabel';

const Form = () => {
  const [result, setResult] = React.useState(null)
  const [durationInBed, setDurationInBed] = React.useState(null)
  const [durationAsleep, setDurationAsleep] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true)
    setResult(false)

    // TODO: Does this need to handle if asleep is less than in bed?
    const result = 100 * durationAsleep / durationInBed
    const data = JSON.stringify({ score: result })

    const response = await fetch('http://localhost:5000/api/sleep_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: data,
    })

    if (response.ok) {
      setResult(result)
    } else if (!response.ok) {
      setResult('Request failed, please try again')
    }
    setLoading(false)
  }

  const handleUpdateDurationInBed = e => {
    let number = timeToNumber(e.target.value)
    setDurationInBed(number)
  }

  const handleUpdateDurationAsleep = e => {
    let number = timeToNumber(e.target.value)
    setDurationAsleep(number)
  }

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', alignContent: 'space-between' }}
      onSubmit={e => handleSubmit(e)}
    >
      <DropdownWithLabel
        labelText={'Duration in bed'}
        onChange={e => handleUpdateDurationInBed(e)}
        options={halfHourIntervals}
      />
      <DropdownWithLabel
        labelText={'Duration asleep'}
        onChange={e => handleUpdateDurationAsleep(e)}
        options={halfHourIntervals}
      />
      <input disabled={!durationInBed || !durationAsleep} type="submit" value="Calculate" />
      {loading && <div>Loading...</div>}
      {result && <div>Result: {result}</div>}
    </form>
  );
}

export default Form;
