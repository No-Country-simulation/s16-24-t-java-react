import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = () => {
    onSave(formData);
    setIsEditing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Information</h2>
          <button onClick={onClose} className="text-red-500">✖</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="font-semibold">Nombre y Apellido</label>
            {isEditing ? (
              <input type="text" name="nombreApellido" value={formData.nombreApellido} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{formData.nombreApellido}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Fecha de Nacimiento</label>
            {isEditing ? (
              <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{formData.fechaNacimiento}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">DNI</label>
            {isEditing ? (
              <input type="text" name="dni" value={formData.dni} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{formData.dni}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Correo Electrónico</label>
            {isEditing ? (
              <input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{formData.correoElectronico}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Membresía</label>
            {isEditing ? (
              <select name="membresia" value={formData.membresia} onChange={handleChange} className="border p-2">
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            ) : (
              <p>{formData.membresia}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Cancelación de Cuotas</label>
            {isEditing ? (
              <select name="cancelacionCuotas" value={formData.cancelacionCuotas} onChange={handleChange} className="border p-2">
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            ) : (
              <p>{formData.cancelacionCuotas}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Descuento</label>
            {isEditing ? (
              <select name="descuento" value={formData.descuento} onChange={handleChange} className="border p-2">
                <option value="5%">5%</option>
                <option value="10%">10%</option>
              </select>
            ) : (
              <p>{formData.descuento}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          {isEditing ? (
            <button onClick={handleSaveClick} className="bg-green-500 text-white py-2 px-4 rounded mr-2">Guardar</button>
          ) : (
            <button onClick={handleEditClick} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">✏️</button>
          )}
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
