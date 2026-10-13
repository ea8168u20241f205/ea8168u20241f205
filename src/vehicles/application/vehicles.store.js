/**
 * Manage vehicle catalog state independently of showroom state.
 * @summary Manage vehicle catalog state independently of showroom state.
 * @author Candy Vizcarra
 */
import { defineStore } from 'pinia';
import { shallowRef, ref } from 'vue';
import { VehiclesApi } from '../infrastructure/vehicles-api.js';
import { VehicleAssembler } from '../infrastructure/vehicle.assembler.js';
const api = new VehiclesApi();
/** Manage catalog loading and ignore obsolete section requests. */
export const useVehiclesStore = defineStore('vehicles', () => {
  const vehicles = shallowRef([]); const loading = ref(false); const error = ref('');
  let requestVersion = 0;
  function reset() { requestVersion++; vehicles.value = []; loading.value = false; error.value = ''; }
  async function fetchByCategory(category) {
    const version = ++requestVersion;
    vehicles.value = []; error.value = ''; loading.value = true;
    try {
      const response = await api.getByCategory(category);
      if (version === requestVersion) vehicles.value = VehicleAssembler.toEntitiesFromResponse(response).filter(vehicle => vehicle.category === category);
    } catch { if (version === requestVersion) error.value = 'errors.catalog-load'; }
    finally { if (version === requestVersion) loading.value = false; }
  }
  return { vehicles, loading, error, fetchByCategory, reset };
});
