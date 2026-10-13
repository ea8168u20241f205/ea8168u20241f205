<script setup>
/**
 * Display vehicle quantities and capacity for one section.
 * @summary Render a showroom collection card.
 * @author Candy Vizcarra
 */
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { totalVehicles, availableCapacity } from '../../domain/services/inventory-policy.js';
const props = defineProps({ section: { type: Object, required: true }, items: { type: Array, required: true } });
const { t, locale } = useI18n();
const total = computed(() => totalVehicles(props.items, props.section.id));
const capacity = computed(() => availableCapacity(props.section, props.items));
function number(value) { return new Intl.NumberFormat(locale.value).format(value); }
</script>
<template>
  <pv-card class="h-full shadow-1" :aria-label="section.name">
    <template #header><div class="p-4 pb-0"><div class="flex align-items-start justify-content-between gap-2"><div class="text-xl font-semibold">{{ section.name }}</div><pv-tag icon="pi pi-car" :value="section.vehicleCategory" severity="secondary" /></div></div></template>
    <template #content>
      <pv-data-table v-if="items.length" :value="items" :aria-label="t('collections.vehicles')">
        <pv-column field="vehicleName" :header="t('collections.vehicle-name')" />
        <pv-column field="quantity" :header="t('inventory.quantity')"><template #body="{ data }">{{ number(data.quantity) }}</template></pv-column>
      </pv-data-table>
      <pv-message v-else severity="secondary" :closable="false">{{ t('collections.no-vehicles') }}</pv-message>
    </template>
    <template #footer><pv-divider /><div class="flex justify-content-between gap-3" aria-live="polite">
      <div><div class="text-sm text-color-secondary">{{ t('collections.total-vehicles') }}</div><div class="text-2xl font-semibold mt-1">{{ number(total) }}</div></div>
      <div class="text-right"><div class="text-sm text-color-secondary">{{ t('collections.available-capacity') }}</div><div class="text-2xl font-semibold mt-1">{{ number(capacity) }}</div></div>
    </div></template>
  </pv-card>
</template>
