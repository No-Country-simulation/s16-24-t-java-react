import React, { useState } from 'react';
import Modal from "./modal"

const UserDetail = ({ usuarioCorrecto, profile, onClose, userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const {
    nombreCompleto,
    fechaNacimiento,
    dni,
    deporte,
    tipoMembresia,
    tipoCuota,
    fechaVencimientoCuota,
    diasDesdeVencimiento,
    fechaAlta
  } = usuarioCorrecto
  /* const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = () => {
    onSave(formData);
    setIsEditing(false);
  }; */

  return (
    <Modal>
    <div className="relative inset-0 flex justify-center items-center bg-gray-100 w-[800px] h-[260px] rounded-[32px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="bg-white p-8 rounded-lg w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User Information</h2>
          <button onClick={onClose} className="text-red-500">✖</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="font-semibold">Nombre y Apellido</label>
            {isEditing ? (
              <input type="text" name="nombreApellido" value={nombreCompleto} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{nombreCompleto}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Fecha de Nacimiento</label>
            {isEditing ? (
              <input type="date" name="fechaNacimiento" value={fechaNacimiento} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{fechaNacimiento}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">DNI</label>
            {isEditing ? (
              <input type="text" name="dni" value={dni} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{dni}</p>
            )}
          </div>
          
          <div className="flex flex-col">
            <label className="font-semibold">Membresía</label>
            {isEditing ? (
              <select name="membresia" value={tipoMembresia} onChange={handleChange} className="border p-2">
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            ) : (
              <p>{tipoMembresia}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Cancelación de Cuotas</label>
            {isEditing ? (
              <select name="cancelacionCuotas" value={cancelacionCuotas} onChange={handleChange} className="border p-2">
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
            ) : (
              <p>{cancelacionCuotas}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Descuento</label>
            {isEditing ? (
              <select name="descuento" value={descuento} onChange={handleChange} className="border p-2">
                <option value="5%">5%</option>
                <option value="10%">10%</option>
              </select>
            ) : (
              <p>{descuento}</p>
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
    </Modal>
  );
};

export default UserDetail;
