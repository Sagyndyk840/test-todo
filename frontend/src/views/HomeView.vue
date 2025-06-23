<script setup lang="ts">
import TaskForm from '@/components/tasks/TaskForm.vue'
import TaskList from '@/components/tasks/TaskList.vue'
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/task.ts'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchTasks()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto py-8">
      <div class="mx-auto max-w-3xl space-y-6 p-4">
        <h1 class="text-2xl font-bold">Task Manager</h1>
        <TaskForm />

        <TaskList
          :tasks="taskStore.tasks"
          :isLoading="taskStore.isLoading"
          :error="taskStore.error"
        />
      </div>
    </div>
  </div>
</template>
