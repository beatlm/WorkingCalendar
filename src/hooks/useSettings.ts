import { useCallback } from 'react';
import { useCalendarStore } from '../store/calendarStore';
import { SettingsFormData } from '../types/settings';


export const useSettings = () => {
  const { settings, updateSettings: updateStoreSettings } = useCalendarStore();

  const updateSettings = useCallback(async (data: SettingsFormData) => {
    await updateStoreSettings(data);
  }, [updateStoreSettings]);

  return {
    settings,
    updateSettings
  };
};