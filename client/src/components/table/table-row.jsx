function TableRow ({user, handleProfile}) {
  return (
    <tr className="text-center [&>td]:py-4  [&>td]:border-b [&>td]:border-primary-0">
      <td className="border-l cursor-pointer" onClick={() => handleProfile(user)}>{user.nombreCompleto}</td>
      <td>{user.fechaNacimiento}</td>
      <td>{user.dni}</td>
      <td>{user.deporte}</td>
      <td>{user.tipoMembresia}</td>
      <td>{user.tipoCuota}</td>
      <td>{user.fechaVencimientoCuota}</td>
      <td>{user.diasDesdeVencimiento}</td>
      <td className="border-r">{user.fechaAlta}</td>
    </tr>
  )
}

export default TableRow

// nombreCompleto: string;
//     fechaNacimiento: string;
//     dni: string;
//     deporte: string;
//     tipoMembresia: string;
//     tipoCuota: string;
//     fechaVencimientoCuota: string;
//     diasDesdeVencimiento: number;
//     fechaAlta: string;