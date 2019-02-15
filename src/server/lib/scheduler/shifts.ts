import R from 'ramda'
import { IEmployee } from './interfaces/employee'
import { ILaborDistribution } from './interfaces/laborDistribution'
import { IShift } from './interfaces/schedule'

export const isAvailible = (shift: IShift, employee: IEmployee) => {
  const isFree = (currentValue: number) => currentValue === 1
  const workDay = employee.availability.find(day => day.day === shift.day)
  return workDay
    ? workDay.timeSlots.slice((shift.clockIn + 1), (shift.clockOut)).every(isFree)
    : false
}

export const getAvailibleEmployees = (shift: IShift, employees: ReadonlyArray<IEmployee>) => {
  const availiableEmployees = []
  for (let i = 0; i < employees.length; i++) {
    // eslint-disable-next-line no-unused-expressions
    isAvailible(shift, employees[i]) === true ? availiableEmployees.push(employees[i]) : false
  }
  return availiableEmployees
}

export const getMostComplexShift = (
  shifts: ReadonlyArray<IShift>,
  employees: ReadonlyArray<IEmployee>,
) => {
  const pool = []
  for (let i = 0; i < shifts.length; i++) {
    const poolsize = getAvailibleEmployees(shifts[i], employees).length
    const shift = shifts[i]
    pool.push({ poolsize, shift })
  }
  const diff = function (a: {poolsize: number}, b: {poolsize: number}) { return a.poolsize - b.poolsize }
  return R.sort(diff, pool)[0].shift
}

export const refineShifts = (
  shifts: ReadonlyArray<IShift>,
  min: number,
): ReadonlyArray<IShift> => {
  const clampToMin = R.clamp(min, Infinity)
  const invalidShiftIndex = R.findIndex(
    s => (s.clockOut - s.clockIn) < min,
    shifts,
  )
  const proptToModify = invalidShiftIndex !== -1
    ? (
        shifts[invalidShiftIndex].clockIn - shifts[0].clockIn) >
        (min - (shifts[invalidShiftIndex].clockOut - shifts[invalidShiftIndex].clockIn)
      )
        ? 'clockIn'
        : 'clockOut'
    : null

  const shiftToModifyIndex = invalidShiftIndex !== -1
    ? R.findIndex(
      s => s.clockOut === shifts[invalidShiftIndex].clockIn,
      shifts,
    )
    : -1

  return proptToModify === null
    ? shifts
    : refineShifts(
      shifts.map(
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
      ),
      min,
    )
}

export const generateShifts = (
  laborRequirements: ILaborDistribution,
  shifts: ReadonlyArray<IShift> = [], id = 0,
): ReadonlyArray<IShift> => {
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
  const updatedDistribution = distribution.map(
    (num, index) => index >= clockIn && index < clockOut ? num - 1 : num,
  )
  const updatedShifts = R.append(shift, shifts)
  return R.all(R.equals(0))(updatedDistribution)
    ? refineShifts(updatedShifts, 4)
    : generateShifts(
      { day, distribution: updatedDistribution },
      updatedShifts,
      id + 1,
    )
}
