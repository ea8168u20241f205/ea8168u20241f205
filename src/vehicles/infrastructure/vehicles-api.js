/**
 * Retrieve category-specific vehicles from DummyJSON.
 * @summary Retrieve category-specific vehicles from DummyJSON.
 * @author Candy Vizcarra
 */
import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';
/** External catalog gateway. */
export class VehiclesApi extends BaseApi {
  constructor() { super(import.meta.env.VITE_VEHICLES_API_URL); }
  /** Request the full catalog for the selected category. */
  getByCategory(category) {
    const endpoint = new BaseEndpoint(this, `${import.meta.env.VITE_VEHICLES_CATEGORY_PATH}/${encodeURIComponent(category)}`);
    return endpoint.getAll({ limit: 0 });
  }
}
