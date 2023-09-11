<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <event-hub></event-hub>
    <side-bar :sidebarLinks="sidebarLinks">
      <mobile-menu slot="content"></mobile-menu>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <div class="content">
        <dashboard-content></dashboard-content>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardContent from './Content.vue'
import TopNavbar from './TopNavbar.vue'
import MobileMenu from './MobileMenu.vue'

export default {
  components: {
    DashboardContent,
    TopNavbar,
    MobileMenu
  },
  data() {
    return {
      sidebarLinks: [
        {
          title: 'global.dashboard',
          icon: 'dashboard',
          path: { name: 'dashboard' }
        },
        {
          title: 'cruds.userManagement.title',
          icon: 'account_box',
          path: { name: 'user_management' },
          gate: 'user_access',
          children: [
            {
              title: 'cruds.permission.title',
              icon: 'perm_data_setting',
              path: { name: 'permissions.index' },
              gate: 'role_permission_access'
            },
            {
              title: 'cruds.role.title',
              icon: 'group',
              path: { name: 'roles.index' },
              gate: 'role_permission_access'
            },
            {
              title: 'cruds.user.title',
              icon: 'person',
              path: { name: 'users.index' },
              gate: 'user_access'
            }
          ]
        },
        {
          title: 'Config',
          icon: 'table_view',
          path: { name: 'bu_dept' },
          gate: 'bu_dept_site_access',
          children: [
            {
              title: 'cruds.bu.title',
              icon: 'business',
              path: { name: 'bus.index' },
              gate: 'bu_dept_site_access'
            },
            {
              title: 'cruds.site.title',
              icon: 'work',
              path: { name: 'sites.index' },
              gate: 'bu_dept_site_access'
            },
            {
              title: 'cruds.dept.title',
              icon: 'work_outline',
              path: { name: 'depts.index' },
              gate: 'bu_dept_site_access'
            },
          ]
        },
        {
          title: 'FPD',
          icon: 'dynamic_form',
          path: { name: 'fpd' },
          gate: 'fpd_access',
          children: [
            {
              title: 'cruds.fpd.title',
              icon: 'loop',
              path: { name: 'fpds.index' },
              gate: 'fpd_access'
            },
            {
              title: 'Selesai',
              icon: 'check_circle',
              path: { name: 'fpd-dones.index' },
              gate: 'fpd_access'
            },
          ]
        },
        {
          title: 'cruds.account.title',
          icon: 'account_balance',
          path: { name: 'listBu' },
          gate: 'account_access'
        },
        {
          title: 'cruds.fpd.calendar',
          icon: 'calendar_view_month',
          path: { name: 'fpds.calendar' },
          gate: 'fpd_access'
        },
        {
          title: 'Profile',
          icon: 'person',
          path: { name: 'profile.password.edit' },
          gate: 'profile'
        }
      ]
    }
  }
}
</script>