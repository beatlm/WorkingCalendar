import React, { useEffect, useState } from 'react';
import { Clock, Briefcase, Sun } from 'lucide-react';
import { YearlyCounters as CountersType } from '../types/calendar';

import { SettingsButton } from './settings/SettingsButton';
import { SettingsPopup } from './settings/SettingsPopupProps';
import { useCalendarStore } from '../store/calendarStore';
import { fetchSettings } from '../services/settingsService';

interface YearlyCountersProps {
  counters: CountersType;
}

export const YearlyCounters: React.FC<YearlyCountersProps> = ({ counters }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useCalendarStore();
  // Si no hay settings, mostramos los contadores sin máximos

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold"> {counters.vacationDays} / {settings?.vacationDays}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-black-600" />
          </div>
          <p className="text-2xl font-bold"> {counters.personalDays} / {settings?.personalDays}</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold">{counters.remainingHours}/{settings?.availableHours}</p>
        </div>
      </div>

      <div className="absolute -bottom-4 right-0">
        <SettingsButton onClick={() => setShowSettings(true)} />
      </div>

      {showSettings && (
        <SettingsPopup onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};