/**
 * Represent a showroom section.
 * @summary Represent a showroom section.
 * @author Candy Vizcarra
 */
/** A section with a category and a fixed vehicle capacity. */
export class ShowroomSection {
  #id; #name; #vehicleCategory; #maxCapacity;
  constructor({ id, name, vehicleCategory, maxCapacity }) {
    this.#id = id; this.#name = name; this.#vehicleCategory = vehicleCategory; this.#maxCapacity = Number(maxCapacity);
  }
  get id() { return this.#id; }
  get name() { return this.#name; }
  get vehicleCategory() { return this.#vehicleCategory; }
  get maxCapacity() { return this.#maxCapacity; }
}
