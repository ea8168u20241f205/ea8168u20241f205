/**
 * Map showroom-section resources and responses.
 * @summary Map showroom-section resources and responses.
 * @author Candy Vizcarra
 */
import { ShowroomSection } from '../domain/model/showroom-section.entity.js';
/** Convert HTTP resources into domain entities. */
export class ShowroomSectionAssembler {
  static toEntityFromResource(resource) { return new ShowroomSection(resource); }
  static toEntitiesFromResponse(response) {
    if (!Array.isArray(response.data)) throw new Error('Invalid collection response');
    return response.data.map(resource => this.toEntityFromResource(resource));
  }
}
