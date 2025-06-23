<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
</script>

<template>
  <div
    role="alert"
    class="rounded bg-red-100 p-4 text-red-700 border border-red-200"
  >
    {{ message }}
  </div>
</template>
