import React, { useState } from 'react';
import { format } from 'date-fns';
import { useCalendarStore } from '../store/calendarStore';
import { WorkStatus } from '../types/calendar';
import { Home, Sun, CarIcon, Gavel, Clock, Cross, Briefcase } from 'lucide-react';
import { HoursPopup } from './HoursPopup';

interface CalendarDayProps {
  date: Date;
  isOutsideMonth: boolean;
}

const getBackgroundColor = (status: WorkStatus): string => {

  switch (status) {
    case 'work':
      return 'bg-red-200 hover:bg-red-300';
    case 'free':
      return 'bg-green-200 hover:bg-green-300';
    case 'vacation':
      return 'bg-yellow-200 hover:bg-yellow-300';
    case 'juicio':
      return 'bg-blue-200 hover:bg-blue-300';
    case 'asuntos':
       return 'bg-green-200 hover:bg-green-300';
    default:
      return 'bg-white hover:bg-white-100';
  }
};

const StatusIcon: React.FC<{ status: WorkStatus }> = ({ status }) => {
  switch (status) {
    case 'free':
      return <Home className="w-10 h-10 text-blue-600" />;
    case 'work':
      return <CarIcon className="w-10 h-10 text-red-600" />;
    case 'vacation':
      return <Sun className="w-10 h-10 text-yellow-600" size={50} />;
    case 'juicio':
      return <Gavel className="w-10 h-10 text-black-600"/>;
    case 'asuntos':
        return <Briefcase className="w-10 h-10 text-black-600"/>;
    default:
      return null;
  }
};

export const CalendarDay: React.FC<CalendarDayProps> = ({ date, isOutsideMonth }) => {
  const { getDayStatus, setDayStatus, isLoading } = useCalendarStore();
  const { status, hours } = getDayStatus(date);
  const [showHoursPopup, setShowHoursPopup] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);

  const dayNumber = format(date, 'd');



  const handleMouseDown = () => {
    const timer = setTimeout(() => {
      setShowHoursPopup(true);
    }, 500);
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleHoursSave = async (hours: number) => {
    await setDayStatus(date, status, hours);
  };


  const handleStatusChange = async () => {
    const statusOrder: WorkStatus[] = ['work', 'free', 'vacation', 'juicio', 'asuntos'];
    const currentIndex = statusOrder.indexOf(status as WorkStatus);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    await setDayStatus(date, nextStatus,hours);
  };

  if (isOutsideMonth) {
    return <div className="h-24 bg-gray-50 rounded-lg opacity-50"></div>;
  }

  const backgroundColor = getBackgroundColor(status);

  return (
    <>
      <button
        onClick={handleStatusChange}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        disabled={isLoading}
        className={`
          h-24 p-2 rounded-lg flex flex-col items-center justify-start gap-2
          ${backgroundColor}
          transition-colors duration-200
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span className="text-sm font-semibold text-gray-800">
          {dayNumber}
        </span>
        { <StatusIcon status={status} />}
        {hours !== undefined && hours > 0 && (
          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Clock className="w-3 h-3" />
            {hours}h
          </div>
        )}
      </button>

      {showHoursPopup && (
        <HoursPopup
          date={date}
          onSave={handleHoursSave}
          onClose={() => setShowHoursPopup(false)}
        />
      )}
    </>
  );
};