import { create } from 'zustand';
import { startOfToday } from 'date-fns';
import { CalendarState } from '../types/store';
import { fetchDayStatuses, updateDayStatus } from '../services/dayStatusService';
import { fetchSettings, updateSettings as updateSettingsService } from '../services/settingsService';
import { calculateYearlyCounters } from '../utils/yearlyCounters';
import { getDayStatusInfo } from '../utils/dayStatus';
import { getDateKey } from '../utils/dateFormatters';
import { WorkStatus } from '../types/calendar';

export const useCalendarStore = create<CalendarState>((set, get) => ({
  // Estado inicial
  currentDate: startOfToday(),
  dayStatuses: new Map(),
  yearlyCounters: {
    vacationDays: 0,
    personalDays: 0,
    remainingHours: 0,
    totalVacationDays: 0,
    totalPersonalDays: 0,
    totalRemainingHours: 0
  },
  settings: null,
  isLoading: false,

  // Acciones
  setCurrentDate: (date: Date) => set({ currentDate: date }),

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

  setDayStatus: async (date: Date, status: WorkStatus, hours?: number) => {
    set({ isLoading: true });
    try {
      const dateKey = getDateKey(date);
      await updateDayStatus(date, status, hours);
      
      const { dayStatuses, settings } = get();
      const newDayStatuses = new Map(dayStatuses);
      newDayStatuses.set(dateKey, { date: dateKey, status, hours });
      
      const yearlyCounters = calculateYearlyCounters(newDayStatuses, settings!);
      
      set({
        dayStatuses: newDayStatuses,
        yearlyCounters
      });
    } catch (error) {
      console.error('Error updating day status:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchDayStatuses: async (year: number) => {
    set({ isLoading: true });
    try {
      const [dayStatuses, settings] = await Promise.all([
        fetchDayStatuses(year),
        fetchSettings()
      ]);
      
      const yearlyCounters = calculateYearlyCounters(dayStatuses, settings);
      
      set({
        dayStatuses,
        settings,
        yearlyCounters
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateSettings: async (settings) => {
    set({ isLoading: true });
    try {
      await updateSettingsService(settings);
      const { dayStatuses } = get();
      const yearlyCounters = calculateYearlyCounters(dayStatuses, settings);
      
      set({
        settings,
        yearlyCounters
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));