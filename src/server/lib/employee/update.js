import R from 'ramda'
// off employees avaliability and add to totalHours, scheduledshifts feild on employee
// employee === { id: string, avialiability:[{day: Sunday, hours: [0,1,1, 1, 1, 1, 1, 0, 1] }, .... ,{day: Saturday}], totalHours: 0 }
// shift === { day: 'Sunday', clockIn: 3, clockOut: 11 }

const applyShift = (shift, employee) => {
  const totalHours = shift.clockOut - shift.clockIn
  const shiftTime = (current, index) =>
    index >= shift.clockIn && index < shift.clockOut ? 0 : current
  const updatedEmployeeList = employee.avaliability.map(
    day => ({ ...day, hours: day.day === shift.day ? day.hours.map(shiftTime) : day.hours }),
  )
  return {
    ...employee,
    avaliability: updatedEmployeeList,
    totalHours: employee.totalHours + totalHours,
  }
}

const hasId = id => R.compose(
  R.equals(id),
  R.prop('id'),
)


const getEmployeeIndex = employees => id => R.findIndex(hasId(id), employees)

// [{ shift, employeeId: employee.id } ]
const getUpdatedEmployeeList = (employees, scheduledDay) => {
  const employeeIndex = getEmployeeIndex(employees)(scheduledDay[0].id)
  const updatedEmp = applyShift(scheduledDay[0].shift, employees[employeeIndex])
  const updatedEmployeeList = R.update(employeeIndex, updatedEmp, employees)
  return scheduledDay.length === 1 
    ? updatedEmployeeList
    : getUpdatedEmployeeList(updatedEmployeeList, R.drop(1, scheduledDay))
}
