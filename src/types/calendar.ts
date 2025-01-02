export type WorkStatus = 'work' | 'free'  | 'vacation' | 'juicio'| 'asuntos';

export interface DayStatus {
  date: Date;
  status: WorkStatus;
  hours?: number;
}

export interface DayStatusRecord {
  date: string;
  status: WorkStatus;
  hours?: number;
}

export interface YearlyCounters {
  vacationDays: number;
  personalDays: number;
  remainingHours: number;
  totalVacationDays: number;
  totalPersonalDays: number;
  totalRemainingHours: number;
}