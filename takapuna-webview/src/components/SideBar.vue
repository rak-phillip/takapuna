<script lang="ts">
import { defineComponent } from 'vue'
import TkButton from '@/components/TkButton.vue'
import TkInput from '@/components/TkInput.vue'

export default defineComponent({
  name: 'tk-sidebar',
  components: { TkButton, TkInput }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <tk-input placeholder="Title" />
    <tk-input placeholder="Description" />
    <tk-button primary>
      Create issue
    </tk-button>
    <tk-button secondary>
      Cancel
    </tk-button>
  </div>
</template>

