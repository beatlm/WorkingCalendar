export type WorkStatus = 'work' | 'free'  | 'vacation';

export interface DayStatus {
  date: Date;
  status: WorkStatus;
}