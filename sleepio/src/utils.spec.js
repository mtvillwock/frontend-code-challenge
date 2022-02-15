import { timeToNumber, numberToTime } from './utils'

describe('timeToNumber', () => {
  it('converts an hour:minute string into a number of minutes', () => {
    expect(timeToNumber('7:30')).toEqual(450);
  })
})

describe('numberToTime', () => {
  it('converts a number of minutes into an hour:minute string', () => {
    expect(numberToTime(450)).toEqual('7:30');
  })
})
