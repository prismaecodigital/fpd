(window.webpackJsonp=window.webpackJsonp||[]).push([[57],{"2NDH":function(t,e,s){"use strict";s.r(e);var a=s("L2JU");function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function i(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?r(Object(s),!0).forEach((function(e){o(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):r(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function o(t,e,s){return(e=function(t){var e=function(t,e){if("object"!==n(t)||null===t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var a=s.call(t,e||"default");if("object"!==n(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===n(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var u={components:{Attachment:s("Dqre").a},data:function(){return{status:"",activeField:""}},computed:i({},Object(a.c)("CashInsSingle",["entry","loading","lists"])),watch:{"$route.params.id":{immediate:!0,handler:function(){this.resetState(),this.fetchEditData(this.$route.params.id)}}},beforeDestroy:function(){this.resetState()},methods:i(i({},Object(a.b)("CashInsSingle",["updateData","resetState","setDate","setNumber","setTransactionType","setCashInType","setAmount","setKet","setBu","setStatus","setMcPercentage","setLcPercentage","setPartner","setQuery","fetchEditData","addItem","deleteItem","setItemDate","setItemKet","setItemRealAmount","setItemStatusPaid"])),{},{updateKet:function(t){this.setKet(t.target.value)},updateTransactionType:function(t){this.setTransactionType(t)},updateCashInType:function(t){this.setCashInType(t)},updatePartner:function(t){this.setPartner(t)},updateNumber:function(t){this.setNumber(t.target.value)},updateDate:function(t){this.setDate(t.target.value)},updateAmount:function(t){this.setAmount(t.target.value)},updateMcPercentage:function(t){this.setMcPercentage(t.target.value)},updateLcPercentage:function(t){this.setLcPercentage(t.target.value)},addNewRow:function(){this.addItem()},deleteRow:function(t){var e=this;console.log(t),this.$swal({title:"Hapus Item ini ?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Ya",cancelButtonText:"Tidak",showCloseButton:!0}).then((function(s){s.isConfirmed&&e.deleteItem(t)}))},updateItemDate:function(t,e){var s=e.target.value;this.setItemDate({index:t,value:s})},updateItemKet:function(t,e){this.setItemKet({index:t,value:e.target.value})},updateItemRealAmount:function(t,e){this.setItemRealAmount({index:t,value:e.target.value})},updateItemStatusPaid:function(t){this.setItemStatusPaid(t)},closePayment:function(){var t=this;this.$swal({title:"Close Payment",text:"Yakin ?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then((function(e){e.value&&(t.setStatus(!0),t.submitForm())}))},submitForm:function(){var t=this;this.updateData().then((function(){t.$router.push({name:"cash-ins.index",query:{id:t.entry.bu_id}}),t.$eventHub.$emit("create-success")})).catch((function(e){t.status="failed",_.delay((function(){t.status=""}),3e3)}))},focusField:function(t){this.activeField=t},clearFocus:function(){this.activeField=""},isNumberOrComma:function(t){var e=String.fromCharCode(t.keyCode),s=e>="0"&&e<="9",a=","===e&&-1===t.target.value.indexOf(",");s||a||t.preventDefault()}})},c=s("KHd+"),l=Object(c.a)(u,(function(){var t,e=this,s=e._self._c;return s("div",{staticClass:"container-fluid"},[s("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm.apply(null,arguments)}}},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[e._m(0),e._v(" "),s("div",{staticClass:"card-body row"},[s("div",{staticClass:"col-auto",staticStyle:{"align-self":"center"}},[e._v("Status Cash In : "),s("strong",[s("b",[e._v(e._s(e.entry.status_label))])])])]),e._v(" "),s("div",{staticClass:"card-body"},[s("bootstrap-alert"),e._v(" "),e._m(1),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==e.entry.bu_id,"is-focused":"bu"==e.activeField}},[s("label",{staticClass:"required"},[e._v(e._s(e.$t("cruds.cash-in.fields.bu"))+" *")]),e._v(" "),s("v-select",{key:"bu-field",attrs:{name:"bu",label:"name",value:e.entry.bu_id,options:e.lists.bu,reduce:function(t){return t.id},disabled:""},scopedSlots:e._u([{key:"search",fn:function(t){var a=t.attributes,n=t.events;return[s("input",e._g(e._b({staticClass:"vs__search",attrs:{required:!e.entry.bu_id}},"input",a,!1),n))]}}])})],1),e._v(" "),s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.ket,"is-focused":"ket"==e.activeField}},[s("label",{},[e._v(e._s(e.$t("cruds.cash-in.fields.ket")))]),e._v(" "),s("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.entry.ket},on:{input:e.updateKet,focus:function(t){return e.focusField("ket")},blur:e.clearFocus}})]),e._v(" "),s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==e.entry.transaction_type,"is-focused":"transaction_type"==e.activeField}},[s("label",{staticClass:"required"},[e._v("Tipe Transaksi")]),e._v(" "),s("v-select",{key:"transaction_type-field",attrs:{name:"transaction_type",label:"label",value:e.entry.transaction_type,options:e.lists.transaction_type,reduce:function(t){return t.value}},on:{input:e.updateTransactionType},scopedSlots:e._u([{key:"search",fn:function(t){var a=t.attributes,n=t.events;return[s("input",e._g(e._b({staticClass:"vs__search",attrs:{required:!e.entry.transaction_type}},"input",a,!1),n))]}}])})],1),e._v(" "),s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==e.entry.cash_in_type,"is-focused":"cash_in_type"==e.activeField}},[s("label",{staticClass:"required"},[e._v("Tipe Pemasukan")]),e._v(" "),s("v-select",{key:"cash_in_type-field",attrs:{name:"cash_in_type",label:"label",value:e.entry.cash_in_type,options:e.lists.cash_in_type,reduce:function(t){return t.value}},on:{input:e.updateCashInType},scopedSlots:e._u([{key:"search",fn:function(t){var a=t.attributes,n=t.events;return[s("input",e._g(e._b({staticClass:"vs__search",attrs:{required:!e.entry.cash_in_type}},"input",a,!1),n))]}}])})],1),e._v(" "),s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":null!==e.entry.partner_id,"is-focused":"partner"==e.activeField}},[s("label",{staticClass:"required"},[e._v("Nama Pemberi Dana")]),e._v(" "),s("v-select",{key:"partner-field",attrs:{name:"partner",label:"name",value:e.entry.partner_id,options:e.lists.partner,reduce:function(t){return t.id}},on:{input:e.updatePartner},scopedSlots:e._u([{key:"search",fn:function(t){var a=t.attributes,n=t.events;return[s("input",e._g(e._b({staticClass:"vs__search",attrs:{required:!e.entry.partner_id}},"input",a,!1),n))]}}])})],1)]),e._v(" "),s("div",{staticClass:"col-md-6"},[s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.number,"is-focused":"number"==e.activeField}},[s("label",{},[e._v("No. Kontrak/Invoice")]),e._v(" "),s("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.entry.number},on:{input:e.updateNumber,focus:function(t){return e.focusField("number")},blur:e.clearFocus}})]),e._v(" "),s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.date,"is-focused":"date"==e.activeField}},[s("label",{staticClass:"required"},[e._v(e._s(e.$t("cruds.cash-in.fields.date")))]),e._v(" "),s("datetime-picker",{staticClass:"form-control",attrs:{type:"text",picker:"date",value:e.entry.date},on:{input:e.updateDate,focus:function(t){return e.focusField("date")},blur:e.clearFocus}})],1),e._v(" "),s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.amount,"is-focused":"amount"==e.activeField}},[s("label",{},[e._v(e._s(e.$t("cruds.cash-in.fields.amount")))]),e._v(" "),s("input",{staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:e.entry.amount_label},on:{input:e.updateAmount,keypress:function(t){return e.isNumberOrComma(t)}}})]),e._v(" "),1==e.entry.transaction_type?s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.mc_percentage,"is-focused":"mc_percentage"==e.activeField}},[s("label",{},[e._v(e._s(e.$t("cruds.cash-in.fields.mc_percentage")))]),e._v(" "),s("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.entry.mc_percentage},on:{input:e.updateMcPercentage,focus:function(t){return e.focusField("mc_percentage")},blur:e.clearFocus}})]):e._e(),e._v(" "),1==e.entry.transaction_type?s("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.lc_percentage,"is-focused":"lc_percentage"==e.activeField}},[s("label",{},[e._v(e._s(e.$t("cruds.cash-in.fields.lc_percentage")))]),e._v(" "),s("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.entry.lc_percentage},on:{input:e.updateLcPercentage,focus:function(t){return e.focusField("lc_percentage")},blur:e.clearFocus}})]):e._e()])])],1),e._v(" "),s("br"),e._v(" "),s("div",{staticClass:"card-body"},[e._m(2),e._v(" "),0==e.entry.status?s("br"):e._e(),e._v(" "),0==e.entry.status?s("button",{staticClass:"btn btn-sm btn-info",attrs:{type:"button"},on:{click:e.addNewRow}},[s("i",{staticClass:"fa fa-plus-circle"}),e._v("\n                Add Payment\n            ")]):e._e()]),e._v(" "),(null===(t=e.entry.cash_in_items)||void 0===t?void 0:t.length)>0?s("div",{staticClass:"card-body"},[s("bootstrap-alert"),e._v(" "),s("table",{staticClass:"table table-bordered",attrs:{name:"inputItem"}},[e._m(3),e._v(" "),s("tbody",e._l(e.entry.cash_in_items,(function(t,a){return s("tr",{key:a},[s("td",{staticClass:"trashIconContainer",attrs:{scope:"row"}},[s("i",{staticClass:"fa fa-trash-o",on:{click:function(t){return e.deleteRow(a)}}})]),e._v(" "),s("td",[s("datetime-picker",{staticClass:"form-control",attrs:{type:"text",picker:"date",value:t.date,required:""},on:{input:function(t){return e.updateItemDate(a,t)}}})],1),e._v(" "),s("td",[s("input",{staticClass:"form-control",attrs:{type:"text",name:"ket",required:""},domProps:{value:t.ket},on:{input:function(t){return e.updateItemKet(a,t)}}})]),e._v(" "),s("td",[s("input",{staticClass:"form-control wrapText required",attrs:{type:"text",required:""},domProps:{value:t.real_amount_label},on:{input:function(t){return e.updateItemRealAmount(a,t)},keypress:function(t){return e.isNumberOrComma(t)}}})]),e._v(" "),s("td",[s("input",{attrs:{type:"checkbox"},domProps:{checked:t.status_paid},on:{change:function(t){return e.updateItemStatusPaid(a)}}})])])})),0)])],1):e._e(),e._v(" "),s("div",{staticClass:"card-footer"},[0==e.entry.status?s("vue-button-spinner",{staticClass:"btn-sm btn-success",attrs:{status:e.status,isLoading:e.loading,disabled:e.loading}},[e._v("\n              "+e._s(e.$t("global.save"))+"\n            ")]):e._e(),e._v(" "),0==e.entry.status?s("div",{staticClass:"col-auto"},[s("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.closePayment()}}},[e._v("\n                  Close Payment\n              ")])]):e._e(),e._v(" "),s("back-button",{staticClass:"btn-sm"})],1)])])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-primary card-header-icon"},[t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("add")])]),this._v(" "),t("h4",{staticClass:"card-title"},[t("strong",[t("b",[this._v("Edit / Proses CASH IN")])])])])},function(){var t=this._self._c;return t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6"},[t("h4",[t("strong",[t("b",[this._v("Unrealized Cash In")])])])])])},function(){var t=this._self._c;return t("h4",{staticStyle:{color:"black"}},[t("strong",[t("b",[this._v("Realized Cash In (Pendapatan yang sudah masuk)")])])])},function(){var t=this._self._c;return t("thead",[t("th"),this._v(" "),t("th",[this._v("Tanggal")]),this._v(" "),t("th",[this._v("Keterangan ")]),this._v(" "),t("th",[this._v("Nominal (REALIZED)")]),this._v(" "),t("th",[this._v("Terbayar")])])}],!1,null,null,null);e.default=l.exports}}]);