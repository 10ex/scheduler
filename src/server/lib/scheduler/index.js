import R from 'ramda'

const createSchedule = (laborDistribution, employees, schedule = []) => {
  const laborRequirements = getMostComplexDay(laborDistribution, employees)
  // dakota
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
