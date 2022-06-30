<script>
import { defineComponent } from 'vue'
import TkButton from '@/components/TkButton.vue'

export default defineComponent({
  name: 'tk-sidebar',
  components: { TkButton }
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <label class="pt-12">
      Title
      <input class="pt-12">
    </label>
    <label>
      Description
      <input>
    </label>
    <tk-button primary>
      Create issue
    </tk-button>
    <tk-button secondary>
      Cancel
    </tk-button>
  </div>
</template>

