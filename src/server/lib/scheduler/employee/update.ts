import R from 'ramda'
// off employees availability and add to totalHours, scheduledshifts feild on employee
// employee === { id: string, avialiability:[{day: Sunday, hours: [0,1,1, 1, 1, 1, 1, 0, 1] }, .... ,{day: Saturday}], totalHours: 0 }
// shift === { day: 'Sunday', clockIn: 3, clockOut: 11 }

export const applyShift = (shift, employee) => {
  const totalHours = shift.clockOut - shift.clockIn
  const shiftTime = (current, index) =>
    index >= shift.clockIn && index < shift.clockOut ? 0 : current
  const updatedEmployeeList = employee.availability.map(
    day => ({ ...day, hours: day.day === shift.day ? day.hours.map(shiftTime) : day.hours }),
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

export const getEmployeeIndex = employees => id => R.findIndex(hasId(id), employees)

// [{ shift, employeeId: employee.id } ]
export const getUpdatedEmployeeList = (employees, scheduledDay) => {
  const employeeIndex = getEmployeeIndex(employees)(scheduledDay[0].employeeId)
  const updatedEmp = applyShift(scheduledDay[0].shift, employees[employeeIndex])
  const updatedEmployeeList = R.update(employeeIndex, updatedEmp, employees)
  return scheduledDay.length === 1
    ? updatedEmployeeList
    : getUpdatedEmployeeList(updatedEmployeeList, R.drop(1, scheduledDay))
}
