import { createApp } from 'vue';
import SideBarVue from '@/components/SideBar.vue';
import '@/assets/index.css';
import 'highlight.js/styles/nord.css';
import 'highlight.js/lib/common';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

createApp(SideBarVue)
  .use(hljsVuePlugin)
  .mount('#app');
