/**
 * Declare semantic child routes for the showroom context.
 * @summary Declare semantic child routes for the showroom context.
 * @author Candy Vizcarra
 */
export default [{ path: 'items/new', name: 'new-vehicle-inventory-item', component: () => import('./views/new-vehicle-inventory-item.vue'), meta: { titleKey: 'inventory.title' } }];
