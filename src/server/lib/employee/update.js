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

// [{ shift, employeeId: employee.id } ]
const getUpdatedEmployeeList = (employees, scheduledDay) => {
  for (let i = 0; i < employees.length; i++) {
    applyShift(employees[i])
  }

  return //employees
}
