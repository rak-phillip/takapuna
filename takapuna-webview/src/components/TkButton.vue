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
    'bg-tk-button-background': true, 
    'text-tk-button-foreground': true,
    'hover:cursor-pointer': true,
    'hover:bg-tk-button-hoverBackground': true,
    'focus:outline-tk-focusBorder': true
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
      'bg-tk-button-secondaryBackground': true, 
      'text-tk-button-secondaryForeground': true,
      'hover:cursor-pointer': true,
      'hover:bg-tk-button-secondaryHoverBackground': true,
      'focus:outline-tk-focusBorder': true
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
