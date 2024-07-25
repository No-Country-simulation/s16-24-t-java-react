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

export const flattenObject = (obj) => {
  const result = {};

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      result[key] = Object.values(obj[key]).join(', ');
    } else {
      result[key] = obj[key];
    }
  });
  return result;
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
      address: employee.personalInfo.address
    }
  })

  return formatedEmployees
}