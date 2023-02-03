<script lang="ts">
export default {
  inheritAttrs: false,
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
};
</script>

<template>
  <label>
    <slot name="label"></slot>
    <textarea
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)"
      class="
        block
        w-full
        border-none
        py-input-padding-vertical
        px-input-padding-horizontal
        text-tk-input-foreground
        outline-tk-input-border
        bg-tk-input-background
        placeholder:text-tk-input-placeholderForeground
      "
    >
    </textarea>
  </label>
</template>

