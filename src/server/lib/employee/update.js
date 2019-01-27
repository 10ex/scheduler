// off employees avaliability and add to totalHours, scheduledshifts feild on employee
// employee === { id: string, avialiability:[{day: Sunday, hours: [0,1,1, 1, 1, 1, 1, 0, 1] }, .... ,{day: Saturday}] }
const applyShift = (shift, employee) => {
  let totalHours 
 const newAvaliability = employee.avaliability.map()
}


const getUpdatedEmployeeList = (employees, scheduledDay) => {
  for (let i = 0; i < scheduledDay.length; i++) {
    for (let j = 0; j < employees; j++) {
      applyShift(shift.shift, employees[i])
    }
  }
}
