<script lang="ts">
import { defineComponent, defineProps } from 'vue';
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

export default defineComponent({
  name: 'tk-code-list-item',
  components: {
    highlightjs: hljsVuePlugin.component,
  },
  props: {
    code: {
      type: String,
      required: true,
    }

  },
  setup() {
  },
});
</script>

<template>
  <highlightjs
    language="js"
    :code="code"
  />
</template>
