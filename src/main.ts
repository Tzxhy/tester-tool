
import TDesign from 'tdesign-vue-next';
import {
    createApp,
} from 'vue';

// import VueClipboard from 'vue3-clipboard';
// import PageContainer from '@/components/page-container/index.vue';
// import PageHeader from '@/components/page-header/index.vue';
import App from './replayer/index.vue';

const app = createApp(App);
app.use(TDesign);

app.mount('#app');
