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

export const formatCustomerData = (data) => {
  const formatedCustomers = data.map(customer => {
    return {
      fullName: `${customer.personalInfoDTO.firstName ? customer.personalInfoDTO.firstName : ''} ${customer.personalInfoDTO.lastName ? customer.personalInfoDTO.lastName : ''}`,
      birthDate: customer.personalInfoDTO.birthDate,
      dni: customer.personalInfoDTO.dni,
      activity: customer.sport,
      email: customer.personalInfoDTO.email,
      membershipType: customer.membershipDTO.membershipType,
      endDate: customer.membershipDTO.endDate,
      dueDate: calculateDaysDelayed(customer.membershipDTO.endDate),
      phoneNumber: customer.personalInfoDTO.phoneNumber,
    }
  })
  return formatedCustomers
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

export const calculateDaysDelayed = (dueDateStr) => {
  // Convertir la cadena de fecha a un objeto Date
  const dueDate = new Date(dueDateStr);
  // Obtener la fecha actual
  const currentDate = new Date();
  // Calcular la diferencia en milisegundos
  const diffInMs = currentDate - dueDate;
  // Convertir la diferencia de milisegundos a días
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  // Si la diferencia es negativa, no hay retraso
  return diffInDays > 0 ? diffInDays : 0;
}