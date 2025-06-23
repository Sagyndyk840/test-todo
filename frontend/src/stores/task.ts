import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task, CreateTask } from '@/types/task'
import { taskApi } from '@/api/task-api.ts'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchTasks = async (): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null
      tasks.value =await taskApi.getAll()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  const addTask = async (taskData: CreateTask): Promise<void> => {
    try {
      isLoading.value = true
      const newTask = await taskApi.create(taskData)
      tasks.value.push(newTask)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateTaskStatus = async (id: Task['id'], done: boolean): Promise<void> => {
    try {
      isLoading.value = true
      await taskApi.updateStatus(id, done)
      const task = tasks.value.find(t => t.id === id)
      if (task) task.done = done
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  const deleteTask = async (id: Task['id']): Promise<void> => {
    try {
      isLoading.value = true
      await taskApi.delete(id)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTaskStatus,
    deleteTask
  }
})
