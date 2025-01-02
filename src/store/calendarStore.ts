import { create } from 'zustand';
import { startOfMonth } from 'date-fns';
import { WorkStatus, DayStatus,DayStatusRecord ,YearlyCounters} from '../types/calendar';
import { getDayStatusInfo } from '../utils/dayStatus';
import { getDateKey } from '../utils/dateFormatters';
import { fetchDayStatuses, updateDayStatus } from '../services/dayStatusService';
import { calculateYearlyCounters } from '../utils/yearlyCounters';

interface CalendarState {
  currentDate: Date;
  dayStatuses: Map<string, DayStatusRecord>;
  yearlyCounters: YearlyCounters;

  isLoading: boolean;
  error: string | null;
  setCurrentDate: (date: Date) => Promise<void>;
  setDayStatus: (date: Date, status: WorkStatus, hours:number) => Promise<void>;
  getDayStatus: (date: Date) => DayStatus;
  fetchCurrentYearStatuses: () => Promise<void>;
}

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: startOfMonth(new Date()),
  dayStatuses: new Map(),
  isLoading: false,
  error: null,
  yearlyCounters: {
    vacationDays: 23,
    personalDays: 8,
    remainingHours: 4
  },
  setCurrentDate: async (date: Date) => {
    set({ currentDate: date });
    await get().fetchCurrentYearStatuses();
  },

  setDayStatus: async (date: Date, status: WorkStatus, hours?: number) => {
    try {
      set({ isLoading: true, error: null });
      await updateDayStatus(date, status, hours);
      
      const dateKey = getDateKey(date);
      const newDayStatuses = new Map(get().dayStatuses);
      newDayStatuses.set(dateKey, { date: dateKey, status, hours });
      
      const yearlyCounters = calculateYearlyCounters(newDayStatuses);
      
      set({
        dayStatuses: newDayStatuses,
        yearlyCounters,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Error al actualizar el estado del día',
        isLoading: false 
      });
    }
  },


  

  getDayStatus: (date: Date) => {
    const { dayStatuses } = get();
    const dateKey = getDateKey(date);
    const record = dayStatuses.get(dateKey);
    const status = record?.status || 'work';
    const dayStatus = getDayStatusInfo(date, status);
    return {
      ...dayStatus,
      hours: record?.hours
    };
  },

  fetchCurrentYearStatuses: async () => {
    try {
      set({ isLoading: true, error: null });
      const { currentDate } = get();
      const statusMap = await fetchDayStatuses(currentDate.getFullYear(),currentDate.getMonth());
      const yearlyCounters = calculateYearlyCounters(statusMap);
      
      set({ 
        dayStatuses: statusMap,
        yearlyCounters,
        isLoading: false 
      });
    } catch (error) {
      console.error('Error fetching day statuses:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Error al cargar los datos',
        isLoading: false 
      });
    }
  }
}));