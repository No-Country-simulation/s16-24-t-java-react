export const PATHS = {
  HOME: "/",
  STAFF: "/staff",
  ACTIVITIES: "/activities",
  HEADQUARTERS: "/headquarters",
  TECHNICAL_SUPPORT: "/technical-support",
}

export const MembersColumns = [
  'full_name',
  'birth_date',
  'id',
  'sport',
  'subscription',
  'due_date',
  'days_from_due',
  'phone_number',
];

export const StaffColumns = [
  'full_name',
  'id',
  'status',
  'email',
  'phone_number',
  'role',
  'address',
  // 'created_at',
]

export const DaysColumns = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

export const HeadquartersColumns = [
  'title',
  'cuit',
  'aperture_date',
  'phone_number',
  'address',
]

export const Hours = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]

export const STAFF_CATEGORIES = [
  'COACH', 'CLEANING_STAFF', 'RECEPTIONIST'
] 

export const EMPLOYEES_DATA = {
  staff: "staff",
  salary: "salary",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  dni: "dni",
  birthDate: "birthDate",
  phoneNumber: "phoneNumber",
  city: "city",
  postalCode: "postalCode",
  street: "street",
}

export const COMPLEX_DATA = {
  title: "title",
  cuit: "cuit",
  apertureDate: "apertureDate",
  phoneNumber: "phoneNumber",
  city: "city",
  postalCode: "postalCode",
  street: "street",
}

export const CUSTOMERS_DATA = {
  dni: "dni",
  firstName: "firstName",
  lastName: "lastName",
  email: "email",
  birthDate: "birthDate",
  phoneNumber: "phoneNumber",
  city: "city",
  postalCode: "postalCode",
  street: "street",
  sport: "sport",
  membership: "membership",
}

export const DISCOUNTS = [
  "5%",
  "10%",
  "15%",
  "20%",
  "25%",
  "30%"
]

export const MEMBERSHIP = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum"
]
