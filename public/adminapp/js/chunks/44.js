(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{H7S1:function(a,e,t){(a.exports=t("I1BE")(!1)).push([a.i,".fade-enter-active[data-v-47896582],.fade-leave-active[data-v-47896582]{transition:opacity .1s}.fade-enter[data-v-47896582],.fade-leave-to[data-v-47896582]{opacity:0}",""])},RPvt:function(a,e,t){"use strict";t.r(e);var n={},s=(t("wfxb"),t("KHd+")),i={methods:{toggleSidebar:function(){this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)}}},c={},o={components:{DashboardContent:Object(s.a)(n,(function(){var a=this._self._c;return a("transition",{attrs:{name:"fade",mode:"out-in"}},[a("router-view",{key:this.$route.fullPath})],1)}),[],!1,null,"47896582",null).exports,TopNavbar:Object(s.a)(i,(function(){var a=this,e=a._self._c;return e("nav",{staticClass:"navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top"},[e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"navbar-wrapper"},[e("div",{staticClass:"navbar-brand"},[a._v("\n        "+a._s(a.$t(a.$route.meta.title))+"\n      ")])]),a._v(" "),e("button",{staticClass:"navbar-toggler",class:{toggled:a.$sidebar.showSidebar},attrs:{type:"button","data-toggle":"collapse","aria-controls":"navigation-index","aria-expanded":"false","aria-label":"Toggle navigation"},on:{click:a.toggleSidebar}},[e("span",{staticClass:"sr-only"},[a._v("Toggle navigation")]),a._v(" "),e("span",{staticClass:"navbar-toggler-icon icon-bar"}),a._v(" "),e("span",{staticClass:"navbar-toggler-icon icon-bar"}),a._v(" "),e("span",{staticClass:"navbar-toggler-icon icon-bar"})]),a._v(" "),e("div",{staticClass:"collapse navbar-collapse justify-content-end"},[e("ul",{staticClass:"navbar-nav"},[e("v-accurate"),a._v(" "),e("top-navbar-languages")],1)])])])}),[],!1,null,null,null).exports,MobileMenu:Object(s.a)(c,(function(){var a=this._self._c;return a("ul",{staticClass:"nav nav-mobile-menu"},[a("top-navbar-languages")],1)}),[],!1,null,null,null).exports},data:function(){return{sidebarLinks:[{title:"global.dashboard",icon:"dashboard",path:{name:"dashboard"}},{title:"cruds.userManagement.title",icon:"account_box",path:{name:"user_management"},gate:"user_access",children:[{title:"cruds.permission.title",icon:"perm_data_setting",path:{name:"permissions.index"},gate:"role_permission_access"},{title:"cruds.role.title",icon:"group",path:{name:"roles.index"},gate:"role_permission_access"},{title:"cruds.user.title",icon:"person",path:{name:"users.index"},gate:"user_access"}]},{title:"Config",icon:"table_view",path:{name:"config"},gate:"bu_dept_site_access",children:[{title:"cruds.account.title",icon:"account_balance",path:{name:"listBu"},gate:"account_access"},{title:"cruds.bu.title",icon:"business",path:{name:"bus.index"},gate:"bu_dept_site_access"},{title:"cruds.site.title",icon:"work",path:{name:"sites.index"},gate:"bu_dept_site_access"},{title:"cruds.dept.title",icon:"work_outline",path:{name:"depts.index"},gate:"bu_dept_site_access"},{title:"partner",icon:"handshake",path:{name:"partners.index"},gate:"partner_access"},{title:"Opening Balance",icon:"paid",path:{name:"dompet.index"},gate:"dompet_access"}]},{title:"DANA",icon:"shopping_cart_checkout",path:{name:"fpd"},gate:"fpd_access",children:[{title:"Dana Proses",icon:"loop",path:{name:"fpd-processes.index"},gate:"fpd_access"},{title:"Realisasi",icon:"checklist_rtl",path:{name:"lrds.index"},gate:"fpd_access"},{title:"Selesai",icon:"check_circle",path:{name:"fpd-dones.index"},gate:"fpd_access"}]},{title:"Cash IN",icon:"paid",path:{name:"cash-ins.index"},gate:"cash_in_access"},{title:"Cashflow",icon:"currency_exchange",path:{name:"cashflows"},gate:"projection_access",children:[{title:"Projection",icon:"repeat",path:{name:"projections"},gate:"projection_access",children:[{title:"OUT",icon:"arrow_right_alt",gate:"projection_access",path:{name:"cash-out-projections.index"}},{title:"IN",icon:"keyboard_backspace",gate:"projection_access",path:{name:"cash-in-projections.index"}}]},{title:"Adjustment",icon:"adjust",path:{name:"adjustments-period.index"},gate:"adjustment_access",children:[{title:"Period",icon:"calendar_month",path:{name:"adjustments-period.index"},gate:"adjustment_access"},{title:"COA",icon:"account_balance",path:{name:"adjustments-coa.index"},gate:"adjustment_access"}]},{title:"Additional",icon:"battery_charging_full",path:{name:"additional-limits.index"},gate:"adjustment_access"}]},{title:"Calendar",icon:"calendar_view_month",path:{name:"fpds.calendar"},gate:"calendar_access",children:[{title:"cruds.fpd.calendar",icon:"calendar_view_month",path:{name:"fpds.calendar"},gate:"calendar_access"},{title:"Weekly Cashflow",icon:"calendar_view_month",path:{name:"weekly-cashflow"},gate:"calendar_access"}]},{title:"Profile",icon:"person",path:{name:"profile.password.edit"},gate:"profile"},{title:"Report Issue/Bug",icon:"bug_report",path:"/report-issue"}]}}},r=Object(s.a)(o,(function(){var a=this._self._c;return a("div",{staticClass:"wrapper",class:{"nav-open":this.$sidebar.showSidebar}},[a("event-hub"),this._v(" "),a("side-bar",{attrs:{sidebarLinks:this.sidebarLinks}},[a("mobile-menu",{attrs:{slot:"content"},slot:"content"})],1),this._v(" "),a("div",{staticClass:"main-panel"},[a("top-navbar"),this._v(" "),a("div",{staticClass:"content"},[a("dashboard-content")],1)],1)],1)}),[],!1,null,null,null);e.default=r.exports},ruTY:function(a,e,t){var n=t("H7S1");"string"==typeof n&&(n=[[a.i,n,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};t("aET+")(n,s);n.locals&&(a.exports=n.locals)},wfxb:function(a,e,t){"use strict";t("ruTY")}}]);