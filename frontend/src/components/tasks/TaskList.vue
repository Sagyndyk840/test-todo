<script setup lang="ts">
import AppError from '@/components/ui/AppError.vue'
import AppSpinner from '@/components/ui/AppSpinner.vue'
import TaskItem from '@/components/tasks/TaskItem.vue'
import type { Task } from '@/types/task'

interface Props {
  tasks: Task[]
  isLoading?: boolean
  error?: string | null
}

const props = defineProps<Props>()
</script>

<template>
  <div class="space-y-3">
    <AppSpinner v-if="isLoading" />
    <AppError v-else-if="error" :message="error" />
    <template v-else>
      <div v-if="!props.tasks.length" class="text-center text-gray-500">
        No tasks found. Add your first task!
      </div>
      <TaskItem
        v-for="task in props.tasks"
        :key="task.id"
        :task="task"
      />
    </template>
  </div>
</template>
