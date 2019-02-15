//  calculate a single day's complexity
//  total hours availiable by employees - total required labor hours
// WD {day: 'Sunday', distribution: [1, 2, 3, 4]}
import R from 'ramda'
import { calcComplexity } from '../employee/complexity'
import { IEmployee } from '../interfaces/employee'
import { ILaborDistribution } from '../interfaces/laborDistribution'
import { IScheduledShift } from '../interfaces/schedule'

export const calculateDayComplexity = (
  WD: ILaborDistribution,
  employees: ReadonlyArray<IEmployee>,
) => {
  const laborHours = WD.distribution.reduce((a: number, b: number) => a + b, 0)

  const employeeDays = []
  for (let i = 0; i < employees.length; i++) {
    const day = employees[i].availability.find(workDay => workDay.day === WD.day)
    if (employees[i].totalHours < 40 && day)
      employeeDays.push(day)
  }
  const employeeHours = calcComplexity(employeeDays)

  return employeeHours - laborHours

}

export const withoutDay = (
  laborDistribution: ReadonlyArray<ILaborDistribution>,
  dayLaborRequirements: ILaborDistribution,
) => {
  const day = laborDistribution.find(workDay => workDay.day === dayLaborRequirements.day)
  const newLaborDistribution = []
  for (let i = 0; i < laborDistribution.length; i++) {
    // eslint-disable-next-line no-unused-expressions
    if (day) {
      laborDistribution[i].day !== day.day ? newLaborDistribution.push(laborDistribution[i]) : null
    }
  }
  return newLaborDistribution
}

export const getMostComplexDay = (
  WD: ReadonlyArray<ILaborDistribution>,
  employees: ReadonlyArray<IEmployee>,
) => {
  const workWeek = []
  for (let i = 0; i < WD.length; i++) {
    const complexity = calculateDayComplexity(WD[i], employees)
    workWeek.push({ complexity, index: i })
  }
  const diff = function (a: { complexity: number }, b: { complexity: number }) { return a.complexity - b.complexity }
  return WD[R.sort(diff, workWeek)[0].index]
}
