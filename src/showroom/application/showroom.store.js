/**
 * Manage showroom collections and capacity-aware inventory creation.
 * @summary Manage showroom collections and capacity-aware inventory creation.
 * @author Candy Vizcarra
 */
import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { ShowroomApi } from '../infrastructure/showroom-api.js';
import { ShowroomSectionAssembler } from '../infrastructure/showroom-section.assembler.js';
import { VehicleInventoryItemAssembler } from '../infrastructure/vehicle-inventory-item.assembler.js';
import { VehicleInventoryItem } from '../domain/model/vehicle-inventory-item.entity.js';
import { availableCapacity, totalVehicles, validateQuantity } from '../domain/services/inventory-policy.js';
const api = new ShowroomApi();
/** Coordinate inventory retrieval and validated registration. */
export const useShowroomStore = defineStore('showroom', () => {
  const sections = shallowRef([]); const items = shallowRef([]);
  const loading = ref(false); const saving = ref(false); const error = ref(''); const loaded = ref(false);
  /** Refresh both collections atomically in local state. */
  async function refresh() {
    const [sectionResponse, itemResponse] = await Promise.all([api.getSections(), api.getInventoryItems()]);
    const newSections = ShowroomSectionAssembler.toEntitiesFromResponse(sectionResponse);
    const newItems = VehicleInventoryItemAssembler.toEntitiesFromResponse(itemResponse);
    sections.value = newSections; items.value = newItems; loaded.value = true;
  }
  async function load() {
    loading.value = true; error.value = '';
    try { await refresh(); } catch { error.value = 'errors.showroom-load'; }
    finally { loading.value = false; }
  }
  function getItems(sectionId) { return items.value.filter(item => String(item.sectionId) === String(sectionId)); }
  function getTotal(sectionId) { return totalVehicles(items.value, sectionId); }
  function getAvailable(section) { return availableCapacity(section, items.value); }
  /** Recheck current capacity before posting; return false instead of navigating on failure. */
  async function createItem({ sectionId, vehicle, quantity }) {
    if (saving.value) return false;
    saving.value = true; error.value = '';
    try {
      await refresh();
      const section = sections.value.find(section => String(section.id) === String(sectionId));
      if (!section) { error.value = 'errors.section-required'; return false; }
      if (!vehicle || vehicle.category !== section.vehicleCategory) { error.value = 'errors.vehicle-required'; return false; }
      const validation = validateQuantity(quantity, getAvailable(section));
      if (validation) { error.value = validation; return false; }
      const item = new VehicleInventoryItem({ sectionId: section.id, vehicleCategoryId: section.vehicleCategory, vehicleId: vehicle.id, vehicleName: vehicle.name, quantity, registeredAt: new Date().toISOString() });
      const response = await api.createInventoryItem(VehicleInventoryItemAssembler.toResourceFromEntity(item));
      items.value = [...items.value, VehicleInventoryItemAssembler.toEntityFromResource(response.data)];
      return true;
    } catch { error.value = 'errors.inventory-save'; return false; }
    finally { saving.value = false; }
  }
  return { sections, items, loading, saving, error, loaded, load, getItems, getTotal, getAvailable, createItem };
});
