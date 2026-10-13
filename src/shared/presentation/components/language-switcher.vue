<script setup>
/**
 * Switch all interface translations and document language.
 * @summary Offer English and Spanish choices.
 * @author Candy Vizcarra
 */
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { usePrimeVue } from 'primevue/config';
const { locale, t } = useI18n();
const route = useRoute();
const primevue = usePrimeVue();
const englishLocale = { ...primevue.config.locale, aria: { ...primevue.config.locale.aria } };
const spanishLocale = { ...englishLocale, emptyMessage: 'No hay opciones disponibles', emptyFilterMessage: 'No se encontraron resultados', searchMessage: 'Hay {0} resultados disponibles', selectionMessage: '{0} elementos seleccionados', emptySelectionMessage: 'Ningún elemento seleccionado', emptySearchMessage: 'No se encontraron resultados', aria: { ...englishLocale.aria, close: 'Cerrar', navigation: 'Navegación', listLabel: 'Lista de opciones', selectRow: 'Fila seleccionada', unselectRow: 'Fila no seleccionada' } };
const options = [{ label: 'EN', value: 'en' }, { label: 'ES', value: 'es' }];
watch(locale, value => { primevue.config.locale = value === 'es' ? spanishLocale : englishLocale; document.documentElement.lang = value; document.title = `${t(route.meta.titleKey || 'home.title')} | Astara`; }, { immediate: true });
</script>
<template><pv-select-button v-model="locale" :options="options" option-label="label" option-value="value" :allow-empty="false" :aria-label="t('navigation.language')" /></template>
