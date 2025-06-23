<script setup lang="ts">
type ButtonVariant = 'primary' | 'danger' | 'success'
type ButtonSize = 'sm' | 'base' | 'lg'
type ButtonType = 'button' | 'submit' | 'reset'

interface Props {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  type?: ButtonType
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'base',
  loading: false,
  type: 'button'
})

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300',
  danger: 'bg-red-500 hover:bg-red-600 focus:ring-red-300',
  success: 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  base: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}
</script>

<template>
  <button
    :type="props.type"
    :class="[
      'rounded text-white font-medium transition-colors focus:outline-none focus:ring-2',
      variantClasses[props.variant],
      sizeClasses[props.size],
      { 'opacity-75 cursor-not-allowed': props.loading }
    ]"
    :disabled="props.loading"
  >
    <slot />
  </button>
</template>
