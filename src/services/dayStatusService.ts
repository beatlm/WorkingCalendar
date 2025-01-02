import { startOfMonth, endOfMonth } from 'date-fns';
import { supabase } from '../lib/supabase';
import { WorkStatus, DayStatusRecord } from '../types/calendar';
import { formatDateForDB, getDateKey } from '../utils/dateFormatters';

export const fetchDayStatuses = async (year: number, month:number): Promise<Map<string, DayStatusRecord>> => {
  const startDate = formatDateForDB(startOfMonth(new Date(year,month, 1)));
  const endDate = formatDateForDB(endOfMonth(new Date(year,month, 31)));
  console.log('month '+month);
console.log('startDate: '+startDate);
console.log('endDate: '+endDate);
  try {
    const { data, error } = await supabase
      .from('day_statuses')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate);

    if (error) throw error;

    const statusMap = new Map<string, DayStatusRecord>();
    (data as DayStatusRecord[]).forEach(record => {
      const dateKey = getDateKey(new Date(record.date));
      statusMap.set(dateKey, {
        date: record.date,
        status: record.status,
        hours: record.hours
      });
    });

    return statusMap;
  } catch (error) {
    console.error('Error fetching day statuses:', error);
    throw error;
  }
};

export const updateDayStatus = async (
  date: Date,
  status: WorkStatus,
  hours?: number
): Promise<void> => {
  const dateStr = formatDateForDB(date);

  try {
    const { error } = await supabase
      .from('day_statuses')
      .upsert({
        date: dateStr,
        status: status,
        hours: hours
      }, {
        onConflict: 'date'
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating day status:', error);
    throw error;
  }
};