import React, { useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useCalendarStore } from '../store/calendarStore';
import { useMonthNavigation } from '../hooks/useMonthNavigation';
import { CalendarDay } from './CalendarDay';
import { WorkStatus } from '../types/calendar';


export interface DayStatus {
  date: Date;
  status: WorkStatus;
  hours?: number;
}


export interface YearlyCounters {
  vacationDays: number;
  personalDays: number;
  remainingHours: number;
}

export interface DayStatusRecord {
  date: string;
  status: WorkStatus;
  hours?: number;
}

export const Calendar: React.FC = () => {
  const { currentDate, setCurrentDate, isLoading, error, fetchCurrentYearStatuses } = useCalendarStore();
  const { nextMonth, previousMonth } = useMonthNavigation(currentDate, setCurrentDate);

  useEffect(() => {
    fetchCurrentYearStatuses();
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = eachDayOfInterval({
    start: calendarStart,
    end: endOfWeek(calendarStart, { weekStartsOn: 1 })
  });



  if (error) {
    return (
      <div className="text-red-600 text-center p-4 bg-red-50 rounded-lg">
        <p className="font-semibold">Error al cargar los datos</p>
        <p className="text-sm mt-2">{error}</p>
        <button 
          onClick={() => fetchCurrentYearStatuses()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {isLoading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center gap-3">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-gray-700">Cargando datos...</span>
          </div>
        </div>
      )}
            
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={isLoading}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-semibold capitalize">
            {format(currentDate, 'MMMM yyyy', { locale: es })}
          </h2>
         
        
          
        </div>
       
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={isLoading}
        >
          
          <ChevronRight className="w-6 h-6" />
        </button>
        
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className="text-center font-semibold text-gray-600"
          >
            {format(day, 'EEEEE', { locale: es }).toUpperCase()}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <CalendarDay 
            key={day.toString()} 
            date={day}
            isOutsideMonth={!isSameMonth(day, currentDate)}
          />
        ))}
      </div>
    </div>
  );
};