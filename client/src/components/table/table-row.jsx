function TableRow ({user}) {
  return (
    <tr className="text-center">
      <td>{user.nombreCompleto}</td>
      <td>{user.fechaNacimiento}</td>
      <td>{user.dni}</td>
      <td>{user.deporte}</td>
      <td>{user.tipoMembresia}</td>
      <td>{user.tipoCuota}</td>
      <td>{user.fechaVencimientoCuota}</td>
      <td>{user.diasDesdeVencimiento}</td>
      <td>{user.fechaAlta}</td>
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