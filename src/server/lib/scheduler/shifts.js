import { isNull } from 'util';
import R from 'ramda'

// shift === { day: 'Sunday', clockIn: 3, clockOut: 5 }
// employee === { id: string, avialibility:[{day: Sunday, hours: [0,1,1, 1, 1, 1, 1, 0, 1] }, .... ,{day: Saturday}] }
const isAvailible = (shift, employee) => {
  const isFree = currentValue => currentValue === 1
  return employee.availiability.find(day => day.day === shift.day).hours.slice((shift.clockIn + 1), (shift.clockOut)).every(isFree)
}

const getAvailibleEmployees = (shift, employees) => {
  const availiableEmployees = []
  for (let i = 0; i < employees.length; i++) {
    // eslint-disable-next-line no-unused-expressions
    isAvailible(shift, employees[i]) === true ? availiableEmployees.push(employees[i]) : false
  }
  return availiableEmployees
}

const getMostComplexShift = (shifts, employees) => {
  const pool = []
  for (let i = 0; i < shifts.length; i++) {
    const poolsize = getAvailibleEmployees(shifts[i], employees).length
    const shift = shifts[i]
    pool.push({ poolsize, shift })
  }
  const diff = function (a, b) { return a.poolsize - b.poolsize }
  return R.sort(diff, pool)[0].shift
}
