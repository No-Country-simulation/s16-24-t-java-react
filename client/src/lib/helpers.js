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
  const formatedComplexes = data.map(complex => {
    return {
      ...complex,
      address: `${complex.address.city}, ${complex.address.postalCode}, ${complex.address.street}`
    }
  })

  return formatedComplexes
}