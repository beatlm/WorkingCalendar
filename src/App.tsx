import React from 'react';
import { Calendar } from './components/Calendar';
import { YearlyCounters } from './components/YearlyCounters';
import { useCalendarStore } from './store/calendarStore';

function App() {
  const { yearlyCounters } = useCalendarStore();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
      <YearlyCounters counters={yearlyCounters} />

        <Calendar />
      </div>
    </div>
  );
}

export default App;