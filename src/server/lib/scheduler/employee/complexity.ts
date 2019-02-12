import R from 'ramda'

/**
 * Create function that given an employee availibility list,
 *  calculate the the employees complexity score
 * [{day: Sunday, hours: [0,1,1, 1, 1, 1, 1, 0, 1] }, .... ,{day: Saturday}]
 *
 *  algoithm is sum of the hours availible in an availibility list
 */
export const calcComplexity = R.compose(
  R.reduce(R.add, 0),
  R.flatten,
  R.map(R.prop('hours')),
)


// list of employyes   return a sorted list by complexity
// [{ id: string, avialibility: [...]} ]
export const sortByComplexity = R.sort(
  (a, b) => calcComplexity(b.availability) - calcComplexity(a.availability),
)

export const mostComplexEmployee = R.compose(
  R.head,
  sortByComplexity,
)
