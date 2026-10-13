<script setup>
/**
 * Retrieve showroom sections and their inventory collections.
 * @summary Render the Home route.
 * @author Candy Vizcarra
 */
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useShowroomStore } from '../../../showroom/application/showroom.store.js';
import ShowroomSectionSummary from '../../../showroom/presentation/components/showroom-section-summary.vue';
const { t } = useI18n(); const store = useShowroomStore();
onMounted(() => store.load());
</script>
<template>
  <div :aria-label="t('home.title')">
    <div class="text-3xl font-semibold mb-2" role="heading" aria-level="1">{{ t('home.title') }}</div>
    <div class="text-color-secondary mb-5">{{ t('home.subtitle') }}</div>
    <div class="flex align-items-center justify-content-between flex-wrap gap-2 mb-4"><div class="text-xl font-semibold" role="heading" aria-level="2">{{ t('collections.title') }}</div><pv-button :label="t('inventory.title')" icon="pi pi-plus" @click="$router.push({ name: 'new-vehicle-inventory-item' })" /></div>
    <pv-message v-if="store.error" severity="error" :closable="false" role="alert" class="mb-3">{{ t(store.error) }}<pv-button :label="t('actions.retry')" text :disabled="store.loading" @click="store.load()" /></pv-message>
    <div v-if="store.loading" class="flex justify-content-center p-5" role="status"><pv-progress-spinner :aria-label="t('status.loading')" /></div>
    <div v-else-if="store.loaded" class="grid" :aria-label="t('collections.title')">
      <div v-for="section in store.sections" :key="section.id" class="col-12 lg:col-6"><showroom-section-summary :section="section" :items="store.getItems(section.id)" /></div>
      <pv-message v-if="!store.sections.length" severity="secondary" :closable="false">{{ t('collections.no-sections') }}</pv-message>
    </div>
  </div>
</template>
