(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{"A/GT":function(t,e,s){"use strict";s.r(e);var a=s("L2JU");function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function o(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?i(Object(s),!0).forEach((function(e){n(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):i(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function n(t,e,s){return(e=function(t){var e=function(t,e){if("object"!==r(t)||null===t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var a=s.call(t,e||"default");if("object"!==r(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===r(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var u={components:{BootstrapAlert:s("vkmG").a},data:function(){return{status:"",activeField:"",query:{bu_id:null,type:1}}},computed:o(o(o({},Object(a.c)("AdjustmentsPeriodSingle",["entry","loading","lists"])),Object(a.c)("AuthBu",["selected_bu"])),{},{updatedQuery:function(){return o(o({},this.query),{},{bu_id:this.selected_bu.id})}}),mounted:function(){this.query.bu_id=this.selected_bu?this.selected_bu.id:null},watch:{selected_bu:function(t){this.query.bu_id=t.id},query:{handler:function(t){this.setQuery(t),this.fetchCreateData(),this.resetState()},deep:!0}},beforeDestroy:function(){this.resetState()},methods:o(o({},Object(a.b)("AdjustmentsPeriodSingle",["storeData","resetState","setProcessedDate","setSourceDate","setDestinationDate","setAmount","setKet","setSourceCoa","fetchCreateData","setQuery"])),{},{updateSourceDate:function(t){this.setSourceDate(t)},updateDestinationDate:function(t){this.setDestinationDate(t)},updateAmount:function(t){this.setAmount(t.target.value)},updateKet:function(t){this.setKet(t.target.value)},updateSourceCoa:function(t){this.setSourceCoa(t)},submitForm:function(){var t=this;this.storeData().then((function(){t.$router.push({name:"adjustments-period.index"}),t.$eventHub.$emit("create-success")})).catch((function(e){t.status="failed",_.delay((function(){t.status=""}),3e3)}))},focusField:function(t){this.activeField=t},clearFocus:function(){this.activeField=""}})},c=s("KHd+"),l=Object(c.a)(u,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-fluid"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-header card-header-primary card-header-icon"},[t._m(0),t._v(" "),e("h4",{staticClass:"card-title"},[t._v("\n              "+t._s(t.$t("global.create"))+"\n              "),e("strong",[t._v(t._s(t.$t("cruds.adjustment-period.title_singular"))+" "+t._s(this.selected_bu?this.selected_bu.code:""))])]),t._v(" "),e("p",{staticStyle:{color:"black"}},[t._v("Gunakan fitur ini saat anda ingin menyesuaikan anggaran antar periode pada COA tertentu")])]),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.source_coa_id,"is-focused":"source_coa_id"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.adjustment-period.fields.coa_name")))]),t._v(" "),e("v-select",{key:"source_coa-field",attrs:{name:"source_coa",label:"name",value:t.entry.source_coa_id,options:t.lists.coa,reduce:function(t){return t.id}},on:{input:t.updateSourceCoa},scopedSlots:t._u([{key:"search",fn:function(s){var a=s.attributes,r=s.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.source_coa_id}},"input",a,!1),r))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.source_date_label,"is-focused":"source_date"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.adjustment-period.fields.source_date")))]),t._v(" "),e("vue-monthly-picker",{attrs:{"input-class":"form-control",placeHolder:"From Period",value:t.entry.source_date_label,"month-labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"date-format":"MMM yyyy"},on:{input:t.updateSourceDate}},[t._v("\n                  >\n                  ")])],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.destination_date_label,"is-focused":"destination_date"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.adjustment-period.fields.destination_date")))]),t._v(" "),e("vue-monthly-picker",{attrs:{"input-class":"form-control",placeHolder:"From Period",value:t.entry.destination_date_label,"month-labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"date-format":"MMM yyyy"},on:{input:t.updateDestinationDate}},[t._v("\n                  >\n                  ")])],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.amount,"is-focused":"amount"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.adjustment-period.fields.amount")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"number",required:""},domProps:{value:t.entry.amount},on:{input:t.updateAmount,focus:function(e){return t.focusField("amount")},blur:t.clearFocus}})]),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.ket,"is-focused":"ket"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.adjustment-period.fields.ket")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.ket},on:{input:t.updateKet,focus:function(e){return t.focusField("ket")},blur:t.clearFocus}})])]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.source_coa_id,"is-focused":"source_coa_id"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.adjustment-period.fields.coa_code")))]),t._v(" "),e("v-select",{key:"source_coa-field",attrs:{name:"source_coa",label:"code",value:t.entry.source_coa_id,options:t.lists.coa,reduce:function(t){return t.id},disabled:""}})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group"},[e("label",{staticClass:"required"},[t._v("\n                  Current Balance (= Anggaran - Actual OUT -+ Adjustment)\n                ")]),t._v(" "),e("input",{staticClass:"form-control disabled",attrs:{type:"text",disabled:""},domProps:{value:""==t.entry.amount?t.entry.source_amount:t.entry.source_amount+" (-"+t.entry.amount+")"}})]),t._v(" "),e("div",{staticClass:"form-group bmd-form-group"},[e("label",{staticClass:"required"},[t._v("\n                  Current Balance (= Anggaran - Actual OUT -+ Adjustment)\n                ")]),t._v(" "),e("input",{staticClass:"form-control disabled",attrs:{type:"text",disabled:""},domProps:{value:""==t.entry.amount?t.entry.destination_amount:t.entry.destination_amount+" (+"+t.entry.amount+")"}})])])])],1),t._v(" "),e("div",{staticClass:"card-footer"},[e("vue-button-spinner",{staticClass:"btn-sm btn-primary",attrs:{status:t.status,isLoading:t.loading,disabled:t.loading}},[t._v("\n              "+t._s(t.$t("global.save"))+"\n            ")])],1)])])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("add")])])}],!1,null,null,null);e.default=l.exports}}]);