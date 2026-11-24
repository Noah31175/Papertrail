import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import ClientListView from '../views/ClientListView.vue'
import ClientFormView from '../views/ClientFormView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
  },
  {
    path: '/clients',
    name: 'clients',
    component: ClientListView,
  },
  {
    path: '/clients/new',
    name: 'add-client',
    component: ClientFormView,
  },
  {
    path: '/clients/:id/edit',
    name: 'edit-client',
    component: ClientFormView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
