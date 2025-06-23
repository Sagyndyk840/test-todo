import { apiClient } from '@/api/api-client'
import { TaskSchema, CreateTaskSchema, UpdateTaskSchema, type CreateTask, type Task } from '@/types/task'
import { z } from 'zod'

export const taskApi = {
  async getAll() {
    const response = await apiClient.get('/tasks')
    return z.array(TaskSchema).parse(response.data)
  },

  async create(taskData: CreateTask) {
    const validatedData = CreateTaskSchema.parse(taskData)
    const response = await apiClient.post('/tasks', validatedData)
    return TaskSchema.parse(response.data)
  },

  async updateStatus(id: Task['id'], done: Task['done']) {
    const validatedData = UpdateTaskSchema.parse({ done })
    const response = await apiClient.put(`/tasks/${id}`, validatedData)
    return TaskSchema.parse(response.data)
  },

  async delete(id: Task['id']) {
    await apiClient.delete(`/tasks/${id}`)
    return id
  }
}
