<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import type { Ref } from 'vue';
import TkButton from '@/components/TkButton.vue';
import TkInput from '@/components/TkInput.vue';
import TkCodeListItem from './TkCodeListItem.vue';
import type { WebviewApi } from 'vscode-webview';

declare function acquireVsCodeApi(): WebviewApi<unknown>;

interface Snippet {
  fileName: string;
  text: string;
  anchor: number;
  active: number;
}

export default defineComponent({
  name: 'tk-sidebar',
  components: { TkButton, TkInput, TkCodeListItem },
  setup() {
    const snippets: Ref<Snippet[]> = ref([]);

    const processIncomingSnippet = (event: MessageEvent) => {
      const message = event.data;

      switch (message.type) {
        case 'post-snippet':
          snippets.value = [
            {
              fileName: message.fileName,
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
      window.addEventListener('message', processIncomingSnippet, false);
      const vscode = acquireVsCodeApi();
      vscode.postMessage({
        type: 'request-snippet',
      });
    });

    onBeforeUnmount(() => {
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
    <template v-for="snippet in snippets">
      <tk-code-list-item 
        :anchor="snippet.anchor"
        :active="snippet.active"
        :file-name="snippet.fileName"
        :code="snippet.text"
      />
    </template>
    <tk-button primary>
      Create issue
    </tk-button>
    <tk-button secondary>
      Cancel
    </tk-button>
  </div>
</template>

