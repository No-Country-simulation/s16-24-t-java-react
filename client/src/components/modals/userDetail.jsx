import React, { useState } from 'react';
import Modal from "./modal"

const UserDetail = ({ usuarioCorrecto, profile, handleProfileModal, userData, onSave }) => {
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
  } = usuarioCorrecto[0]

  console.log(usuarioCorrecto)

  const nomSeparado = nombreCompleto.split(" ")
  const apellido = nomSeparado.pop()
  const nombres = nomSeparado.join(" ")

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

  return (
    <Modal>
    <button onClick={handleProfileModal} className="text-red-500 left top">✖</button>

    <div className="relative inset-0 flex justify-center items-center bg-gray-100 w-[887px] h-[576px] rounded-[32px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
      
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="font-semibold">Nombre</label>
            {isEditing ? (
              <input type="text" name="nombre" value={nombres} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{nombres}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Apellido</label>
            {isEditing ? (
              <input type="text" name="apellido" value={apellido} onChange={handleChange} className="border p-2" />
            ) : (
              <p>{apellido}</p>
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
            <label className="font-semibold">Deporte</label>
            {isEditing ? (
              <select name="membresia" value={deporte} onChange={handleChange} className="border p-2">
                <option value="Fútbol">Fútbol</option>
                <option value="Tenis">Tenis</option>
                <option value="Pádel">Pádel</option>
                <option value="Voley">Voley</option>
              </select>
            ) : (
              <p>{deporte}</p>
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
            <label className="font-semibold">Tipo de Cuota</label>
            {isEditing ? (
              <select name="cancelacionCuotas" value={tipoCuota} onChange={handleChange} className="border p-2">
                <option value="un tipo">un tipo</option>
                <option value="otro tipo">otro tipo</option>
              </select>
            ) : (
              <p>{tipoCuota}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Fecha vencimiento cuota</label>
            {isEditing ? (
              <select name="descuento" value={fechaVencimientoCuota} onChange={handleChange} className="border p-2">
                <option value="5%">5%</option>
                <option value="10%">10%</option>
              </select>
            ) : (
              <p>{fechaVencimientoCuota}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          {isEditing ? (
            <button onClick={handleSaveClick} className="bg-green-500 text-white py-2 px-4 rounded mr-2">Guardar</button>
          ) : (
            <button onClick={handleEditClick} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">✏️</button>
          )}
          
        </div>
      
    </div>
    </Modal>
  );
};

export default UserDetail;
