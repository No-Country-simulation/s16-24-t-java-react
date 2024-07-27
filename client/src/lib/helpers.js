export const getHourIndex = (time) => {
  const [hour] = time.split(":").map(Number);
  return hour;
};

export const capitalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};


export const formatEmployeeData = (data) => {
  const formatedEmployees = data.map(employee => {
    return {
      fullname: `${employee.personalInfo.firstName ? employee.personalInfo.firstName : ''} ${employee.personalInfo.lastName ? employee.personalInfo.lastName : ''}`,
      dni: employee.personalInfo.dni,
      status: `${employee.status ? 'active' : 'inactive'}`,
      email: employee.personalInfo.email,
      phoneNumber: employee.personalInfo.phoneNumber,
      role: employee.staff,
      address: `${employee.personalInfo.address.city}, ${employee.personalInfo.address.postalCode}, ${employee.personalInfo.address.street}`
    }
  })

  return formatedEmployees
}

export const formatComplexData = (data) => {
  const formatedComplexes = data.map(({activities, ...complex}) => {
    return {
      ...complex,
      address: `${complex.address.city}, ${complex.address.postalCode}, ${complex.address.street}`
    }
  })
  return formatedComplexes
}

export const addDaysToDate = (dateStr, daysToAdd) => {
  // Convertir la cadena de fecha a un objeto Date
  const date = new Date(dateStr);

  // Añadir los días
  date.setDate(date.getDate() + daysToAdd);

  // Convertir la nueva fecha de vuelta a una cadena en formato "YYYY-MM-DD"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses están indexados en 0
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}