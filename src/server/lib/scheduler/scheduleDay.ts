
import ramda from 'ramda'
import getEmployee from './employee/getEmployee'
import { applyShift } from './employee/update'
import { withoutEmployee, withoutShift } from './general'
import { getMostComplexShift } from './shifts'

interface IScheduledShiftParams {
  readonly scheduledShifts: ReadonlyArray<any>;
  readonly schduledEmployees: ReadonlyArray<any>;
}

const R = ramda
export const scheduleDay = (
  openShifts, employees,
  {
     scheduledShifts, schduledEmployees,
  }: IScheduledShiftParams = { scheduledShifts: [], schduledEmployees: [] },
) => {
  const shift = getMostComplexShift(openShifts, employees)
  const employee = getEmployee(shift, employees, schduledEmployees)
  const scheduledShift = employee ? { shift, employeeId: employee.id } : false
  const updatedScheduledShifts = scheduledShift
    ? R.append(scheduledShift, scheduledShifts)
    : scheduledShifts
  return openShifts.length > 1
    ? scheduleDay(
      withoutShift(openShifts, shift),
      employee ? withoutEmployee(employees, employee) : employees,
      {
        schduledEmployees: employee
        ? R.append(applyShift(shift, employee), schduledEmployees)
        : schduledEmployees,
        scheduledShifts: updatedScheduledShifts,
      },
    )
    : updatedScheduledShifts
}
