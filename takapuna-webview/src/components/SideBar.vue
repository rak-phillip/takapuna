<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, ref, computed } from 'vue';
import type { Ref } from 'vue';
import TkButton from '@/components/TkButton.vue';
import TkInput from '@/components/TkInput.vue';
import TkTextArea from './TkTextArea.vue';
import TkCodeListItem from './TkCodeListItem.vue';
import type { WebviewApi } from 'vscode-webview';

declare function acquireVsCodeApi(): WebviewApi<unknown>;

interface Snippet {
  id: number,
  fileName: string;
  relativePath: string;
  text: string;
  anchor: number;
  active: number;
}

const vscode = acquireVsCodeApi();

export default defineComponent({
  name: 'tk-sidebar',
  components: { TkButton, TkInput, TkTextArea, TkCodeListItem },
  setup() {
    const snippets: Ref<Snippet[]> = ref([]);
    const title = ref('');
    const body = ref('');
    const isCreateDisabled = computed(() => {
      return !title.value || !body.value;
    });

    const processIncomingSnippet = (event: MessageEvent) => {
      const message = event.data;

      switch (message.type) {
        case 'post-snippet':
          snippets.value = [
            {
              id: message.id,
              fileName: message.fileName,
              relativePath: message.relativePath,
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
      vscode.postMessage({
        type: 'request-snippet',
      });
    });

    onBeforeUnmount(() => {
      window.removeEventListener('message', processIncomingSnippet, false);
    });

    function createIssue() {
      vscode.postMessage({
        type: 'issue-create',
        title: title.value,
        body: body.value,
        relativePath: snippets.value[0].relativePath,
        anchor: snippets.value[0].anchor + 1,
        active: snippets.value[0].active + 1,
      });
    }

    return {
      snippets,
      title,
      body,
      createIssue,
      isCreateDisabled,
    };
  },
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <tk-input 
      placeholder="Title" 
      v-model="title"
    />
    <tk-text-area
      placeholder="Description" 
      v-model="body"
    />
    <template 
      v-for="snippet in snippets"
      :key="snippet.id"
    >
      <tk-code-list-item 
        :anchor="snippet.anchor"
        :active="snippet.active"
        :file-name="snippet.relativePath"
        :code="snippet.text"
      />
    </template>
    <tk-button 
      primary
      :disabled="isCreateDisabled"
      @click="createIssue"
    >
      Create issue
    </tk-button>
    <tk-button secondary>
      Cancel
    </tk-button>
  </div>
</template>

