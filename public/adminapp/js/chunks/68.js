(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{k095:function(t,e,s){"use strict";s.r(e);var a=s("L2JU");function i(t){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function n(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?r(Object(s),!0).forEach((function(e){o(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):r(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function o(t,e,s){return(e=function(t){var e=function(t,e){if("object"!==i(t)||null===t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var a=s.call(t,e||"default");if("object"!==i(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===i(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var u={components:{Attachment:s("Dqre").a},data:function(){return{status:"",activeField:"",date:{disabledDates:{to:new Date(new Date-864e5)}}}},beforeDestroy:function(){this.resetState()},computed:n({},Object(a.c)("FpdsSingle",["entry","loading","lists"])),watch:{"$route.params.id":{immediate:!0,handler:function(){this.resetState(),this.fetchEditData(this.$route.params.id)}}},methods:n(n({},Object(a.b)("FpdsSingle",["updateData","resetState","setCodeVoucher","setCodeVoucherLrd","setTransactType","setKlasifikasi","setBu","setDept","setStatus","setReqDate","setProcessedDate","setKet","setName","insertLampiranFile","removeLampiranFile","addItem","deleteItem","setItems","setItemAccount","setItemAmount","setItemRealAmount","setItemSite","setItemKet","fetchEditData","fetchBuDept","fetchBuSite","fetchBuAccount","fetchDeptAccount"])),{},{updateCodeVoucher:function(t){this.setCodeVoucher(t.target.value)},updateCodeVoucherLrd:function(t){this.setCodeVoucherLrd(t.target.value)},updateTransactType:function(t){this.setTransactType(t)},updateKlasifikasi:function(t){this.setKlasifikasi(t)},updateBu:function(t){var e=this;this.setDept([]),this.fetchDeptAccount([]),this.entry.items.forEach((function(t,s){e.setItemSite({index:s,value:""}),e.setItemAccount({index:s,value:""})})),this.setBu(t),this.fetchBuSite(t),this.fetchBuDept(t)},updateDept:function(t){var e=this;this.setDept(t),this.fetchDeptAccount([]),this.entry.items.forEach((function(t,s){e.setItemAccount({index:s,value:""})})),this.fetchDeptAccount(t)},updateStatus:function(t){this.setStatus(t)},updateReqDate:function(t){this.setReqDate(t.target.value)},updateProcessedDate:function(t){this.setProcessedDate(t.target.value)},updateKet:function(t){this.setKet(t.target.value)},updateName:function(t){this.setName(t.target.value)},addNewRow:function(){this.addItem()},deleteRow:function(t){var e=this;console.log(t),this.$swal({title:"Hapus Item ini ?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes",showCloseButton:!0}).then((function(s){s.isConfirmed&&e.deleteItem(t)}))},updateItemAccount:function(t,e){this.setItemAccount({index:t,value:e})},updateItemAmount:function(t,e,s){s=e.target.value,this.setItemAmount({index:t,val:s})},updateItemRealAmount:function(t,e,s){s=e.target.value,this.setItemRealAmount({index:t,val:s})},updateItemKet:function(t,e,s){s=e.target.value,this.setItemKet({index:t,val:s})},updateItemSite:function(t,e){this.setItemSite({index:t,value:e})},getRoute:function(t){return"".concat(axios.defaults.baseURL).concat(t,"/media")},submitForm:function(){var t=this;this.updateData().then((function(){t.$router.push({name:"fpds.index",query:{id:t.entry.bu_id}}),t.$eventHub.$emit("update-success")})).catch((function(e){t.status="failed",_.delay((function(){t.status=""}),3e3)}))},focusField:function(t){this.activeField=t},clearFocus:function(){this.activeField=""}})},c=s("KHd+"),d=Object(c.a)(u,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-fluid"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[t._m(0),t._v(" "),e("div",{staticClass:"card-body"},[e("back-button")],1),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),""!==t.entry.code?e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.code,"is-focused":"code"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.code")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.entry.code},on:{focus:function(e){return t.focusField("code")},blur:t.clearFocus}})])])]):t._e(),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.req_date,"is-focused":"req_date"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.req_date"))+" *")]),t._v(" "),e("datetime-picker",{staticClass:"form-control",attrs:{type:"text",picker:"date",value:t.entry.req_date,required:"",disabled:""},on:{input:t.updateReqDate,focus:function(e){return t.focusField("req_date")},blur:t.clearFocus}})],1),t._v(" "),t.$can("finance")?e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.processed_date,"is-focused":"processed_date"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.processed_date")))]),t._v(" "),e("datetime-picker",{staticClass:"form-control",attrs:{type:"text",picker:"date",value:t.entry.processed_date},on:{input:t.updateProcessedDate,focus:function(e){return t.focusField("processed_date")},blur:t.clearFocus}})],1):t._e(),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==t.entry.bu_id,"is-focused":"bu"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.bu"))+" *")]),t._v(" "),e("v-select",{key:"bu-field",attrs:{name:"bu",label:"name",value:t.entry.bu_id,options:t.lists.bu,reduce:function(t){return t.id},disabled:""},on:{input:t.updateBu},scopedSlots:t._u([{key:"search",fn:function(s){var a=s.attributes,i=s.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.bu_id}},"input",a,!1),i))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==t.entry.dept_id,"is-focused":"dept"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.dept"))+" *")]),t._v(" "),e("v-select",{key:"dept-field",attrs:{name:"dept",label:"name",value:t.entry.dept_id,options:t.lists.dept,reduce:function(t){return t.id},disabled:""},on:{input:t.updateDept},scopedSlots:t._u([{key:"search",fn:function(s){var a=s.attributes,i=s.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.dept_id}},"input",a,!1),i))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.name,"is-focused":"name"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.name")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.name},on:{input:t.updateName,focus:function(e){return t.focusField("name")},blur:t.clearFocus}})])]),t._v(" "),e("div",{staticClass:"col-md-6"},[t.$can("finance")?e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.code_voucher,"is-focused":"code_voucher"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.code_voucher")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.code_voucher},on:{input:t.updateCodeVoucher,focus:function(e){return t.focusField("code_voucher")},blur:t.clearFocus}})]):t._e(),t._v(" "),t.$can("finance")&&t.entry.status>4?e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.code_voucher_lrd,"is-focused":"code_voucher_lrd"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.code_voucher_lrd")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.code_voucher_lrd},on:{input:t.updateCodeVoucherLrd,focus:function(e){return t.focusField("code_voucher_lrd")},blur:t.clearFocus}})]):t._e(),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.transact_type,"is-focused":"transact_type"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.transact_type"))+" * ")]),t._v(" "),e("v-select",{key:"transact_type-field",attrs:{name:"transact_type",value:t.entry.transact_type,options:t.lists.transact_type,reduce:function(t){return t.value}},on:{input:t.updateTransactType},scopedSlots:t._u([{key:"search",fn:function(s){var a=s.attributes,i=s.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.transact_type}},"input",a,!1),i))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.klasifikasi,"is-focused":"klasifikasi"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.klasifikasi")))]),t._v(" "),e("v-select",{key:"klasifikasi-field",attrs:{name:"klasifikasi",value:t.entry.klasifikasi,options:t.lists.klasifikasi,reduce:function(t){return t.value}},on:{input:t.updateKlasifikasi}})],1),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v(t._s(t.$t("cruds.fpd.fields.lampiran")))]),t._v(" "),e("attachment",{attrs:{route:t.getRoute("fpds"),"collection-name":"fpd_lampiran",media:t.entry.lampiran,"max-file-size":10,"max-files":10},on:{"file-uploaded":t.insertLampiranFile,"file-removed":t.removeLampiranFile}})],1)])])],1),t._v(" "),t._m(1),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),e("table",{staticClass:"table table-bordered",attrs:{name:"inputItem"}},[e("thead",[e("th"),t._v(" "),e("th",[t._v("Nama Account / COA")]),t._v(" "),e("th",[t._v("Amount (Nominal)")]),t._v(" "),t.entry.status>4?e("th",[t._v("Nominal Realisasi")]):t._e(),t._v(" "),e("th",[t._v("Site")]),t._v(" "),e("th",[t._v("Notes")])]),t._v(" "),e("tbody",t._l(t.entry.items,(function(s,a){return e("tr",{key:a},[e("td",{staticClass:"trashIconContainer",attrs:{scope:"row"}},[e("i",{staticClass:"fa fa-trash-o",on:{click:function(e){return t.deleteRow(a)}}})]),t._v(" "),e("td",[e("v-select",{key:"account-field",attrs:{name:"account",label:"name",value:s.account_id,options:t.lists.accounts,reduce:function(t){return t.id}},on:{input:function(e){return t.updateItemAccount(a,e)}},scopedSlots:t._u([{key:"search",fn:function(a){var i=a.attributes,r=a.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!s.account_id}},"input",i,!1),r))]}}],null,!0)})],1),t._v(" "),e("td",[t._v("\n                      Rp."),e("input",{staticClass:"inputRp wrapText required",attrs:{type:"number",required:""},domProps:{value:s.amount},on:{input:function(e){return t.updateItemAmount(a,e)}}})]),t._v(" "),parseInt(t.entry.status)>4?e("td",[t._v("\n                      Rp."),e("input",{staticClass:"inputRp wrapText required",attrs:{type:"number"},domProps:{value:s.real_amount},on:{input:function(e){return t.updateImteRealAmount(a,e)}}})]):t._e(),t._v(" "),e("td",[e("v-select",{key:"site-field",attrs:{name:"site",label:"name",value:s.site_id,options:t.lists.site,reduce:function(t){return t.id}},on:{input:function(e){return t.updateItemSite(a,e)}}})],1),t._v(" "),e("td",[e("input",{staticClass:"form-control wrapText",attrs:{type:"text"},domProps:{value:s.ket},on:{input:function(e){return t.updateItemKet(a,e)}}})])])})),0)]),t._v(" "),e("button",{staticClass:"btn btn-info",attrs:{type:"button"},on:{click:t.addNewRow}},[e("i",{staticClass:"fa fa-plus-circle"}),t._v("\n                Tambah Item\n            ")])],1),t._v(" "),e("div",{staticClass:"card-footer"},[e("vue-button-spinner",{staticClass:"btn-primary",attrs:{status:t.status,isLoading:t.loading,disabled:t.loading}},[t._v("\n              "+t._s(t.$t("global.save"))+"\n            ")])],1)])])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-primary card-header-icon"},[t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("add")])]),this._v(" "),t("h4",{staticClass:"card-title"},[t("strong",[t("b",[this._v("Edit Form Pengajuan Dana")])])])])},function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-primary card-header-icon"},[t("h4",{staticClass:"card-title"},[t("strong",[t("b",[this._v("Detail Dana")])])])])}],!1,null,null,null);e.default=d.exports}}]);