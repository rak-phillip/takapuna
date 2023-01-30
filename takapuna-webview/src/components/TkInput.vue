<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <label>
    <slot name="label"></slot>
    <input 
      v-bind="$attrs"
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
  </label>
</template>
