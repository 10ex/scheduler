import R from 'ramda'
import { IEmployee } from '../interfaces/employee'
import { IScheduledShift, IShift } from '../interfaces/schedule'

export const applyShift = (shift: IShift, employee: IEmployee) => {
  const totalHours = shift.clockOut - shift.clockIn
  const shiftTime = (current: number, index: number) =>
    index >= shift.clockIn && index < shift.clockOut ? 0 : current
  const updatedEmployeeList = employee.availability.map(
    day => ({
      ...day,
      hours: day.day === shift.day ? day.timeSlots.map(shiftTime) : day.timeSlots,
    }),
  )
  return {
    ...employee,
    availability: updatedEmployeeList,
    totalHours: employee.totalHours + totalHours,
  }
}

const hasId = (id: string): (obj: { readonly id: string }) => any => R.compose(
  R.equals(id),
  R.prop('id'),
)

export const getEmployeeIndex = (employees: ReadonlyArray<IEmployee>) =>
  (id: string) => R.findIndex(hasId(id), employees)

export const getUpdatedEmployeeList = (
  employees: ReadonlyArray<IEmployee>,
  scheduledDay: ReadonlyArray<IScheduledShift>,
): ReadonlyArray<IEmployee> => {
  const employeeIndex = getEmployeeIndex(employees)(scheduledDay[0].employeeId)
  const updatedEmp = applyShift(scheduledDay[0].shift, employees[employeeIndex])
  const updatedEmployeeList = R.update(employeeIndex, updatedEmp, employees)
  return scheduledDay.length === 1
    ? updatedEmployeeList
    : getUpdatedEmployeeList(updatedEmployeeList, R.drop(1, scheduledDay))
}
