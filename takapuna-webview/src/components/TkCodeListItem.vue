<script lang="ts">
import { defineComponent, computed } from 'vue';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';

export default defineComponent({
  name: 'tk-code-list-item',
  components: {
    highlightjs: hljsVuePlugin.component,
  },
  props: {
    code: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    anchor: {
      type: Number,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const anchorLine = computed(() => {
      return props.anchor + 1;
    });

    const activeLine = computed(() => {
      return props.active + 1;
    });

    return {
      anchorLine,
      activeLine,
    };
  },
});
</script>

<template>
  <div 
    class="
      bg-gray-700
      rounded-sm
    "
  >
    <div
      class="
        p-2
        flex
        flex-col
        gap-0.5
        font-mono
        text-[12px]
        line-height-[16px]
        text-gray-400
      "
    >
      <span>{{ fileName }}</span>
      <span>Lines {{ anchorLine }} to {{ activeLine }}</span>
    </div>
    <highlightjs
      class="code-block"
      language="javascript"
      :code="code"
    />
  </div>
</template>

<style scoped>
  .code-block:deep(code) {
    background-color: #1f2937;
  }
</style>
