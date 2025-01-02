import { supabase } from '../lib/supabase';
import { SettingsFormData } from '../types/settings';

export const fetchSettings = async (): Promise<SettingsFormData> => {
  console.log('Obtenemos los contadores de vacaciones de bbdd.')
 

  const { data, error } = await supabase
  .from('user_settings')
    .select('*')
    .eq('userid', 'rover')
    .single();

  if (error) {
   console.error('Error obteniendo los contadores:',error);
    throw error;
  }
  console.log('Devolvemos data.vacation_days',data.vacation_days);

  return {
    vacationDays: data.vacation_days,
    personalDays: data.personal_days,
    availableHours: data.available_hours
  };
};

export const updateSettings = async (settings: SettingsFormData): Promise<void> => {
 

  const { error } = await supabase
    .from('user_settings')
    .upsert({
      userid: 'rover',
      vacation_days: settings.vacationDays,
      personal_days: settings.personalDays,
      available_hours: settings.availableHours,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
};

