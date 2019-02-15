import { Day } from './schedule'

export interface IAvailibility {
  readonly day: Day;
  readonly timeSlots: ReadonlyArray<0 | 1>
}

export interface IEmployee {
  readonly id: string;
  readonly totalHours: number;
  readonly availability: ReadonlyArray<IAvailibility>;
}
