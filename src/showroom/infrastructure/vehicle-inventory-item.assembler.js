/**
 * Map vehicle-inventory-item resources and responses.
 * @summary Map vehicle-inventory-item resources and responses.
 * @author Candy Vizcarra
 */
import { VehicleInventoryItem } from '../domain/model/vehicle-inventory-item.entity.js';
/** Convert HTTP resources into domain entities. */
export class VehicleInventoryItemAssembler {
  static toEntityFromResource(resource) { return new VehicleInventoryItem(resource); }
  static toEntitiesFromResponse(response) {
    if (!Array.isArray(response.data)) throw new Error('Invalid collection response');
    return response.data.map(resource => this.toEntityFromResource(resource));
  }
  /** Serialize a creation request, deliberately excluding the generated ID. */
  static toResourceFromEntity(entity) {
    return { sectionId: entity.sectionId, vehicleCategoryId: entity.vehicleCategoryId, vehicleId: entity.vehicleId, vehicleName: entity.vehicleName, quantity: entity.quantity, registeredAt: entity.registeredAt };
  }
}
