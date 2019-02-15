import R from 'ramda'
import { getUpdatedEmployeeList } from './employee/update'
import { IEmployee } from './interfaces/employee'
import { ILaborDistribution } from './interfaces/laborDistribution'
import { IScheduledShift } from './interfaces/schedule'
import { getMostComplexDay, withoutDay } from './laborDistribution'
import { scheduleDay } from './scheduleDay'
import { generateShifts } from './shifts'

const createSchedule = (
  laborDistributions: ReadonlyArray<ILaborDistribution>,
  employees: ReadonlyArray<IEmployee>,
  schedule: ReadonlyArray<ReadonlyArray<IScheduledShift>> = [],
): ReadonlyArray<ReadonlyArray<IScheduledShift>> => {
  const laborRequirements = getMostComplexDay(laborDistributions, employees)
  const workDay = scheduleDay(generateShifts(laborRequirements), employees)
  const updatedSchedule = R.append(workDay, schedule)
  return laborDistributions.length > 1
    ? createSchedule(
      withoutDay(laborDistributions, laborRequirements),
      // noah
      getUpdatedEmployeeList(employees, workDay),
      updatedSchedule,
    )
    : updatedSchedule
}

export default createSchedule
