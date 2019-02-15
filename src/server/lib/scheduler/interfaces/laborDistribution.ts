import { Day } from './schedule'

export interface ILaborDistribution {
  readonly day: Day;
  readonly distribution: ReadonlyArray<number>
}
