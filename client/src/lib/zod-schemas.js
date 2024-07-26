import { z } from 'zod';

export const ActivitiySchema = z.object({
  gymCuit: z.string(),
  activityName: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
  startTime: z.string({ required_error: 'Field is required' }).min(1, 'Field is required'),
  endTime: z.string({ required_error: 'Field is required' }).min(1, 'Field is required'),
  dayOfWeek: z.string({ required_error: 'Field is required' }).transform(value => parseInt(value)),
  color: z.string()
})

export const ComplexSchema = z.object({
  title: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
  cuit: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
  apertureDate: z.string({ required_error: 'Field is required' }).min(1, 'Field is required'),
  phoneNumber: z.string({ required_error: 'Field is required' }).min(1, 'Field is required').max(10, 'Field must be at most 10 characters'),
  address: z.object({
    city: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
    postalCode: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
    street: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
  })
})

export const EmployeeScheme = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
    lastName: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
    email: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
    dni: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
    birthDate: z.string({ required_error: 'Field is required' }).min(1, 'Field is required'),
    phoneNumber: z.string({ required_error: 'Field is required' }).min(1, 'Field is required').max(10, 'Field must be at most 10 characters'),
    address: z.object({
      city: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
      postalCode: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
      street: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
    })
  }),
  staff: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
  salary: z.number(),
  status: z.boolean()
})
