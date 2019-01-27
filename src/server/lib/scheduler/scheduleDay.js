
import R from 'ramda'

const scheduleDay = (openShifts, employees, { scheduledShifts = [], schduledEmployees = [] }) => {
  const shift = getMostComplexShift(openShifts, employees)
  const employee = getEmployee(shift, employees, schduledEmployees)
  const scheduledShift = employee ? { shift, id: employee.id } : false
  const updatedScheduledShifts = scheduledShift
    ? R.append(scheduledShift, scheduledShifts)
    : scheduledShifts
  return openShifts.length > 1
    ? scheduleDay(
      // noah
      withoutShift(openShifts, shift),
      // noah
      employee ? withoutEmployee(employees, employee) : employees,
      {
        scheduledShifts: updatedScheduledShifts,
        // noah
        schduledEmployees: employee ? R.append(applyShift(shift, employee), schduledEmployees) : schduledEmployees,
      },
    )
    : updatedScheduledShifts
}
