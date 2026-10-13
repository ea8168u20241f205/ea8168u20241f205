/**
 * Encapsulate HTTP resource operations.
 * @summary Encapsulate HTTP resource operations.
 * @author Candy Vizcarra
 */
/** Reusable resource endpoint. */
export class BaseEndpoint {
  constructor(api, path) { this.http = api.http; this.path = path; }
  /** Retrieve all resources with optional query parameters. */
  getAll(params = {}) { return this.http.get(this.path, { params }); }
  /** Persist a resource and let the server generate its ID. */
  create(resource) { return this.http.post(this.path, resource); }
}
