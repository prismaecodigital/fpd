(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{"+SX3":function(t,e,s){"use strict";var a={props:["field","row"]},n=(s("2M0A"),s("KHd+")),i=Object(n.a)(a,(function(){var t=this,e=t._self._c;return e("div",t._l(t.row[t.field],(function(s){return e("div",{key:s.id,staticClass:"mb-1"},[e("a",{attrs:{href:s.url,title:s.name,target:"_blank"}},[e("i",{staticClass:"material-icons mr-1"},[t._v("link")]),t._v(t._s(s.file_name)+"\n    ")])])})),0)}),[],!1,null,"03717551",null);e.a=i.exports},"2M0A":function(t,e,s){"use strict";s("xDE6")},CajT:function(t,e,s){"use strict";s.r(e);var a=s("L2JU"),n=s("Dqre"),i=s("+SX3"),r=s("PSD3"),o=s.n(r);function u(t){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function c(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function l(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?c(Object(s),!0).forEach((function(e){d(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):c(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function d(t,e,s){return(e=function(t){var e=function(t,e){if("object"!==u(t)||null===t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var a=s.call(t,e||"default");if("object"!==u(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===u(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var p={components:{Swal:o.a,Attachment:n.a,DatatableAttachments:i.a},data:function(){return{status:"",activeField:"",date:{disabledDates:{to:new Date(new Date-864e5)}}}},beforeDestroy:function(){this.resetState()},computed:l({},Object(a.c)("FpdsSingle",["entry","loading","lists"])),watch:{"$route.params.id":{immediate:!0,handler:function(){this.resetState(),this.fetchEditData(this.$route.params.id)}}},methods:l(l({},Object(a.b)("FpdsSingle",["updateData","resetState","setCodeVoucher","setCodeVoucherLrd","setTransactType","setKlasifikasi","setBu","setDept","setStatus","setReqDate","setProcessedDate","setKet","setName","insertLampiranFile","removeLampiranFile","insertBuktiTransferFile","removeBuktiTransferFile","addItem","deleteItem","setItems","setItemAccount","setItemAmount","setItemRealAmount","setItemSite","setItemKet","setApprove","fetchEditData","fetchBuDept","fetchBuSite","fetchBuAccount","fetchDeptAccount"])),{},{updateCodeVoucher:function(t){this.setCodeVoucher(t.target.value)},updateCodeVoucherLrd:function(t){this.setCodeVoucherLrd(t.target.value)},updateTransactType:function(t){this.setTransactType(t)},updateKlasifikasi:function(t){this.setKlasifikasi(t)},updateBu:function(t){var e=this;this.setDept([]),this.fetchDeptAccount([]),this.entry.items.forEach((function(t,s){e.setItemSite({index:s,value:""}),e.setItemAccount({index:s,value:""})})),this.setBu(t),this.fetchBuSite(t),this.fetchBuDept(t)},updateDept:function(t){var e=this;this.setDept(t),this.entry.items.forEach((function(t,s){e.setItemAccount({index:s,value:""})})),this.fetchDeptAccount(t)},updateStatus:function(t){this.setStatus(t)},updateReqDate:function(t){this.setReqDate(t.target.value)},updateProcessedDate:function(t){this.setProcessedDate(t.target.value)},updateKet:function(t){this.setKet(t.target.value)},updateName:function(t){this.setName(t.target.value)},addNewRow:function(){this.addItem()},deleteRow:function(t){var e=this;console.log(t),this.$swal({title:"Hapus Item ini ?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Ya",cancelButtonText:"Tidak",showCloseButton:!0}).then((function(s){s.isConfirmed&&e.deleteItem(t)}))},updateItemAccount:function(t,e){this.setItemAccount({index:t,value:e})},updateItemAmount:function(t,e,s){s=e.target.value,this.setItemAmount({index:t,val:s})},updateItemRealAmount:function(t,e,s){s=""!==e.target.value?e.target.value:0,this.setItemRealAmount({index:t,val:s})},updateItemKet:function(t,e,s){s=e.target.value,this.setItemKet({index:t,val:s})},updateItemSite:function(t,e){this.setItemSite({index:t,value:e})},approveData:function(){var t=this;this.$swal({title:"Approve?",text:"Yakin ?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then((function(e){if(e.value){t.setApprove(!0),t.submitForm()}}))},needRealisasi:function(){var t=this;o.a.fire({title:"Approve",text:"Butuh Realisasi ?",showDenyButton:!0,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#0e0e0e",confirmButtonText:"Ya",denyButtonText:"Tidak"}).then((function(e){if(e.isConfirmed){t.setApprove(!0),t.submitForm()}else if(e.isDenied){t.setApprove("2"),t.submitForm()}}))},rejectData:function(){var t=this;this.$swal({title:"Reject ?",text:"Masukkan Alasan",input:"text",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then((function(e){if(e.value){var s=e.value;t.setKet(s);t.setApprove(!1),t.submitForm()}else t.$swal({icon:"error",title:"Failed",text:"Masukkan Alasan"})}))},getRoute:function(t){return"".concat(axios.defaults.baseURL).concat(t,"/media")},submitForm:function(){var t=this;this.updateData().then((function(){t.$router.push({name:"fpds.index",query:{id:t.entry.bu_id}}),t.$eventHub.$emit("update-success")})).catch((function(e){t.status="failed",_.delay((function(){t.status=""}),3e3)}))},focusField:function(t){this.activeField=t},clearFocus:function(){this.activeField=""}})},f=s("KHd+"),v=Object(f.a)(p,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[t._m(0),t._v(" "),e("div",{staticClass:"card-body"},[e("back-button")],1),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),""!==t.entry.code?e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.code,"is-focused":"code"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.code")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text",disabled:""},domProps:{value:t.entry.code},on:{focus:function(e){return t.focusField("code")},blur:t.clearFocus}})])])]):t._e(),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.req_date,"is-focused":"req_date"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.req_date"))+" *")]),t._v(" "),e("datetime-picker",{staticClass:"form-control disabled",attrs:{type:"text",picker:"date",value:t.entry.req_date,required:"",disabled:""},on:{input:t.updateReqDate,focus:function(e){return t.focusField("req_date")},blur:t.clearFocus}})],1),t._v(" "),t.$can("finance")?e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.processed_date,"is-focused":"processed_date"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.processed_date")))]),t._v(" "),e("datetime-picker",{staticClass:"form-control",attrs:{type:"text",picker:"date",value:t.entry.processed_date},on:{input:t.updateProcessedDate,focus:function(e){return t.focusField("processed_date")},blur:t.clearFocus}})],1):t._e(),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==t.entry.bu_id,"is-focused":"bu"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.bu"))+" *")]),t._v(" "),e("v-select",{key:"bu-field",attrs:{name:"bu",label:"name",value:t.entry.bu_id,options:t.lists.bu,reduce:function(t){return t.id},disabled:""},on:{input:t.updateBu,search:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"focus",void 0,e.key,void 0)?null:t.focusField("bu")},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"blur",void 0,e.key,void 0)?null:t.clearFocus.apply(null,arguments)}]},scopedSlots:t._u([{key:"search",fn:function(s){var a=s.attributes,n=s.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.bu_id}},"input",a,!1),n))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==t.entry.dept_id,"is-focused":"dept"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.dept"))+" *")]),t._v(" "),e("v-select",{key:"dept-field",attrs:{name:"dept",label:"name",value:t.entry.dept_id,options:t.lists.dept,reduce:function(t){return t.id},disabled:""},on:{input:t.updateDept},scopedSlots:t._u([{key:"search",fn:function(s){var a=s.attributes,n=s.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.dept_id}},"input",a,!1),n))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.name,"is-focused":"name"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.name")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.name},on:{input:t.updateName,focus:function(e){return t.focusField("name")},blur:t.clearFocus}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v(t._s(t.$t("cruds.fpd.fields.lampiran")))]),t._v(" "),e("attachment",{attrs:{route:t.getRoute("fpds"),"collection-name":"fpd_lampiran",media:t.entry.lampiran,"max-file-size":10,"max-files":10},on:{"file-uploaded":t.insertLampiranFile,"file-removed":t.removeLampiranFile}})],1)]),t._v(" "),e("div",{staticClass:"col-md-6"},[t.$can("finance")?e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.code_voucher,"is-focused":"code_voucher"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.code_voucher")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.code_voucher},on:{input:t.updateCodeVoucher,focus:function(e){return t.focusField("code_voucher")},blur:t.clearFocus}})]):t._e(),t._v(" "),t.$can("finance")&&t.entry.status>4?e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.code_voucher_lrd,"is-focused":"code_voucher_lrd"==t.activeField}},[e("label",{},[t._v(t._s(t.$t("cruds.fpd.fields.code_voucher_lrd")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.code_voucher_lrd},on:{input:t.updateCodeVoucherLrd,focus:function(e){return t.focusField("code_voucher_lrd")},blur:t.clearFocus}})]):t._e(),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.transact_type,"is-focused":"transact_type"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.transact_type"))+" * ")]),t._v(" "),e("v-select",{key:"transact_type-field",attrs:{name:"transact_type",value:t.entry.transact_type,options:t.lists.transact_type,reduce:function(t){return t.value}},on:{input:t.updateTransactType},scopedSlots:t._u([{key:"search",fn:function(s){var a=s.attributes,n=s.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.transact_type}},"input",a,!1),n))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.klasifikasi,"is-focused":"klasifikasi"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.fpd.fields.klasifikasi")))]),t._v(" "),e("v-select",{key:"klasifikasi-field",attrs:{name:"klasifikasi",value:t.entry.klasifikasi,options:t.lists.klasifikasi,reduce:function(t){return t.value},disabled:""},on:{input:t.updateKlasifikasi}})],1),t._v(" "),t.entry.status>=5?e("div",{staticClass:"form-group"},[e("label",[t._v(t._s(t.$t("cruds.fpd.fields.bukti_transfer")))]),t._v(" "),e("attachment",{attrs:{route:t.getRoute("fpds"),"collection-name":"fpd_bukti_transfer",media:t.entry.bukti_transfer,"max-file-size":10,"max-files":10},on:{"file-uploaded":t.insertBuktiTransferFile,"file-removed":t.removeBuktiTransferFile}})],1):t._e()])])],1),t._v(" "),t._m(1),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),e("table",{staticClass:"table table-bordered",attrs:{name:"inputItem"}},[e("thead",[e("th"),t._v(" "),e("th",[t._v("Nama Account / COA")]),t._v(" "),e("th",[t._v("Amount (Nominal) ")]),t._v(" "),t.entry.status>=4?e("th",[t._v("Realisasi")]):t._e(),t._v(" "),t.entry.status>4?e("th",[t._v("Selisih")]):t._e(),t._v(" "),e("th",[t._v("Site")]),t._v(" "),e("th",[t._v("Notes")])]),t._v(" "),t.$can("finance")?e("tbody",t._l(t.entry.items,(function(s,a){return e("tr",{key:a},[e("td",{staticClass:"trashIconContainer",attrs:{scope:"row"}},[e("i",{staticClass:"fa fa-trash-o",on:{click:function(e){return t.deleteRow(a)}}})]),t._v(" "),e("td",[e("v-select",{key:"account-field",attrs:{name:"account",label:"name",value:s.account_id,options:t.lists.accounts,reduce:function(t){return t.id}},on:{input:function(e){return t.updateItemAccount(a,e)}},scopedSlots:t._u([{key:"search",fn:function(a){var n=a.attributes,i=a.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!s.account_id}},"input",n,!1),i))]}}],null,!0)})],1),t._v(" "),e("td",[t._v("\n                      Rp. "),e("input",{staticClass:"inputRp wrapText required",attrs:{disabled:"",type:"number",required:""},domProps:{value:s.amount},on:{input:function(e){return t.updateItemAmount(a,e)}}})]),t._v(" "),t.entry.status>=4?e("td",[t._v("\n                      Rp. "),e("input",{staticClass:"inputRp wrapText required",attrs:{required:"",type:"number"},domProps:{value:s.real_amount},on:{input:function(e){return t.updateItemRealAmount(a,e)}}})]):t._e(),t._v(" "),t.entry.status>4?e("td",[e("input",{staticClass:"inputRp wrapText required",attrs:{disabled:"",type:"number",required:""},domProps:{value:parseInt(s.real_amount)-parseInt(s.amount)}})]):t._e(),t._v(" "),e("td",[e("v-select",{key:"site-field",attrs:{name:"site",label:"name",value:s.site_id,options:t.lists.site,reduce:function(t){return t.id}},on:{input:function(e){return t.updateItemSite(a,e)}}})],1),t._v(" "),e("td",[e("input",{staticClass:"form-control wrapText",attrs:{type:"text"},domProps:{value:s.ket},on:{input:function(e){return t.updateItemKet(a,e)}}})])])})),0):e("tbody",t._l(t.entry.items,(function(s,a){return e("tr",{key:a},[e("td",{staticClass:"trashIconContainer",attrs:{scope:"row"}},[e("i",{staticClass:"fa fa-trash-o",on:{click:function(e){return t.deleteRow(a)}}})]),t._v(" "),e("td",[e("v-select",{key:"account-field",attrs:{name:"account",label:"name",value:s.account_id,options:t.lists.accounts,reduce:function(t){return t.id},disabled:""},on:{input:function(e){return t.updateItemAccount(a,e)}},scopedSlots:t._u([{key:"search",fn:function(a){var n=a.attributes,i=a.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!s.account_id}},"input",n,!1),i))]}}],null,!0)})],1),t._v(" "),e("td",[e("input",{staticClass:"form-control wrapText required",attrs:{disabled:"",type:"number",required:""},domProps:{value:s.amount},on:{input:function(e){return t.updateItemAmount(a,e)}}})]),t._v(" "),t.entry.status>=4?e("td",[e("input",{staticClass:"form-control wrapText required",attrs:{type:"number",required:""},domProps:{value:s.real_amount},on:{input:function(e){return t.updateItemRealAmount(a,e)}}})]):t._e(),t._v(" "),t.entry.status>4?e("td",[e("input",{staticClass:"form-control wrapText required",attrs:{disabled:"",type:"number",required:""},domProps:{value:parseInt(s.real_amount)-parseInt(s.amount)}})]):t._e(),t._v(" "),e("td",[e("v-select",{key:"site-field",attrs:{disabled:"",name:"site",label:"name",value:s.site_id,options:t.lists.site,reduce:function(t){return t.id}},on:{input:function(e){return t.updateItemSite(a,e)}}})],1),t._v(" "),e("td",[e("input",{staticClass:"form-control wrapText",attrs:{disabled:"",type:"text"},domProps:{value:s.ket},on:{input:function(e){return t.updateItemKet(a,e)}}})])])})),0)]),t._v(" "),e("button",{staticClass:"btn btn-sm btn-info",attrs:{type:"button"},on:{click:t.addNewRow}},[e("i",{staticClass:"fa fa-plus-circle"}),t._v("\n                Tambah Item\n            ")])],1),t._v(" "),t.entry.status<8&&t.$can(t.entry.status)?e("div",{staticClass:"card-body"},[e("div",{staticClass:"row"},[4!=t.entry.status&&3!=t.entry.status&&6!=t.entry.status?e("div",{staticClass:"col-lg-2"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.approveData()}}},[t._v("\n                  Approve\n                ")])]):t._e(),t._v(" "),"3"===t.entry.status?e("div",{staticClass:"col-lg-2"},[e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.needRealisasi()}}},[t._v("\n                  Paid\n                ")])]):t._e(),t._v(" "),4!=t.entry.status?e("div",{staticClass:"col-lg-2"},[e("button",{staticClass:"btn btn-danger",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.rejectData()}}},[t._v("\n                  Reject\n                ")])]):t._e(),t._v(" "),"4"===t.entry.status&&t.$can("4")?e("div",{staticClass:"col-lg-2"},[e("button",{staticClass:"btn btn-success",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.approveData()}}},[t._v("\n                  Lanjutkan Proses\n                ")])]):t._e(),t._v(" "),t.$can("finance")?e("div",{staticClass:"col-lg-1"},[e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.submitForm()}}},[t._v("\n                  Simpan\n                ")])]):t._e()])]):t._e()])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-primary card-header-icon"},[t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("add")])]),this._v(" "),t("h4",{staticClass:"card-title"},[t("strong",[t("b",[this._v("Detail Pengajuan Dana")])])])])},function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-primary card-header-icon"},[t("h4",{staticClass:"card-title"},[t("strong",[t("b",[this._v("Detail Dana")])])])])}],!1,null,null,null);e.default=v.exports},"eP+7":function(t,e,s){(t.exports=s("I1BE")(!1)).push([t.i,"a[data-v-03717551]{font-size:13px;font-weight:500;color:#202124}a[data-v-03717551]:hover{color:#9c27b0;text-decoration:underline}",""])},xDE6:function(t,e,s){var a=s("eP+7");"string"==typeof a&&(a=[[t.i,a,""]]);var n={hmr:!0,transform:void 0,insertInto:void 0};s("aET+")(a,n);a.locals&&(t.exports=a.locals)}}]);