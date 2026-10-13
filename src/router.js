/**
 * Configure Home, showroom child routes and unknown routes.
 * @summary Configure Home, showroom child routes and unknown routes.
 * @author Candy Vizcarra
 */
import { createRouter, createWebHistory } from 'vue-router';
import showroomRoutes from './showroom/presentation/showroom-routes.js';
import i18n from './i18n.js';
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes: [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: () => import('./shared/presentation/views/home.vue'), meta: { titleKey: 'home.title' } },
  { path: '/vehicle', children: showroomRoutes },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./shared/presentation/views/page-not-found.vue'), meta: { titleKey: 'not-found.title' } }
], scrollBehavior: () => ({ top: 0 }) });
router.afterEach(to => { document.title = `${i18n.global.t(to.meta.titleKey)} | Astara`; });
export default router;
