<script setup lang="ts">
import { reactive } from 'vue'
import { useTaskStore } from '@/stores/task'
import { CreateTaskSchema, type CreateTask } from '@/types/task'
import AppButton from '@/components/ui/AppButton.vue'
import { z, type ZodError } from 'zod'

type FormFields = keyof CreateTask
type FormErrors = Record<FormFields, string>

const taskStore = useTaskStore()

const form = reactive<CreateTask>({
  title: '',
  description: ''
})

const errors = reactive<FormErrors>({
  title: '',
  description: ''
})

const resetForm = (): void => {
  form.title = ''
  form.description = ''
  errors.title = ''
  errors.description = ''
}

const handleSubmit = async (): Promise<void> => {
  try {
    const validatedData = CreateTaskSchema.parse(form)
    await taskStore.addTask(validatedData)
    resetForm()
    await taskStore.fetchTasks()
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      handleValidationErrors(err)
    } else {
      handleUnexpectedError(err)
    }
  }
}

const handleValidationErrors = (error: ZodError): void => {
  Object.keys(errors).forEach(key => {
    errors[key as FormFields] = ''
  })

  error.errors.forEach(({ path, message }) => {
    const field = path[0] as FormFields
    if (field in errors) {
      errors[field] = message
    }
  })
}

const handleUnexpectedError = (error: unknown): void => {
  console.error('Unexpected error:', error)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">
        Title *
      </label>
      <input
        id="title"
        v-model="form.title"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        :class="{ 'border-red-500': errors.title }"
      />
      <span
        v-if="errors.title"
        id="title-error"
        class="mt-1 text-sm text-red-600"
      >
        {{ errors.title }}
      </span>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        v-model="form.description"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        :class="{ 'border-red-500': errors.description }"
      />
      <span
        v-if="errors.description"
        id="description-error"
        class="mt-1 text-sm text-red-600"
      >
        {{ errors.description }}
      </span>
    </div>

    <AppButton
      type="submit"
      :loading="taskStore.isLoading"
      class="w-full justify-center"
    >
      Add Task
    </AppButton>
  </form>
</template>
