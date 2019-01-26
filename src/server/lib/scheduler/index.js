import R from 'ramda'

const createSchedule = (laborDistribution, employees, schedule = []) => {
  const dayLaborRequirements = getMostComplexDay(laborDistribution, employees)
  const workDay = scheduleDay(dayLaborRequirements, employees)
  const updatedSchedule = R.append(workDay, schedule)
  return laborDistribution.length > 1
    ? createSchedule(
      withoutDay(laborDistribution, dayLaborRequirements),
      getUpdatedEmployeeList(employees, workDay),
      updatedSchedule,
    )
    : updatedSchedule
}
