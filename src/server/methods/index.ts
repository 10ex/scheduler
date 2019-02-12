import R from 'ramda';
import testApi from './test'

const API = [testApi]

// @ts-ignore
const Methods = R.reduce(R.concat, [], API)

export default Methods
