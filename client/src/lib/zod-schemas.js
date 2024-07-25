import { z } from 'zod';

export const ActivitiySchema = z.object({
  gymCuit: z.string(),
  activityName: z.string().min(1, 'Field is required').max(30, 'Field must be at most 30 characters'),
  startTime: z.string({required_error: 'Field is required'}).min(1, 'Field is required'),
  endTime: z.string({required_error: 'Field is required'}).min(1, 'Field is required'),
  dayOfWeek: z.number({required_error: 'Field is required'}).gte(1).lte(7),
  color: z.string()
}) 