/**
 * Represent an inventory registration.
 * @summary Represent an inventory registration.
 * @author Candy Vizcarra
 */
/** A registered vehicle quantity assigned to a showroom section. */
export class VehicleInventoryItem {
  #id; #sectionId; #vehicleCategoryId; #vehicleId; #vehicleName; #quantity; #registeredAt;
  constructor({ id = null, sectionId, vehicleCategoryId, vehicleId, vehicleName, quantity, registeredAt }) {
    this.#id = id; this.#sectionId = sectionId; this.#vehicleCategoryId = vehicleCategoryId;
    this.#vehicleId = vehicleId; this.#vehicleName = vehicleName; this.#quantity = Number(quantity); this.#registeredAt = registeredAt;
  }
  get id() { return this.#id; }
  get sectionId() { return this.#sectionId; }
  get vehicleCategoryId() { return this.#vehicleCategoryId; }
  get vehicleId() { return this.#vehicleId; }
  get vehicleName() { return this.#vehicleName; }
  get quantity() { return this.#quantity; }
  get registeredAt() { return this.#registeredAt; }
}
