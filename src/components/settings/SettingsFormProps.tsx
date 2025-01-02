import React from 'react';
import { SettingsFormData } from '../../types/settings';

interface SettingsFormProps {
  data: SettingsFormData;
  onChange: (data: SettingsFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  data,
  onChange,
  onSubmit,
  onCancel
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Días de vacaciones
      </label>
      <input
        type="number"
        value={data.vacationDays}
        onChange={(e) => onChange({
          ...data,
          vacationDays: parseInt(e.target.value)
        })}
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Días de asuntos propios
      </label>
      <input
        type="number"
        value={data.personalDays}
        onChange={(e) => onChange({
          ...data,
          personalDays: parseInt(e.target.value)
        })}
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Horas disponibles
      </label>
      <input
        type="number"
        value={data.availableHours}
        onChange={(e) => onChange({
          ...data,
          availableHours: parseInt(e.target.value)
        })}
        className="w-full px-3 py-2 border rounded-md"
      />
    </div>
    
    <div className="flex justify-end gap-2 pt-4">
      <button
        type="button"
        onClick={onCancel}
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
);