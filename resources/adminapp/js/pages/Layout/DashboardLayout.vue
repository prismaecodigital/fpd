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
          path: { name: 'config' },
          gate: 'bu_dept_site_access',
          children: [
            {
              title: 'cruds.account.title',
              icon: 'account_balance',
              path: { name: 'listBu' },
              gate: 'account_access'
            },
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
            {
              title: 'partner',
              icon: 'handshake',
              path: { name: 'partners.index' },
              gate: 'partner_access'
            },
            {
              title: 'Opening Balance',
              icon: 'paid',
              path: { name: 'dompet.index' },
              gate: 'dompet_access'
            },
          ]
        },
        {
          title: 'DANA',
          icon: 'shopping_cart_checkout',
          path: { name: 'fpd' },
          gate: 'fpd_access',
          children: [
            {
              title: 'Dana Proses',
              icon: 'loop',
              path: { name: 'fpd-processes.index' },
              gate: 'fpd_access'
            },
            {
              title: 'Realisasi',
              icon: 'checklist_rtl',
              path: { name: 'lrds.index' },
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
          title: 'Cash IN',
          icon: 'paid',
          path: { name: 'cash-ins.index' },
          gate: 'cash_in_access',
        },
        {
          title: 'Cashflow',
          icon: 'currency_exchange',
          path: { name: 'cashflows' },
          gate: 'projection_access',
          children: [
            {
              title: 'Projection',
              icon: 'repeat',
              path: { name: 'projections' },
              gate: 'projection_access',
              children: [
                {
                  title: 'OUT',
                  icon: 'arrow_right_alt',
                  gate: 'projection_access',
                  path: { name: 'cash-out-projections.index' },
                },
                {
                  title: 'IN',
                  icon: 'keyboard_backspace',
                  gate: 'projection_access',
                  path: { name: 'cash-in-projections.index' },
                },
              ]
            },
            
            {
              title: 'Adjustment',
              icon: 'adjust',
              path: {name: 'adjustments-period.index'},
              gate: 'adjustment_access',
              children: [
                {
                  title: 'Period',
                  icon: 'calendar_month',
                  path: { name: 'adjustments-period.index' },
                  gate: 'adjustment_access',
                },
                {
                  title: 'COA',
                  icon: 'account_balance',
                  path: { name: 'adjustments-coa.index' },
                  gate: 'adjustment_access',
                }
              ]
            },
            {
              title: 'Additional',
              icon: 'battery_charging_full',
              path: {name: 'additional-limits.index'},
              gate: 'adjustment_access',
            },

          ]
        },
        {
          title: 'Calendar',
          icon: 'calendar_view_month',
          path: {name: 'fpds.calendar'},
          gate: 'fpd_access',
          children: [
            {
              title: 'cruds.fpd.calendar',
              icon: 'calendar_view_month',
              path: { name: 'fpds.calendar' },
              gate: 'fpd_access'
            },
            {
              title: 'Weekly Cashflow',
              icon: 'calendar_view_month',
              path: { name: 'weekly-cashflow' },
              gate: 'fpd_access'
            },
            
          ]
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