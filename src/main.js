/**
 * Install the Material UI preset and application plugins.
 * @summary Install the Material UI preset and application plugins.
 * @author Candy Vizcarra
 */
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import { Form } from '@primevue/forms';
import Material from '@primeuix/themes/material';
import { Toolbar, Button, Card, Select, SelectButton, InputNumber, Message, ProgressSpinner, DataTable, Column, Divider, Drawer, Image, Tag } from 'primevue';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './style.css';
import App from './app.vue';
import router from './router.js';
import pinia from './pinia.js';
import i18n from './i18n.js';
const app = createApp(App);
app.use(pinia).use(router).use(i18n).use(PrimeVue, { theme: { preset: Material, options: { darkModeSelector: false } }, ripple: true });
const components = { 'pv-form': Form, 'pv-toolbar': Toolbar, 'pv-button': Button, 'pv-card': Card, 'pv-select': Select, 'pv-select-button': SelectButton, 'pv-input-number': InputNumber, 'pv-message': Message, 'pv-progress-spinner': ProgressSpinner, 'pv-data-table': DataTable, 'pv-column': Column, 'pv-divider': Divider, 'pv-drawer': Drawer, 'pv-image': Image, 'pv-tag': Tag };
Object.entries(components).forEach(([name, component]) => app.component(name, component));
app.mount('#app');
