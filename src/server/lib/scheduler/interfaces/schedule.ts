export type Day = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

export interface IShift {
  readonly id: number;
  readonly day: Day;
  readonly clockIn: number;
  readonly clockOut: number;
}

export interface IScheduledShift {
  readonly employeeId: string;
  readonly shift: IShift;
}
