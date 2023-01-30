<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue';
import type { Ref } from 'vue';
import TkButton from '@/components/TkButton.vue';
import TkInput from '@/components/TkInput.vue';

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

    const processIncomingSnippet = (event: MessageEvent) => {
      const message = event.data;

      switch (message.type) {
        case 'new-snippet':
          snippets.value = [
            {
              text: message.value,
              anchor: message.anchor,
              active: message.active,
            },
            ...snippets.value,
          ];
          break;
      }
    };

    onBeforeMount(() => {
      console.log('ADD EVENT LISTENER');
      window.addEventListener('message', processIncomingSnippet, false);
      const vscode = acquireVsCodeApi();
      vscode.postMessage({
        type: 'request-snippet',
      });
    });

    onBeforeUnmount(() => {
      console.log('REMOVE EVENT LISTENER');
      window.removeEventListener('message', processIncomingSnippet, false);
    });

    return {
      snippets,
    };
  },
});
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

