<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import type { Ref } from 'vue'
import TkButton from '@/components/TkButton.vue'
import TkInput from '@/components/TkInput.vue'

interface Snippet {
  text: string;
  anchor: string;
  active: string;
}

export default defineComponent({
  name: 'tk-sidebar',
  components: { TkButton, TkInput },
  setup() {
    const snippets: Ref<Snippet[]> = ref([]);
    onMounted(() => {
      window.addEventListener("message", (event) => {
        const message = event.data;

        switch (message.type) {
          case "new-snippet":
            snippets.value = [
              {
                text: message.value,
                anchor: message.anchor,
                active: message.active
              },
              ...snippets.value
            ]
            break;
        }
      })
    })

    return {
      snippets,
    }
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <tk-input placeholder="Title" />
    <tk-input placeholder="Description" />
    {{ snippets }}
    <tk-button primary>
      Create issue
    </tk-button>
    <tk-button secondary>
      Cancel
    </tk-button>
  </div>
</template>

