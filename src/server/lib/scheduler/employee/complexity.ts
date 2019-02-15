import R from 'ramda'
import { IAvailibility, IEmployee } from '../interfaces/employee'

type getTimeSlotsFn = (
  availibility: ReadonlyArray<IAvailibility>,
) => ReadonlyArray<ReadonlyArray<1 | 0>>

type flattenNumArrayFn = (arr: ReadonlyArray<ReadonlyArray<1 | 0>>) => ReadonlyArray<1 | 0>

type reduceTimeSlot = (
  fn: (acc: number, ele: number) => number,
  init: number,
) => (slots: ReadonlyArray<number>) => number

type employeeListFn = (employees: ReadonlyArray<IEmployee>) => ReadonlyArray<IEmployee>

const getTimeSlots: getTimeSlotsFn = R.map(R.prop('timeSlots'))

export const calcComplexity: (availibility: ReadonlyArray<IAvailibility>) => number = R.compose(
  (R.reduce as reduceTimeSlot)(R.add, 0),
  R.flatten as flattenNumArrayFn,
  getTimeSlots,
)

export const sortByComplexity: employeeListFn = R.sort(
  (a, b) => calcComplexity(b.availability) - calcComplexity(a.availability),
)

export const mostComplexEmployee = R.compose(
  R.head as (l: ReadonlyArray<IEmployee>) => IEmployee,
  sortByComplexity,
)
