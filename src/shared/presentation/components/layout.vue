<script setup>
/**
 * Provide a responsive toolbar and persistent desktop sidebar.
 * @summary Compose the shared application layout.
 * @author Candy Vizcarra
 */
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import SidebarContent from './sidebar-content.vue';
const { t } = useI18n(); const drawerVisible = ref(false); const logoFailed = ref(false);
const logoUrl = computed(() => {
  const key = import.meta.env.VITE_LOGO_API_KEY;
  if (!key) return null;
  return `${import.meta.env.VITE_LOGO_API_URL}/${encodeURIComponent(import.meta.env.VITE_LOGO_DOMAIN)}?token=${encodeURIComponent(key)}&size=80`;
});
</script>
<template>
  <div class="min-h-screen surface-ground flex flex-column">
    <pv-toolbar class="border-noround shadow-1" :aria-label="t('navigation.toolbar')">
      <template #start><div class="flex align-items-center gap-3">
        <pv-button icon="pi pi-bars" text class="md:hidden" :aria-label="t('navigation.open-menu')" @click="drawerVisible = true" />
        <pv-image v-if="logoUrl && !logoFailed" :src="logoUrl" alt="Astara Retail Perú" width="40" @error="logoFailed = true" />
        <pv-tag v-else value="astara" severity="contrast" />
        <div class="text-lg md:text-xl font-semibold">Astara Showroom Management</div>
      </div></template>
    </pv-toolbar>
    <div class="flex flex-1">
      <div class="hidden md:flex flex-column w-18rem flex-shrink-0 surface-card border-right-1 surface-border" :aria-label="t('navigation.main')"><sidebar-content /></div>
      <div class="flex-1 min-w-0 p-3 md:p-5" role="main"><router-view /></div>
    </div>
    <pv-drawer v-model:visible="drawerVisible" :header="t('navigation.workspace')"><sidebar-content @navigate="drawerVisible = false" /></pv-drawer>
  </div>
</template>
