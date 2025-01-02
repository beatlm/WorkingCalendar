import React from 'react';
import { Clock, Calendar, Briefcase } from 'lucide-react';
import { YearlyCounters as CountersType } from '../types/calendar';

interface YearlyCountersProps {
  counters: CountersType;
}

export const YearlyCounters: React.FC<YearlyCountersProps> = ({ counters }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium">Vacaciones</h4>
        </div>
        <p className="text-2xl font-bold">{counters.vacationDays} / 22</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-5 h-5 text-green-600" />
          <h4 className="font-medium">Asuntos propios</h4>
        </div>
        <p className="text-2xl font-bold">{counters.personalDays} / 6</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-purple-600" />
          <h4 className="font-medium">Horas Disponibles</h4>
        </div>
        <p className="text-2xl font-bold">{counters.remainingHours}</p>
      </div>
    </div>
  );
};