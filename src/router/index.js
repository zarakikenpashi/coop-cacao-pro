import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/modules/auth/pages/LoginPage.vue'),
    },
    {
      path: '/mot-passe-oublie',
      name: 'PasswordReset',
      component: () => import('@/modules/auth/pages/PasswordResetPage.vue'),
    },
    {
      path: '/app',
      component: AppLayout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/modules/dashboard/pages/DashboardPage.vue'),
        },

        {
          path: 'achats/new',
          name: 'AchatCreate',
          component: () => import('@/modules/achats/pages/AchatCreatePage.vue'),
        },
        {
          path: 'achats/list',
          name: 'AchatList',
          component: () => import('@/modules/achats/pages/AchatListPage.vue'),
        },

        {
          path: 'producteurs/list',
          name: 'ProducteurList',
          component: () => import('@/modules/producteurs/pages/ProducteurListPage.vue'),
        },
        {
          path: 'producteurs/new',
          name: 'ProducteurCreate',
          component: () => import('@/modules/producteurs/pages/ProducteurCreatePage.vue'),
        },
        {
          path: 'producteurs/history',
          name: 'ProducteurHistory',
          component: () => import('@/modules/producteurs/pages/ProducteurHistoryPage.vue'),
        },

        {
          path: 'lots/new',
          name: 'LotCreate',
          component: () => import('@/modules/lots/pages/LotCreatePage.vue'),
        },
        {
          path: 'lots/list',
          name: 'LotList',
          component: () => import('@/modules/lots/pages/LotListPage.vue'),
        },

        {
          path: 'paiements/new',
          name: 'PaiementCreate',
          component: () => import('@/modules/paiements/pages/PaiementCreatePage.vue'),
        },
        {
          path: 'paiements/list',
          name: 'PaiementList',
          component: () => import('@/modules/paiements/pages/PaiementListPage.vue'),
        },

        {
          path: 'rapports/achats',
          name: 'RapportAchats',
          component: () => import('@/modules/rapports/pages/RapportAchatsPage.vue'),
        },
        {
          path: 'rapports/production',
          name: 'RapportProduction',
          component: () => import('@/modules/rapports/pages/RapportProductionPage.vue'),
        },
        {
          path: 'rapports/finances',
          name: 'RapportFinances',
          component: () => import('@/modules/rapports/pages/RapportFinancesPage.vue'),
        },

        {
          path: 'users/new',
          name: 'UserCreate',
          component: () => import('@/modules/users/pages/UserCreatePage.vue'),
        },
        {
          path: 'users/list',
          name: 'UserList',
          component: () => import('@/modules/users/pages/UserListPage.vue'),
        },
        {
          path: 'users/roles',
          name: 'UserRoles',
          component: () => import('@/modules/users/pages/UserRolesPage.vue'),
        },
        {
          path: 'settings/prix',
          name: 'SettingsPrix',
          component: () => import('@/modules/settings/pages/SettingsPrixPage.vue'),
        },
        {
          path: 'settings/zones',
          name: 'SettingsZones',
          component: () => import('@/modules/settings/pages/SettingsZonesPage.vue'),
        },
        {
          path: 'settings/societes',
          name: 'SettingsSocietes',
          component: () => import('@/modules/settings/pages/SettingsSocietesPage.vue'),
        },
        {
          path: '',
          redirect: '/app/dashboard',
        },
      ],
    },
  ],
})

export default router
