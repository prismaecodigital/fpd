(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{XpoC:function(t,e,a){"use strict";a.r(e);var i=a("L2JU");function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function r(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach((function(e){o(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e,a){return(e=function(t){var e=function(t,e){if("object"!==s(t)||null===t)return t;var a=t[Symbol.toPrimitive];if(void 0!==a){var i=a.call(t,e||"default");if("object"!==s(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===s(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var c={data:function(){return{status:"",activeField:"",query:{bu_id:null}}},computed:r({},Object(i.c)("AdditionalLimitsSingle",["entry","loading","lists"])),beforeDestroy:function(){this.resetState()},watch:{"$route.params.id":{immediate:!0,handler:function(){this.resetState(),this.fetchEditData(this.$route.params.id)}}},methods:r(r({},Object(i.b)("AdditionalLimitsSingle",["storeData","resetState","setDate","setCoa","setAmount","setKet","setStatus","setReject","updateData","fetchEditData","setQuery"])),{},{updateDate:function(t){this.setDate(t)},updateCoa:function(t){this.setCoa(t)},updateAmount:function(t){this.setAmount(t.target.value)},updateKet:function(t){this.setKet(t.target.value)},approveData:function(){var t=this;this.$swal({title:"Approve?",text:"Yakin ?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then((function(e){e.value&&(t.setStatus("9"),t.submitForm())}))},rejectData:function(){var t=this;this.$swal({title:"Reject ?",text:"Masukkan Alasan",input:"text",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes"}).then((function(e){if(e.value){t.setStatus("99");var a=e.value;t.setReject(a),t.submitForm()}else t.$swal({icon:"error",title:"Failed",text:"Masukkan Alasan"})}))},submitForm:function(){var t=this;this.updateData().then((function(){t.$router.push({name:"additional-limits.index"}),t.$eventHub.$emit("update-success")})).catch((function(e){t.status="failed",_.delay((function(){t.status=""}),3e3)}))},focusField:function(t){this.activeField=t},clearFocus:function(){this.activeField=""},isNumberOrComma:function(t){var e=String.fromCharCode(t.keyCode),a=e>="0"&&e<="9",i=","===e&&-1===t.target.value.indexOf(",");a||i||t.preventDefault()}})},u=a("KHd+"),l=Object(u.a)(c,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-fluid"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[t._m(0),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.date,"is-focused":"date"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v(t._s(t.$t("cruds.additional-limit.fields.date")))]),t._v(" "),e("vue-monthly-picker",{attrs:{"input-class":"form-control",value:t.entry.date_label,"month-labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"date-format":"MMM yyyy",required:""},on:{input:t.updateDate}})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.amount,"is-focused":"amount"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v(t._s(t.$t("cruds.additional-limit.fields.amount")))]),t._v(" "),e("input",{staticClass:"form-control required",attrs:{type:"text",required:""},domProps:{value:t.entry.amount_label},on:{input:t.updateAmount,keypress:function(e){return t.isNumberOrComma(e)}}})]),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.ket,"is-focused":"ket"==t.activeField}},[e("label",{staticClass:"bmd-label-floating"},[t._v(t._s(t.$t("cruds.additional-limit.fields.ket")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.entry.ket},on:{input:t.updateKet,focus:function(e){return t.focusField("ket")},blur:t.clearFocus}})])]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.coa_id,"is-focused":"coa"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.additional-limit.fields.coa_name")))]),t._v(" "),e("v-select",{key:"coa-field",attrs:{name:"coa",label:"name",value:t.entry.coa_id,options:t.lists.coa,reduce:function(t){return t.id}},on:{input:t.updateCoa},scopedSlots:t._u([{key:"search",fn:function(a){var i=a.attributes,s=a.events;return[e("input",t._g(t._b({staticClass:"vs__search",attrs:{required:!t.entry.coa_id}},"input",i,!1),s))]}}])})],1),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.coa_id,"is-focused":"coa"==t.activeField}},[e("label",{staticClass:"required"},[t._v(t._s(t.$t("cruds.additional-limit.fields.coa_code")))]),t._v(" "),e("v-select",{key:"coa-field",attrs:{name:"coa",label:"code",value:t.entry.coa_id,options:t.lists.coa,reduce:function(t){return t.id},disabled:""}})],1)])])],1),t._v(" "),e("div",{staticClass:"card-footer"},[1==t.entry.status&&t.$can("adjustment_edit")?e("div",{staticClass:"col-auto"},[e("button",{staticClass:"btn btn-sm btn-success",staticStyle:{color:"black"},attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.submitForm()}}},[t._v("\n                  Simpan\n              ")])]):t._e(),t._v(" "),1==t.entry.status&&t.$can("adjustment_edit")&&t.$can(t.entry.coa?t.entry.coa.bu.code+"-1":"---")?e("div",{staticClass:"col-auto"},[e("button",{staticClass:"btn btn-sm btn-primary",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.approveData()}}},[t._v("\n                  Approve\n              ")])]):t._e(),t._v(" "),1==t.entry.status&&t.$can("adjustment_edit")&&t.$can(t.entry.coa?t.entry.coa.bu.code+"-1":"---")?e("div",{staticClass:"col-auto"},[e("button",{staticClass:"btn btn-sm btn-danger",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.rejectData()}}},[t._v("\n                  Reject\n              ")])]):t._e(),t._v(" "),e("div",{staticClass:"col-auto"},[e("back-button",{staticClass:"btn-sm"})],1)])])])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-primary card-header-icon"},[t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("add")])]),this._v(" "),t("h4",{staticClass:"card-title"},[t("strong",[this._v("Detail Request Penambahan Limit")])])])}],!1,null,null,null);e.default=l.exports}}]);