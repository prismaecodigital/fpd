(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{QBDq:function(t,e,i){"use strict";i.r(e);var a=i("L2JU");function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function n(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?r(Object(i),!0).forEach((function(e){o(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function o(t,e,i){return(e=function(t){var e=function(t,e){if("object"!==s(t)||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var a=i.call(t,e||"default");if("object"!==s(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===s(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var u={data:function(){return{status:"",activeField:"",query:{bu_id:null}}},computed:n(n(n({},Object(a.c)("AdditionalLimitsSingle",["entry","loading","lists"])),Object(a.c)("AuthBu",["selected_bu"])),{},{updatedQuery:function(){return n(n({},this.query),{},{bu_id:this.selected_bu.id})}}),mounted:function(){this.query.bu_id=this.selected_bu?this.selected_bu.id:null},watch:{selected_bu:function(t){this.query.bu_id=t.id},query:{handler:function(t){this.setQuery(t),this.fetchCreateData(),this.resetState()},deep:!0}},beforeDestroy:function(){this.resetState()},methods:n(n({},Object(a.b)("AdditionalLimitsSingle",["storeData","resetState","setDate","setCoa","setAmount","setKet","fetchCreateData","setQuery"])),{},{updateDate:function(t){this.setDate(t)},updateCoa:function(t){this.setCoa(t)},updateAmount:function(t){this.setAmount(t.target.value)},updateKet:function(t){this.setKet(t.target.value)},submitForm:function(){var t=this;this.storeData().then((function(){t.$router.push({name:"additional-limits.index"}),t.$eventHub.$emit("create-success")})).catch((function(e){t.status="failed",_.delay((function(){t.status=""}),3e3)}))},focusField:function(t){this.activeField=t},clearFocus:function(){this.activeField=""}})},c=i("KHd+"),l=Object(c.a)(u,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-fluid"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[t._m(0),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.date,"is-focused":"date"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v(t._s(t.$t("cruds.additional-limit.fields.date")))]),t._v(" "),e("vue-monthly-picker",{attrs:{"input-class":"form-control",value:t.entry.date_label,"month-labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"date-format":"MMM yyyy",required:""},on:{input:t.updateDate}})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.amount,"is-focused":"amount"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v(t._s(t.$t("cruds.additional-limit.fields.amount")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"number",required:""},domProps:{value:t.entry.amount},on:{input:t.updateAmount,focus:function(e){return t.focusField("amount")},blur:t.clearFocus}})]),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.ket,"is-focused":"ket"==t.activeField}},[e("label",{staticClass:"bmd-label-floating"},[t._v(t._s(t.$t("cruds.additional-limit.fields.ket")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.ket},on:{input:t.updateKet,focus:function(e){return t.focusField("ket")},blur:t.clearFocus}})])]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.coa_id,"is-focused":"coa"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.additional-limit.fields.coa_name")))]),t._v(" "),e("v-select",{key:"coa-field",attrs:{name:"coa",label:"name",value:t.entry.coa_id,options:t.lists.coa,reduce:function(t){return t.id}},on:{input:t.updateCoa},scopedSlots:t._u([{key:"search",fn:function(i){var a=i.attributes,s=i.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.coa_id}},"input",a,!1),s))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.coa_id,"is-focused":"coa"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.additional-limit.fields.coa_code")))]),t._v(" "),e("v-select",{key:"coa-field",attrs:{name:"coa",label:"code",value:t.entry.coa_id,options:t.lists.coa,reduce:function(t){return t.id},disabled:""}})],1)])])],1),t._v(" "),e("div",{staticClass:"card-footer"},[e("vue-button-spinner",{staticClass:"btn-primary",attrs:{status:t.status,isLoading:t.loading,disabled:t.loading}},[t._v("\n              "+t._s(t.$t("global.save"))+"\n            ")])],1)])])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-primary card-header-icon"},[t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("add")])]),this._v(" "),t("h4",{staticClass:"card-title"},[t("strong",[this._v("Tambah Limit")])]),this._v(" "),t("div",{staticClass:"card-body"},[t("p",{staticStyle:{color:"black"}},[this._v("\n                Gunakan fitur ini saat anda ingin menambahkan batas pengeluaran dana pada COA tertentu.\n                "),t("br"),this._v("\n                Fitur ini tidak akan mengubah nilai projection\n              ")])])])}],!1,null,null,null);e.default=l.exports}}]);