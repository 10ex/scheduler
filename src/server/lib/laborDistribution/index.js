//  calculate a single day's complexity
//  total hours availiable by employees - total required labor hours
// WD {day: 'Sunday', distribution: [1, 2, 3, 4]}
import R from 'ramda'
import { calcComplexity } from '../employee/complexity'

export const calculateDayComplexity = (WD, employees) => {
  const laborHours = WD.distribution.reduce((a, b) => a + b, 0)

  const employeeDays = []
  for (let i = 0; i < employees.length; i++) {
    const day = employees[i].availibility.find(workDay => workDay.day === WD.day)
    employeeDays.push(day)
  }
  const employeeHours = calcComplexity(employeeDays)

  return employeeHours - laborHours
  /**
        *  let employeeDays = []
        *   LOOP through employees as e:
        *       let day = e.availibility.find(day => day.day === WD.day)
        *        emploeeDays.push(day)
        *  const employyeHours = calcComplexity(employeeDays)
        */
}

// returns the most complex day

export const mostComplexDay = (WD, employees) => {
  const workWeek = []
  for (let i = 0; i < WD.length; i++) {
    const complexity = calculateDayComplexity(WD[i], employees)
    workWeek.push(complexity)
  }
  const diff = function (a, b) { return a - b }
  return R.sort(diff, workWeek)[0]
}

// withoutDay(laborDistribution(array of workday), dayLaborRequirements(workday))

export const withoutDay = (laborDistribution, dayLaborRequirements) => {
  const day = laborDistribution.find(workDay => workDay.day === dayLaborRequirements.day)
  const newLaborDistribution = []
  for (let i = 0; i < laborDistribution.length; i++) {
    // eslint-disable-next-line no-unused-expressions
    laborDistribution[i].day !== day ? newLaborDistribution.push(laborDistribution[i]) : null
  }
  return newLaborDistribution
}
