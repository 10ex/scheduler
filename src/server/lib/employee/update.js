// off employees avaliability and add to totalHours, scheduledshifts feild on employee
// employee === { id: string, avialiability:[{day: Sunday, hours: [0,1,1, 1, 1, 1, 1, 0, 1] }, .... ,{day: Saturday}] }
// shift === { day: 'Sunday', clockIn: 3, clockOut: 11 }

const applyShift = (shift, employee) => {
  let totalHours
  const shiftTime = (current, index) => index >= shift.clockIn && index < shift.clockOut ? 0 && totalHours + 1 : current

  const updatedEmployeeList = employee.avaliability.map(day => ({ ...day, hours: day.day === shift.day ? day.hours.map(shiftTime) : day.hours }))
  return { ...employee, avaliability: updatedEmployeeList }
}


const getUpdatedEmployeeList = (employees, scheduledDay) => {
  for (let i = 0; i < employees.length; i++) {
    applyShift(employees[i])
  }
}
