import { z } from 'zod'

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  done: z.boolean().default(false),
})

export const CreateTaskSchema = TaskSchema.omit({ id: true, done: true })
export const UpdateTaskSchema = TaskSchema.pick({ done: true })

export type Task = z.infer<typeof TaskSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>
