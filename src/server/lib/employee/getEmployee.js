import R from 'ramda'
import { mostComplexEmployee } from './complexity';

const getEmployee = (shift, employees, schduledEmployees) => {
  // noah
  const availible = getAvailibleEmployees(shift, employees)
  const backup = R.isEmpty(availible) ? getAvailibleEmployees(shift, schduledEmployees) : []
  return !R.isEmpty(availible)
    ? mostComplexEmployee(availible)
    : !R.isEmpty(backup)
      ? mostComplexEmployee(backup)
      : null
}

export default getEmployee
