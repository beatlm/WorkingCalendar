import {  DayStatusRecord, YearlyCounters } from '../types/calendar';
import { SettingsFormData } from '../types/settings';

export const calculateYearlyCounters = (
  dayStatuses: Map<string, DayStatusRecord>,
  settings: SettingsFormData
): YearlyCounters => {
  let usedVacationDays = 0;
  let usedPersonalDays = 0;
  let usedHours = 0;

  dayStatuses.forEach((record) => {
    if (record.status === 'vacation') {
      usedVacationDays++;
    } else if (record.status === 'asuntos') {
      usedPersonalDays++;
    }
    if (record.hours) {
      usedHours += record.hours;
    }
  });

  return {
    vacationDays: settings.vacationDays - usedVacationDays,
    personalDays: settings.personalDays - usedPersonalDays,
    remainingHours: settings.availableHours - usedHours,
    totalVacationDays: settings.vacationDays,
    totalPersonalDays: settings.personalDays,
    totalRemainingHours: settings.availableHours
  };
};