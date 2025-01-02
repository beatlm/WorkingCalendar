import React, { useState } from 'react';
import { X } from 'lucide-react';

interface HoursPopupProps {
  date: Date;
  onSave: (hours: number) => void;
  onClose: () => void;
}

export const HoursPopup: React.FC<HoursPopupProps> = ({ date, onSave, onClose }) => {
  const [hours, setHours] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(hours);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-lg font-semibold mb-4">
          Registrar horas para {date.toLocaleDateString()}
        </h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Horas consumidas
            </label>
            <input
              type="number"
              min="0"
              max="8"
              step="1"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};