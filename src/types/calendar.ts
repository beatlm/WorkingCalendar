export type WorkStatus = 'work' | 'free'  | 'vacation' | 'juicio';

export interface DayStatus {
  date: Date;
  status: WorkStatus;
}