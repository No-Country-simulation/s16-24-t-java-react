import React, { useState } from 'react';
import Modal from "./modal"
// import defProfPic from "../../assets/defProfPic.png"

const UserDetail = ({ usuarioCorrecto, profile, handleProfileModal, userData }) => {
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
    fechaAlta,
    correoElectronico,
    ciudad,
    direccion,
    CP,
    telefono
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
    setIsEditing(false);
  }; 

  return (
    <Modal>
    <button onClick={handleProfileModal} className="text-red-500 left top">✖</button>

    <div className="relative inset-0 flex justify-center items-center bg-gray-100 w-[887px] h-[576px] rounded-[32px] shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="w-[200px] h-[500px] flex flex-col relative top-40">
          <img className="w-[200px] h-[200px] relative right-20 bottom-40" src={defProfPic}/>
          <h3 className="font-semibold relative right-20 bottom-40">Fecha de alta</h3>
          <h3 className="relative right-20 bottom-40">{fechaAlta} </h3>
          </div>
        <div className="grid grid-cols-2 gap-4 mb-4 relative left-20 bottom-20">
          <div className="flex flex-col">
            <label className="font-semibold">Nombre</label>
            {isEditing ? (
              <input type="text" name="nombre" defaultValue={nombres} onChange={handleChange} className="border" />
            ) : (
              <p>{nombres}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Apellido</label>
            {isEditing ? (
              <input type="text" name="apellido" defaultValue={apellido} onChange={handleChange} className="border" />
            ) : (
              <p>{apellido}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Fecha de Nacimiento</label>
            {isEditing ? (
              <input type="date" name="fechaNacimiento" defaultValue={fechaNacimiento} onChange={handleChange} className="border" />
            ) : (
              <p>{fechaNacimiento}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">DNI</label>
            {isEditing ? (
              <input type="text" name="dni" defaultValue={dni} onChange={handleChange} className="border " />
            ) : (
              <p>{dni}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Correo electrónico</label>
            {isEditing ? (
              <input type="text" name="dni" defaultValue={correoElectronico} onChange={handleChange} className="border " />
            ) : (
              <p>{correoElectronico}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Ciudad</label>
            {isEditing ? (
              <input type="text" name="dni" defaultValue={ciudad} onChange={handleChange} className="border " />
            ) : (
              <p>{ciudad}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Dirección</label>
            {isEditing ? (
              <input type="text" name="dni" defaultValue={direccion} onChange={handleChange} className="border " />
            ) : (
              <p>{direccion}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Código Postal</label>
            {isEditing ? (
              <input type="text" name="dni" defaultValue={CP} onChange={handleChange} className="border " />
            ) : (
              <p>{CP}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Teléfono</label>
            {isEditing ? (
              <input type="text" name="dni" defaultValue={telefono} onChange={handleChange} className="border " />
            ) : (
              <p>{telefono}</p>
            )}
          </div>

          <div className="grid grid-cols-2 text-white absolute top-80 bg-black ">

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Deporte</label>
            {isEditing ? (
              <select name="membresia" defaultValue={deporte} onChange={handleChange} className="border  bg-black">
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
            <label className="font-semibold mb-1">Membresía</label>
            {isEditing ? (
              <select name="membresia" defaultValue={tipoMembresia} onChange={handleChange} className="border  bg-black">
                <option value="Standard">Standard</option>
                <option value="Premium">Premium</option>
              </select>
            ) : (
              <p>{tipoMembresia}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1">Tipo de Cuota</label>
            {isEditing ? (
              <select name="cancelacionCuotas" defaultValue={tipoCuota} onChange={handleChange} className="border bg-black">
                <option value="anual">Anual</option>
                <option value="mensual">Mensual</option>
                <option value="cuatrimestral">Cuatrimestral</option>
                <option value="semestral">Semestral</option>
              </select>
            ) : (
              <p>{tipoCuota}</p>
            )}
          </div>

          <div></div>

            <div className ="mr-6">
            <label className="text-red-500 font-extrabold mb-2">Fecha vencimiento cuota</label>
              <p className="text-red-500 font-extrabold mb-2">{fechaVencimientoCuota}</p>
            </div>

            <div>
            <label className="text-red-500 font-extrabold mb-1">Días de mora</label>
              <p className="text-red-500 font-extrabold mb-2">{diasDesdeVencimiento}</p>
            </div>
         

        </div>

        <div className="flex justify-end">
          {isEditing ? (
            <button onClick={handleSaveClick} className="bg-green-500 text-white py-2 px-4 rounded mr-2 fixed">Guardar</button>
          ) : (
            <button onClick={handleEditClick} className="bg-blue-500 text-white py-2 px-4 rounded mr-2 fixed">✏️</button>
          )}
          
        </div>
      
    </div>
    </div>

    </Modal>
  );
};

export default UserDetail;





