(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{GCgq:function(t,e,s){"use strict";s.r(e);var i=s("L2JU");function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function n(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?r(Object(s),!0).forEach((function(e){o(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):r(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function o(t,e,s){return(e=function(t){var e=function(t,e){if("object"!==a(t)||null===t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var i=s.call(t,e||"default");if("object"!==a(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===a(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}var l={data:function(){return{status:"",activeField:"",depts:[]}},computed:n({},Object(i.c)("UsersSingle",["entry","loading","lists"])),beforeDestroy:function(){this.resetState()},watch:{"$route.params.id":{immediate:!0,handler:function(){this.resetState(),this.fetchEditData(this.$route.params.id)}}},methods:n(n({},Object(i.b)("UsersSingle",["fetchEditData","updateData","resetState","setName","setEmail","setUsername","setPassword","setRoles","setBus","setDepts","setListDepts","fetchBuDept","addItem","deleteItem"])),{},{addNewRow:function(){this.addItem()},deleteRow:function(t){var e=this;console.log(t),this.$swal({title:"Hapus Item ini ?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes",showCloseButton:!0}).then((function(s){s.isConfirmed&&e.deleteItem(t)}))},updateUsername:function(t){this.setUsername(t.target.value)},updateName:function(t){this.setName(t.target.value)},updateEmail:function(t){this.setEmail(t.target.value)},updatePassword:function(t){this.setPassword(t.target.value)},updateRoles:function(t,e){this.setRoles({index:t,value:e})},submitForm:function(){var t=this;this.updateData().then((function(){t.$router.push({name:"users.index"}),t.$eventHub.$emit("update-success")})).catch((function(e){t.status="failed",_.delay((function(){t.status=""}),3e3)}))},focusField:function(t){this.activeField=t},clearFocus:function(){this.activeField=""},selectAllBu:function(){this.setBus("all")},deselectAllBu:function(){this.setBus([]),this.setDepts([]),this.setListDepts([])},selectAllDept:function(){this.setDepts("all")},deselectAllDept:function(){this.setDepts([])},updateBu:function(t,e){this.setBus({index:t,value:e}),this.setListDepts({index:t,lists:[]}),this.setDepts({index:t,value:[]}),this.fetchBuDept({index:t,value:e})},updateDept:function(t,e){this.setDepts({index:t,value:e})}})},u=s("KHd+"),c=Object(u.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"container-fluid"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-header card-header-primary card-header-icon"},[t._m(0),t._v(" "),e("h4",{staticClass:"card-title"},[t._v("\n              "+t._s(t.$t("global.edit"))+"\n              "),e("strong",[t._v(t._s(t.$t("cruds.user.title_singular")))])])]),t._v(" "),e("div",{staticClass:"card-body"},[e("back-button")],1),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.name,"is-focused":"name"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v(t._s(t.$t("cruds.user.fields.name")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.entry.name},on:{input:t.updateName,focus:function(e){return t.focusField("name")},blur:t.clearFocus}})]),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.username,"is-focused":"username"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v(t._s(t.$t("cruds.user.fields.username")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:t.entry.username},on:{input:t.updateUsername,focus:function(e){return t.focusField("username")},blur:t.clearFocus}})])]),t._v(" "),e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.email,"is-focused":"email"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v(t._s(t.$t("cruds.user.fields.email")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"email",required:""},domProps:{value:t.entry.email},on:{input:t.updateEmail,focus:function(e){return t.focusField("email")},blur:t.clearFocus}})]),t._v(" "),e("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":t.entry.password,"is-focused":"password"==t.activeField}},[e("label",{staticClass:"bmd-label-floating required"},[t._v(t._s(t.$t("cruds.user.fields.password")))]),t._v(" "),e("input",{staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.entry.password},on:{input:t.updatePassword,focus:function(e){return t.focusField("password")},blur:t.clearFocus}})])])]),t._v(" "),e("div",{staticClass:"card-body"},[e("bootstrap-alert"),t._v(" "),e("table",{staticClass:"table table-bordered",attrs:{name:"inputItem"}},[t._m(1),t._v(" "),e("tbody",t._l(t.entry.bu_roles,(function(s,i){return e("tr",{key:i},[e("td",{staticClass:"trashIconContainer",staticStyle:{width:"40px"},attrs:{scope:"row"}},[e("i",{staticClass:"fa fa-trash-o",on:{click:function(e){return t.deleteRow(i)}}})]),t._v(" "),e("td",{staticStyle:{width:"150px"}},[e("v-select",{key:"bus-field",attrs:{name:"bus",label:"code",value:s.bu_id,options:t.lists.bus,reduce:function(t){return t.id},closeOnSelect:!0},on:{input:function(e){return t.updateBu(i,e)},change:function(e){return t.updateBu(i,e)}}})],1),t._v(" "),e("td",[e("v-select",{key:"depts-field",attrs:{name:"depts",label:"code",value:s.depts,reduce:function(t){return t.id},options:s.list_depts,closeOnSelect:!0,multiple:""},on:{input:function(e){return t.updateDept(i,e)}}})],1),t._v(" "),e("td",{staticStyle:{width:"200px"}},[e("v-select",{key:"roles-field",attrs:{name:"roles",label:"title",value:s.role_id,options:t.lists.roles,reduce:function(t){return t.id},closeOnSelect:!0},on:{input:function(e){return t.updateRoles(i,e)}}})],1)])})),0)]),t._v(" "),e("button",{staticClass:"btn btn-sm btn-info",attrs:{type:"button"},on:{click:t.addNewRow}},[e("i",{staticClass:"fa fa-plus-circle"}),t._v("\n                        Tambah Item\n                    ")])],1)],1),t._v(" "),e("div",{staticClass:"card-footer"},[e("vue-button-spinner",{staticClass:"btn-primary",attrs:{status:t.status,isLoading:t.loading,disabled:t.loading}},[t._v("\n              "+t._s(t.$t("global.save"))+"\n            ")])],1)])])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("edit")])])},function(){var t=this._self._c;return t("thead",[t("th",{staticStyle:{width:"40px"}}),this._v(" "),t("th",{staticStyle:{width:"150px"}},[this._v("BU")]),this._v(" "),t("th",[this._v("Dept")]),this._v(" "),t("th",{staticStyle:{width:"200px"}},[this._v("Role")])])}],!1,null,null,null);e.default=c.exports}}]);