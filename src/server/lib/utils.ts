import R from 'ramda'

export const isObj = R.compose(R.equals('Object'), R.type)

export const formatAddress = R.compose(
  R.join(' '),
  R.values,
)
