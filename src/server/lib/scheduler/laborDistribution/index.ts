//  calculate a single day's complexity
//  total hours availiable by employees - total required labor hours
// WD {day: 'Sunday', distribution: [1, 2, 3, 4]}
import R from 'ramda'
import { calcComplexity } from '../employee/complexity'

export const calculateDayComplexity = (WD, employees) => {
  const laborHours = WD.distribution.reduce((a, b) => a + b, 0)

  const employeeDays = []
  for (let i = 0; i < employees.length; i++) {
    const day = employees[i].availability.find(workDay => workDay.day === WD.day)
    if (employees[i].totalHours < 40)
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

export const getMostComplexDay = (WD, employees) => {
  const workWeek = []
  for (let i = 0; i < WD.length; i++) {
    const complexity = calculateDayComplexity(WD[i], employees)
    workWeek.push({ complexity, index: i })
  }
  const diff = function (a, b) { return a.complexity - b.complexity }
  return WD[R.sort(diff, workWeek)[0].index]
}

// withoutDay(laborDistribution(array of workday), dayLaborRequirements(workday))

export const withoutDay = (laborDistribution, dayLaborRequirements) => {
  const day = laborDistribution.find(workDay => workDay.day === dayLaborRequirements.day)
  const newLaborDistribution = []
  for (let i = 0; i < laborDistribution.length; i++) {
    // eslint-disable-next-line no-unused-expressions
    laborDistribution[i].day !== day.day ? newLaborDistribution.push(laborDistribution[i]) : null
  }
  return newLaborDistribution
}
