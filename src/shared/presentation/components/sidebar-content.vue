<script setup>
/**
 * Present navigation and the language switcher.
 * @summary Render sidebar controls.
 * @author Candy Vizcarra
 */
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import LanguageSwitcher from './language-switcher.vue';
const emit = defineEmits(['navigate']);
const { t } = useI18n(); const router = useRouter(); const route = useRoute();
function navigate(name) { router.push({ name }); emit('navigate'); }
</script>
<template>
  <div class="flex flex-column h-full p-3 gap-3" role="navigation" :aria-label="t('navigation.main')">
    <div class="text-sm font-semibold text-color-secondary uppercase px-2">{{ t('navigation.workspace') }}</div>
    <pv-button :label="t('home.title')" icon="pi pi-home" :text="route.name !== 'home'" :aria-current="route.name === 'home' ? 'page' : undefined" class="w-full justify-content-start" @click="navigate('home')" />
    <pv-button :label="t('inventory.title')" icon="pi pi-plus-circle" :text="route.name !== 'new-vehicle-inventory-item'" :aria-current="route.name === 'new-vehicle-inventory-item' ? 'page' : undefined" class="w-full justify-content-start" @click="navigate('new-vehicle-inventory-item')" />
    <div class="mt-auto"><pv-divider /><div class="text-sm text-color-secondary mb-2">{{ t('navigation.language') }}</div><language-switcher /></div>
  </div>
</template>
