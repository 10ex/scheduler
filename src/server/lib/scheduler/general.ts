export const withoutShift = (openShifts, shift) => {
  const updatedOpenShifts = []
  for (let i = 0; i < openShifts.length; i++) {
    openShifts[i].id !== shift.id ? updatedOpenShifts.push(openShifts[i]) : null
  }
  return updatedOpenShifts
}

export const withoutEmployee = (employees, employee) => {
  const updatedEmployees = []
  for (let i = 0; i < employees.length; i++) {
    employees[i].id !== employee.id ? updatedEmployees.push(employees[i]) : null
  }
  return updatedEmployees
}
