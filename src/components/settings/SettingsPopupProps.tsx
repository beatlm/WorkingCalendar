
import React, { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { SettingsForm } from './SettingsFormProps';
import { Modal } from './ui/Modal';

interface SettingsPopupProps {
  onClose: () => void;
}

export const SettingsPopup: React.FC<SettingsPopupProps> = ({ onClose }) => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState({
    vacationDays: settings?.vacationDays,
    personalDays: settings?.personalDays,
    availableHours: settings?.availableHours
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
    onClose();
  };

  return (
    <Modal onClose={onClose} title="Configuración de días disponibles">
      <SettingsForm
        data={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
};