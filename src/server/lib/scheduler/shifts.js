import R from 'ramda'
// shift === { day: 'Sunday', clockIn: 3, clockOut: 11 }
// employee === { id: string, avialibility:[{day: Sunday, hours: [0,1,1, 1, 1, 1, 1, 0, 1] }, .... ,{day: Saturday}] }
const isAvailible = (shift, employee) => {
  const isFree = currentValue => currentValue === 1
  return employee.availiability.find(day => day.day === shift.day).hours.slice((shift.clockIn + 1), (shift.clockOut)).every(isFree)
}

const getAvailibleEmployees = (shift, employees) => {
  const availiableEmployees = []
  for (let i = 0; i < employees.length; i++) {
    // eslint-disable-next-line no-unused-expressions
    isAvailible(shift, employees[i]) === true ? availiableEmployees.push(employees[i]) : false
  }
  return availiableEmployees
}

const getMostComplexShift = (shifts, employees) => {
  const pool = []
  for (let i = 0; i < shifts.length; i++) {
    const poolsize = getAvailibleEmployees(shifts[i], employees).length
    const shift = shifts[i]
    pool.push({ poolsize, shift })
  }
  const diff = function (a, b) { return a.poolsize - b.poolsize }
  return R.sort(diff, pool)[0].shift
}

const refineShifts = (shifts, min) => {
  const clampToMin = R.clamp(min, Infinity)
  const invalidShiftIndex = R.findIndex(
    s => (s.clockOut - s.clockIn) < min,
    shifts,
  )
  const proptToModify = invalidShiftIndex !== -1
    ? (shifts[invalidShiftIndex].clockIn - shifts[0].clockIn) > (min - shifts[invalidShiftIndex].clockOut - shifts[invalidShiftIndex].clockIn)
      ? 'clockIn'
      : 'clockOut'
    : null

  const shiftToModifyIndex = invalidShiftIndex !== -1
    ? R.findIndex(
      s => s.clockOut === shifts[invalidShiftIndex].clockIn,
      shifts,
    )
    : -1

  return invalidShiftIndex === -1
    ? shifts
    : refineShifts(
      R.addIndex(R.map)(
        (shift, index) => index === shiftToModifyIndex
          ? {
            ...shift,
            clockOut: shift.clockIn + clampToMin(
              (shift.clockOut - shift.clockIn) - (
                min - (shifts[invalidShiftIndex].clockOut - shifts[invalidShiftIndex].clockIn)
              ),
            ),
          }
          : index === invalidShiftIndex
            ? {
              ...shift,
              [proptToModify]: proptToModify === 'clockIn'
                ? shift.clockIn - (min - (shift.clockOut - shift.clockIn))
                : shift.clockOut + (min - (shift.clockOut - shift.clockIn)),
            }
            : shift,
      )(shifts),
      min,
    )
}
// lr === { day: 'Sunday', distribution: [0, 0, 2, 2, 3, 4, 5, 6, 7]}
const generateShifts = (laborRequirements, shifts = [], id = 0) => {
  const { day, distribution } = laborRequirements
  const clockIn = R.findIndex(R.lt(0))(distribution)
  const remainingHours = R.drop(clockIn + 1, distribution)
  const shiftLength = R.reduceWhile(
    (acc, num) => acc < 8 && num > 0,
    R.add(1),
    1,
  )(remainingHours)
  const clockOut = clockIn + shiftLength
  const shift = { id, day, clockIn, clockOut }
  const updatedDistribution = R.addIndex(R.map)(
    (num, index) => index >= clockIn && index < clockOut ? num - 1 : num,
  )(distribution)
  const updatedShifts = R.append(shift, shifts)
  return R.all(R.equals(0))(updatedDistribution)
    ? refineShifts(updatedShifts, 4)
    : generateShifts(
      { day, distribution: updatedDistribution },
      updatedShifts,
      id + 1,
    )
}

