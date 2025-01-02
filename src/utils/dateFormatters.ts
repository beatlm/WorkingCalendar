import { format, parseISO } from 'date-fns';

export const formatDateForDB = (date: Date): string => {
  // Aseguramos que la fecha se guarde en formato YYYY-MM-DD
  return format(date, 'yyyy-MM-dd');
};

export const getDateKey = (date: Date): string => {
  return formatDateForDB(date);
};

export const parseDBDate = (dateStr: string): Date => {
  // Parseamos la fecha asegurándonos de que se interprete en la zona horaria local
  return parseISO(`${dateStr}T00:00:00`);
};