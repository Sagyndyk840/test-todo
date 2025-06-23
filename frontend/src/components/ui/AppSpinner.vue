<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'white' | 'gray'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary'
})

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-4',
  lg: 'h-12 w-12 border-[5px]'
}

const colorClasses = {
  primary: 'border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent',
  white: 'border-t-white border-r-white border-b-transparent border-l-transparent',
  gray: 'border-t-gray-400 border-r-gray-400 border-b-transparent border-l-transparent'
}
</script>

<template>
  <div
    role="status"
    aria-label="Loading"
    :class="[
      'inline-block animate-spin rounded-full',
      sizeClasses[props.size],
      colorClasses[props.color]
    ]"
  />
</template>
