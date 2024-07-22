import { z } from 'zod';

export const ActivitiySchema = z.object({
  activity_name: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
  start_time: z.string({required_error: 'Field is required'}).min(1, 'Field is required'),
  end_time: z.string({required_error: 'Field is required'}).min(1, 'Field is required'),
  day_of_week: z.number({required_error: 'Field is required'}).gte(1).lte(7),
}) 