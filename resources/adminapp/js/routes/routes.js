import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const View = { template: '<router-view></router-view>' }

const routes = [
  {
    path: '/',
    component: () => import('@pages/Layout/DashboardLayout.vue'),
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@pages/Dashboard.vue'),
        meta: { title: 'global.dashboard' }
      },
      {
        path: 'user-management',
        name: 'user_management',
        component: View,
        redirect: { name: 'permissions.index' },
        children: [
          {
            path: 'permissions',
            name: 'permissions.index',
            component: () => import('@cruds/Permissions/Index.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/create',
            name: 'permissions.create',
            component: () => import('@cruds/Permissions/Create.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/:id',
            name: 'permissions.show',
            component: () => import('@cruds/Permissions/Show.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'permissions/:id/edit',
            name: 'permissions.edit',
            component: () => import('@cruds/Permissions/Edit.vue'),
            meta: { title: 'cruds.permission.title' }
          },
          {
            path: 'roles',
            name: 'roles.index',
            component: () => import('@cruds/Roles/Index.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/create',
            name: 'roles.create',
            component: () => import('@cruds/Roles/Create.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/:id',
            name: 'roles.show',
            component: () => import('@cruds/Roles/Show.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'roles/:id/edit',
            name: 'roles.edit',
            component: () => import('@cruds/Roles/Edit.vue'),
            meta: { title: 'cruds.role.title' }
          },
          {
            path: 'users',
            name: 'users.index',
            component: () => import('@cruds/Users/Index.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/create',
            name: 'users.create',
            component: () => import('@cruds/Users/Create.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/:id',
            name: 'users.show',
            component: () => import('@cruds/Users/Show.vue'),
            meta: { title: 'cruds.user.title' }
          },
          {
            path: 'users/:id/edit',
            name: 'users.edit',
            component: () => import('@cruds/Users/Edit.vue'),
            meta: { title: 'cruds.user.title' }
          }
        ]
      },
      {
        path: 'bu-dept',
        name: 'bu_dept',
        component: View,
        redirect: { name: 'bus.index' },
        children: [
          {
            path: 'bus',
            name: 'bus.index',
            component: () => import('@cruds/Bus/Index.vue'),
            meta: { title: 'cruds.bu.title' }
          },
          {
            path: 'bus/create',
            name: 'bus.create',
            component: () => import('@cruds/Bus/Create.vue'),
            meta: { title: 'cruds.bu.title' }
          },
          {
            path: 'bus/:id',
            name: 'bus.show',
            component: () => import('@cruds/Bus/Show.vue'),
            meta: { title: 'cruds.bu.title' }
          },
          {
            path: 'bus/:id/edit',
            name: 'bus.edit',
            component: () => import('@cruds/Bus/Edit.vue'),
            meta: { title: 'cruds.bu.title' }
          },
          {
            path: 'depts',
            name: 'depts.index',
            component: () => import('@cruds/Depts/Index.vue'),
            meta: { title: 'cruds.dept.title' }
          },
          {
            path: 'depts/create',
            name: 'depts.create',
            component: () => import('@cruds/Depts/Create.vue'),
            meta: { title: 'cruds.dept.title' }
          },
          {
            path: 'depts/:id',
            name: 'depts.show',
            component: () => import('@cruds/Depts/Show.vue'),
            meta: { title: 'cruds.dept.title' }
          },
          {
            path: 'depts/:id/edit',
            name: 'depts.edit',
            component: () => import('@cruds/Depts/Edit.vue'),
            meta: { title: 'cruds.dept.title' }
          },
          {
            path: 'sites',
            name: 'sites.index',
            component: () => import('@cruds/Sites/Index.vue'),
            meta: { title: 'cruds.site.title' }
          },
          {
            path: 'sites/create',
            name: 'sites.create',
            component: () => import('@cruds/Sites/Create.vue'),
            meta: { title: 'cruds.site.title' }
          },
          {
            path: 'sites/:id',
            name: 'sites.show',
            component: () => import('@cruds/Sites/Show.vue'),
            meta: { title: 'cruds.site.title' }
          },
          {
            path: 'sites/:id/edit',
            name: 'sites.edit',
            component: () => import('@cruds/Sites/Edit.vue'),
            meta: { title: 'cruds.site.title' }
          },
          {
            path: 'accounts/list',
            name: 'accounts.index',
            component: () => import('@cruds/Accounts/Index.vue'),
            meta: { title: 'cruds.account.title' }
          },
          {
            path: 'accounts/create',
            name: 'accounts.create',
            component: () => import('@cruds/Accounts/Create.vue'),
            meta: { title: 'cruds.account.title' }
          },
          {
            path: 'accounts/:id',
            name: 'accounts.show',
            component: () => import('@cruds/Accounts/Show.vue'),
            meta: { title: 'cruds.account.title' }
          },
          {
            path: 'accounts/:id/edit',
            name: 'accounts.edit',
            component: () => import('@cruds/Accounts/Edit.vue'),
            meta: { title: 'cruds.account.title' }
          },
          {
            path: 'accounts',
            name: 'listBu',
            component: () => import('@cruds/Accounts/List.vue'),
            meta: { title: 'cruds.account.title' }
          }

        ]
      },
      {
        path: 'fpds',
        name: 'listFpd',
        component: () => import('@cruds/Fpds/List.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpds/list',
        name: 'fpds.index',
        component: () => import('@cruds/Fpds/Index.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpds/create',
        name: 'fpds.create',
        component: () => import('@cruds/Fpds/Create.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpds/:id',
        name: 'fpds.show',
        component: () => import('@cruds/Fpds/Show.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpds/:id/edit',
        name: 'fpds.edit',
        component: () => import('@cruds/Fpds/Edit.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpds/:id/editData',
        name: 'fpds.editData',
        component: () => import('@cruds/Fpds/EditData.vue'),
        meta: { title: 'cruds.fpd.title' }
      },

      // Fpd Process
      {
        path: 'fpd-processes',
        name: 'listFpdProcess',
        component: () => import('@cruds/FpdProcesses/List.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpd-processes/list',
        name: 'fpd-processes.index',
        component: () => import('@cruds/FpdProcesses/Index.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpd-processes/create',
        name: 'fpd-processes.create',
        component: () => import('@cruds/FpdProcesses/Create.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpd-processes/:id',
        name: 'fpd-processes.show',
        component: () => import('@cruds/FpdProcesses/Show.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpd-processes/:id/edit',
        name: 'fpd-processes.edit',
        component: () => import('@cruds/FpdProcesses/Edit.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'fpd-processes/:id/editData',
        name: 'fpd-processes.editData',
        component: () => import('@cruds/FpdProcesses/EditData.vue'),
        meta: { title: 'cruds.fpd.title' }
      },

      // LRD
      {
        path: 'lrds',
        name: 'listLrd',
        component: () => import('@cruds/Lrds/List.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'lrds/list',
        name: 'lrds.index',
        component: () => import('@cruds/Lrds/Index.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'lrds/create',
        name: 'lrds.create',
        component: () => import('@cruds/Lrds/Create.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'lrds/:id',
        name: 'lrds.show',
        component: () => import('@cruds/Lrds/Show.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'lrds/:id/edit',
        name: 'lrds.edit',
        component: () => import('@cruds/Lrds/Edit.vue'),
        meta: { title: 'cruds.fpd.title' }
      },
      {
        path: 'lrds/:id/editData',
        name: 'lrds.editData',
        component: () => import('@cruds/Lrds/EditData.vue'),
        meta: { title: 'cruds.fpd.title' }
      },

      // Fpd Dones
      {
        path: 'fpd-dones',
        name: 'fpd-dones.index',
        component: () => import('@cruds/FpdDones/Index.vue'),
        meta: { title: 'Done' }
      },
      {
        path: 'fpd-dones/:id',
        name: 'fpd-dones.show',
        component: () => import('@cruds/FpdDones/Show.vue'),
        meta: { title: 'Done' }
      },

      // Profile
      {
        path: 'profile/edit',
        name: 'profile.password.edit',
        component: () => import('@cruds/Profile/Edit.vue'),
        meta: { title: 'Profile' }
      },
      {
        path: 'calendar',
        name: 'fpds.calendar',
        component: () => import('@cruds/Fpds/Calendar.vue'),
        meta: { title: 'Calendar' }
      },


    ]
  }
]

export default new VueRouter({
  mode: 'history',
  base: '/admin',
  routes
})