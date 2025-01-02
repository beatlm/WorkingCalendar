import { DayStatusRecord } from '../types/calendar';

const INITIAL_VACATION_DAYS = 22;
const INITIAL_PERSONAL_DAYS = 6;
const INITIAL_HOURS = 40;

export const calculateYearlyCounters = (dayStatuses: Map<string, DayStatusRecord>) => {
  let vacationDays = 0;
  let personalDays = 0;
  let usedHours = 0;

  dayStatuses.forEach((record) => {
    if (record.status === 'vacation') {
      vacationDays++;
    } else if (record.status === 'personal') {
      personalDays++;
    }
    if (record.hours) {
      usedHours += record.hours;
    }
  });

  return {
    vacationDays: INITIAL_VACATION_DAYS - vacationDays,
    personalDays: INITIAL_PERSONAL_DAYS - personalDays,
    remainingHours: INITIAL_HOURS - usedHours
  };
};