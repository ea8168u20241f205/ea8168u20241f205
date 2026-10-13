/**
 * Access showroom sections and inventory resources.
 * @summary Access showroom sections and inventory resources.
 * @author Candy Vizcarra
 */
import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';
/** Local JSON Server gateway. */
export class ShowroomApi extends BaseApi {
  #sections; #items;
  constructor() {
    super(import.meta.env.VITE_SHOWROOM_API_URL);
    this.#sections = new BaseEndpoint(this, import.meta.env.VITE_SHOWROOM_SECTIONS_PATH);
    this.#items = new BaseEndpoint(this, import.meta.env.VITE_VEHICLE_INVENTORY_ITEMS_PATH);
  }
  getSections() { return this.#sections.getAll(); }
  getInventoryItems() { return this.#items.getAll(); }
  createInventoryItem(resource) { return this.#items.create(resource); }
}
