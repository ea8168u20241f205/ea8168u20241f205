<script setup>
/**
 * Register an external catalog vehicle in a selected showroom section.
 * @summary Render the capacity-aware inventory creation route.
 * @author Candy Vizcarra
 */
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useShowroomStore } from '../../application/showroom.store.js';
import { useVehiclesStore } from '../../../vehicles/application/vehicles.store.js';
import { validateQuantity } from '../../domain/services/inventory-policy.js';
const { t, locale } = useI18n(); const router = useRouter();
const showroom = useShowroomStore(); const catalog = useVehiclesStore();
const sectionId = ref(null); const vehicleId = ref(null); const quantity = ref(1); const validationError = ref('');
const section = computed(() => showroom.sections.find(value => value.id === sectionId.value));
const vehicle = computed(() => catalog.vehicles.find(value => value.id === vehicleId.value));
const sectionOptions = computed(() => showroom.sections.map(value => ({ id: value.id, name: value.name })));
const vehicleOptions = computed(() => catalog.vehicles.map(value => ({ id: value.id, name: value.name })));
const capacity = computed(() => section.value ? showroom.getAvailable(section.value) : 0);
const canCreate = computed(() => !!section.value && !!vehicle.value && !validateQuantity(quantity.value, capacity.value) && !catalog.loading && !showroom.loading && !showroom.saving && !catalog.error && !showroom.error);
watch(sectionId, () => { vehicleId.value = null; validationError.value = ''; catalog.reset(); if (section.value) catalog.fetchByCategory(section.value.vehicleCategory); });
watch([vehicleId, quantity], () => { validationError.value = ''; });
onMounted(() => { catalog.reset(); showroom.load(); });
onUnmounted(() => catalog.reset());
/** Only navigate after a confirmed successful creation. */
async function create() {
  if (showroom.saving || showroom.loading || catalog.loading) return;
  if (!section.value) { validationError.value = 'errors.section-required'; return; }
  if (!vehicle.value) { validationError.value = 'errors.vehicle-required'; return; }
  const error = validateQuantity(quantity.value, capacity.value);
  if (error) { validationError.value = error; return; }
  if (await showroom.createItem({ sectionId: sectionId.value, vehicle: vehicle.value, quantity: quantity.value })) router.push({ name: 'home' });
}
function cancel() { router.push({ name: 'home' }); }
</script>
<template>
  <div :aria-label="t('inventory.title')">
    <div class="text-3xl font-semibold mb-2" role="heading" aria-level="1">{{ t('inventory.title') }}</div>
    <div class="text-color-secondary mb-5">{{ t('inventory.subtitle') }}</div>
    <pv-message v-if="showroom.error" severity="error" :closable="false" role="alert" class="mb-3">{{ t(showroom.error) }}<pv-button :label="t('actions.retry')" text :disabled="showroom.loading || showroom.saving" @click="showroom.load()" /></pv-message>
    <pv-form :aria-label="t('inventory.title')" @submit="create">
    <pv-card class="shadow-1">
      <template #content><div class="grid">
        <div class="col-12 md:col-8">
          <div class="field"><label for="section" class="font-semibold">{{ t('inventory.section') }}</label><pv-select input-id="section" v-model="sectionId" :options="sectionOptions" option-label="name" option-value="id" :placeholder="t('inventory.select-section')" class="w-full" :loading="showroom.loading" :disabled="showroom.loading || showroom.saving" :aria-label="t('inventory.section')" aria-required="true" /></div>
          <div class="field"><label for="vehicle" class="font-semibold">{{ t('inventory.vehicle') }}</label><pv-select input-id="vehicle" v-model="vehicleId" :options="vehicleOptions" option-label="name" option-value="id" :placeholder="t('inventory.select-vehicle')" :empty-message="t('inventory.no-vehicles')" class="w-full" :loading="catalog.loading" :disabled="!section || catalog.loading || showroom.saving || !!catalog.error" :aria-label="t('inventory.vehicle')" aria-required="true" /></div>
          <pv-message v-if="catalog.error" severity="error" :closable="false" role="alert" class="mb-3">{{ t(catalog.error) }}<pv-button :label="t('actions.retry')" text @click="catalog.fetchByCategory(section.vehicleCategory)" /></pv-message>
          <pv-message v-else-if="section && !catalog.loading && !catalog.vehicles.length" severity="warn" :closable="false" class="mb-3">{{ t('inventory.no-vehicles') }}</pv-message>
          <div class="field"><label for="quantity" class="font-semibold">{{ t('inventory.quantity') }}</label><pv-input-number input-id="quantity" v-model="quantity" :min="1" :max="capacity > 0 ? capacity : 1" :max-fraction-digits="0" :use-grouping="false" show-buttons class="w-full" :disabled="!section || capacity < 1 || showroom.saving" :aria-label="t('inventory.quantity')" aria-required="true" /></div>
          <pv-message v-if="validationError" severity="error" :closable="false" role="alert">{{ t(validationError) }}</pv-message>
          <pv-message v-if="section && capacity < 1" severity="warn" :closable="false">{{ t('inventory.section-full') }}</pv-message>
        </div>
        <div class="col-12 md:col-4"><pv-card class="surface-100"><template #title>{{ t('inventory.section-details') }}</template><template #content><div class="text-color-secondary mb-2">{{ t('inventory.category') }}</div><pv-tag :value="section?.vehicleCategory || '—'" severity="secondary" /><pv-divider /><div class="text-color-secondary">{{ t('collections.available-capacity') }}</div><div class="text-4xl font-semibold mt-2" aria-live="polite">{{ section ? new Intl.NumberFormat(locale).format(capacity) : '—' }}</div><div class="text-sm text-color-secondary mt-3">{{ t('inventory.automatic-data') }}</div></template></pv-card></div>
      </div></template>
      <template #footer><div class="flex gap-2"><pv-button :label="t('actions.create')" type="submit" icon="pi pi-check" :loading="showroom.saving" :disabled="!canCreate" /><pv-button :label="t('actions.cancel')" severity="secondary" outlined :disabled="showroom.saving" @click="cancel" /></div></template>
    </pv-card>
    </pv-form>
  </div>
</template>
