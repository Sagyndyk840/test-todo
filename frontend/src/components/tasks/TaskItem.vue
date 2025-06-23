<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import AppButton from '@/components/ui/AppButton.vue'
import type { Task } from '@/types/task'

const props = defineProps<{
  task: Task
}>()

const taskStore = useTaskStore()

const statusClasses = computed(() => ({
  'line-through text-gray-400': props.task.done,
  'text-gray-800': !props.task.done
}))

const toggleStatus = async (): Promise<void> => {
  await taskStore.updateTaskStatus(props.task.id, !props.task.done)
}

const handleDelete = async (): Promise<void> => {
  if (confirm('Are you sure you want to delete this task?')) {
    await taskStore.deleteTask(props.task.id)
  }
}
</script>

<template>
  <div class="flex items-center justify-between rounded-lg border p-4">
    <div>
      <h3 class="font-medium" :class="statusClasses">{{ task.title }}</h3>
      <p class="text-sm text-gray-600">{{ task.description }}</p>
    </div>

    <div class="flex items-center space-x-2">
      <input
        type="checkbox"
        :checked="task.done"
        @change="toggleStatus"
        class="h-5 w-5 rounded"
      />

      <AppButton
        variant="danger"
        size="sm"
        @click="handleDelete"
        :loading="taskStore.isLoading"
      >
        Delete
      </AppButton>
    </div>
  </div>
</template>
