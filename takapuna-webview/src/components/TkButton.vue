<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  primary: Boolean,
  secondary: Boolean
})

const buttonClass = computed(() => {
  const button = {
    'w-full': true,
    'p-2': true,
    'text-center': true,
    'outline': true, 
    'outline-1': true, 
    'outline-transparent': true, 
    'outline-offset-2': true, 
    'bg-teal-200': true, 
    'text-teal-900': true,
    'hover:cursor-pointer': true,
    'hover:bg-teal-100': true,
    'focus:outline-teal-800': true
  }
  if (props.primary) {
    return button;
  }

  if (props.secondary) {
    return {
      'w-full': true,
      'p-2': true,
      'text-center': true,
      'outline': true, 
      'outline-1': true, 
      'outline-transparent': true, 
      'outline-offset-2': true, 
      'bg-slate-600': true, 
      'text-slate-200': true,
      'hover:cursor-pointer': true,
      'hover:bg-slate-500': true,
      'focus:outline-slate-800': true
    }
  }

  return { }
})

</script>

<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>
