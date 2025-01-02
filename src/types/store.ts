import { DayStatusRecord, WorkStatus, YearlyCounters } from './calendar';
import { SettingsFormData } from './settings';

export interface CalendarState {
  // Estado
  currentDate: Date;
  dayStatuses: Map<string, DayStatusRecord>;
  yearlyCounters: YearlyCounters;
  settings: SettingsFormData | null;
  isLoading: boolean;

  // Acciones
  setCurrentDate: (date: Date) => void;
  getDayStatus: (date: Date) => {
    status: string;
    hours?: number;
  };
  setDayStatus: (date: Date, status: WorkStatus, hours?: number) => Promise<void>;
  fetchDayStatuses: (year: number) => Promise<void>;
  updateSettings: (settings: SettingsFormData) => Promise<void>;
}