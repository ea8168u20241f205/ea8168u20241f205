/**
 * Represent a vehicle from DummyJSON.
 * @summary Represent a vehicle from DummyJSON.
 * @author Candy Vizcarra
 */
/** Vehicle supplied by the external products catalog. */
export class Vehicle {
  #id; #name; #category;
  constructor({ id, name, category }) { this.#id = id; this.#name = name; this.#category = category; }
  get id() { return this.#id; }
  get name() { return this.#name; }
  get category() { return this.#category; }
}
