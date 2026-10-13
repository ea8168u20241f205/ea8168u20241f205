<script setup>
/**
 * Explain unsupported navigation and provide a Home action.
 * @summary Render the unknown route view.
 * @author Candy Vizcarra
 */
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
const { t } = useI18n(); const route = useRoute(); const router = useRouter();
</script>
<template><pv-card :aria-label="t('not-found.title')"><template #title>{{ t('not-found.title') }}</template><template #content><pv-message severity="warn" :closable="false">{{ t('not-found.message', { path: route.fullPath }) }}</pv-message></template><template #footer><pv-button :label="t('actions.back-home')" icon="pi pi-home" @click="router.push({ name: 'home' })" /></template></pv-card></template>
