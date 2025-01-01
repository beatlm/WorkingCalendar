import { WorkStatus, DayStatus } from '../types/calendar';

export const getDayStatusInfo = (date: Date, status: WorkStatus): DayStatus => {
  

  return {
    date,
    status
  };
};