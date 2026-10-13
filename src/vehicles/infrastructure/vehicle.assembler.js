/**
 * Translate DummyJSON resources into vehicles.
 * @summary Translate DummyJSON resources into vehicles.
 * @author Candy Vizcarra
 */
import { Vehicle } from '../domain/model/vehicle.entity.js';
/** Map the external title field to the internal vehicle name. */
export class VehicleAssembler {
  static toEntityFromResource(resource) { return new Vehicle({ id: resource.id, name: resource.title, category: resource.category }); }
  static toEntitiesFromResponse(response) {
    if (!Array.isArray(response.data.products)) throw new Error('Invalid catalog response');
    return response.data.products.map(resource => this.toEntityFromResource(resource));
  }
}
