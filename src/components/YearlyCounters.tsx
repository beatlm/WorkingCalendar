import React, { useState } from 'react';
import { Clock, Calendar, Briefcase, Settings } from 'lucide-react';
import { YearlyCounters as CountersType } from '../types/calendar';
import { SettingsPopup } from './settings/SettingsPopupProps';
import { useCalendarStore } from '../store/calendarStore';

interface YearlyCountersProps {
  counters: CountersType;
}

export const YearlyCounters: React.FC<YearlyCountersProps> = ({ counters }) => {
  const [showSettings, setShowSettings] = useState(false);
  const { settings } = useCalendarStore();

  if (!settings) {
    return null;
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium">Días de Vacaciones</h4>
          </div>
          <p className="text-2xl font-bold">
            {counters.vacationDays} / {counters.totalVacationDays}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-5 h-5 text-green-600" />
            <h4 className="font-medium">Días Personales</h4>
          </div>
          <p className="text-2xl font-bold">
            {counters.personalDays} / {counters.totalPersonalDays}
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <h4 className="font-medium">Horas Disponibles</h4>
          </div>
          <p className="text-2xl font-bold">
            {counters.remainingHours}
          </p>
        </div>

        <button
          onClick={() => setShowSettings(true)}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <h4 className="font-medium">Configuración</h4>
          </div>
          <p className="text-2xl font-bold text-gray-400">···</p>
        </button>
      </div>

      {showSettings && (
        <SettingsPopup onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
};
