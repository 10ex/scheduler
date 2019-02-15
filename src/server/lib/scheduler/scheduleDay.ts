
import ramda from 'ramda'
import getEmployee from './employee/getEmployee'
import { applyShift } from './employee/update'
import { withoutEmployee, withoutShift } from './general'
import { IEmployee } from './interfaces/employee'
import { IScheduledShift, IShift } from './interfaces/schedule'
import { getMostComplexShift } from './shifts'

interface IScheduledShiftParams {
  readonly scheduledShifts: ReadonlyArray<IScheduledShift>;
  readonly schduledEmployees: ReadonlyArray<IEmployee>;
}

const R = ramda
export const scheduleDay = (
  openShifts: ReadonlyArray<IShift>,
  employees: ReadonlyArray<IEmployee>,
  {
     scheduledShifts, schduledEmployees,
  }: IScheduledShiftParams = { scheduledShifts: [], schduledEmployees: [] },
): ReadonlyArray<IScheduledShift> => {
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
