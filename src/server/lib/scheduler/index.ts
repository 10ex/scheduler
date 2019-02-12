import ramda from 'ramda'
import { getUpdatedEmployeeList } from './employee/update'
import { getMostComplexDay, withoutDay } from './laborDistribution'
import { scheduleDay } from './scheduleDay'
import { generateShifts } from './shifts'

const R = ramda

const createSchedule = (laborDistribution, employees, schedule: ReadonlyArray<any> = []) => {
  const laborRequirements = getMostComplexDay(laborDistribution, employees)
  const workDay = scheduleDay(generateShifts(laborRequirements), employees)
  const updatedSchedule = R.append(workDay, schedule)
  return laborDistribution.length > 1
    ? createSchedule(
      withoutDay(laborDistribution, laborRequirements),
      // noah
      getUpdatedEmployeeList(employees, workDay),
      updatedSchedule,
    )
    : updatedSchedule
}

export default createSchedule
