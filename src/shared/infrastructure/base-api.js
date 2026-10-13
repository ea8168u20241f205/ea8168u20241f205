/**
 * Provide a reusable Axios client with request timeout.
 * @summary Provide a reusable Axios client with request timeout.
 * @author Candy Vizcarra
 */
import axios from 'axios';
/** Base HTTP client for one API provider. */
export class BaseApi {
  #http;
  /** @param {string} baseURL API provider URL. */
  constructor(baseURL) { this.#http = axios.create({ baseURL, timeout: 15000, headers: { 'Content-Type': 'application/json' } }); }
  /** @returns {import('axios').AxiosInstance} Configured HTTP client. */
  get http() { return this.#http; }
}
