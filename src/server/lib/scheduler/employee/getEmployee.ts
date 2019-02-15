import R from 'ramda'
import { IEmployee } from '../interfaces/employee'
import { IShift } from '../interfaces/schedule'
import { getAvailibleEmployees } from '../shifts'
import { sortByComplexity } from './complexity';

const getEmployee = (
  shift: IShift, employees: ReadonlyArray<IEmployee>,
  schduledEmployees: ReadonlyArray<IEmployee>,
) => {
  const availible = getAvailibleEmployees(shift, employees)
  const backup = R.isEmpty(availible) ? getAvailibleEmployees(shift, schduledEmployees) : []
  const sortedEmployees = !R.isEmpty(availible)
    ? sortByComplexity(availible)
    : !R.isEmpty(backup)
      ? sortByComplexity(backup)
      : []
  const mostComplexUnder40 = sortedEmployees.find(emp => emp.totalHours < 40)
  return !R.isNil(mostComplexUnder40) ? mostComplexUnder40 : R.head(sortedEmployees)
}

export default getEmployee
