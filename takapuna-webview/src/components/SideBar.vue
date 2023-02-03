<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, ref, computed } from 'vue';
import type { Ref } from 'vue';
import TkButton from '@/components/TkButton.vue';
import TkInput from '@/components/TkInput.vue';
import TkTextArea from './TkTextArea.vue';
import TkCodeListItem from './TkCodeListItem.vue';
import type { WebviewApi } from 'vscode-webview';
import type { Snippet } from '../../../src/snippet.interface';

declare function acquireVsCodeApi(): WebviewApi<unknown>;

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
        case 'ok:snippets':
          snippets.value = message.value;
          break;
        case 'ok:issue-create':
          clearIssue();
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
      console.log('POST MESSAGE');
      vscode.postMessage({
        type: 'issue-create',
        title: title.value,
        body: body.value,
        snippets: JSON.parse(JSON.stringify(snippets.value)),
      });
      console.log('OK: POST MESSAGE');
    }

    function clearIssue() {
      vscode.postMessage({
        type: 'issue-clear',
      });

      title.value = '';
      body.value = '';
      snippets.value = [];
    }

    return {
      snippets,
      title,
      body,
      createIssue,
      clearIssue,
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
    <tk-button secondary
      @click="clearIssue"
    >
      Cancel
    </tk-button>
  </div>
</template>

