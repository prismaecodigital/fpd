(window.webpackJsonp=window.webpackJsonp||[]).push([[77],{VU6O:function(e,t,s){"use strict";s.r(t);var i=s("L2JU");function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,i)}return s}function o(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?a(Object(s),!0).forEach((function(t){l(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):a(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}function l(e,t,s){return(t=function(e){var t=function(e,t){if("object"!==r(e)||null===e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var i=s.call(e,t||"default");if("object"!==r(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"===r(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}var n={data:function(){return{status:"",activeField:"",depts:[]}},computed:o({},Object(i.c)("ProfileSingle",["entry","loading","lists"])),beforeDestroy:function(){this.resetState()},watch:{"$route.params":{immediate:!0,handler:function(){this.resetState(),this.fetchEditData()}}},methods:o(o({},Object(i.b)("ProfileSingle",["fetchEditData","updateData","resetState","setName","setUsername","setEmail","setPassword","setRoles","setBu","setDept","setNotifable"])),{},{updateName:function(e){this.setName(e.target.value)},updateNotifable:function(){this.setNotifable()},updateUsername:function(e){this.setUsername(e.target.value)},updateEmail:function(e){this.setEmail(e.target.value)},updatePassword:function(e){this.setPassword(e.target.value)},updateRoles:function(e){this.setRoles(e)},submitForm:function(){var e=this;this.updateData().then((function(){e.$router.push({name:"dashboard"}),e.$eventHub.$emit("update-success")})).catch((function(t){e.status="failed",_.delay((function(){e.status=""}),3e3)}))},focusField:function(e){this.activeField=e},clearFocus:function(){this.activeField=""},updateBu:function(e){var t=this;this.setDept([]);var s=e.map((function(e){return e.id}));this.setBu(e),null!=e[0]?axios.get("/budept-all",{params:{bu:s}}).then((function(e){t.depts=e.data})).catch((function(e){console.log(e)})):this.depts=[],console.log("ok")},updateDept:function(e){this.setDept(e)}})},u=s("KHd+"),c=Object(u.a)(n,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"container-fluid"},[t("form",{on:{submit:function(t){return t.preventDefault(),e.submitForm.apply(null,arguments)}}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-12"},[t("div",{staticClass:"card"},[t("div",{staticClass:"card-header card-header-primary card-header-icon"},[e._m(0),e._v(" "),t("h4",{staticClass:"card-title"},[e._v("\n              "+e._s(e.$t("global.edit"))+"\n              "),t("strong",[e._v("Profil")])])]),e._v(" "),t("div",{staticClass:"card-body"},[t("back-button")],1),e._v(" "),t("div",{staticClass:"card-body"},[t("bootstrap-alert"),e._v(" "),t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-12"},[t("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.name,"is-focused":"name"==e.activeField}},[t("label",{staticClass:"bmd-label-floating required"},[e._v(e._s(e.$t("cruds.user.fields.name")))]),e._v(" "),t("input",{staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:e.entry.name},on:{input:e.updateName,focus:function(t){return e.focusField("name")},blur:e.clearFocus}})]),e._v(" "),t("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.username,"is-focused":"username"==e.activeField}},[t("label",{staticClass:"bmd-label-floating required"},[e._v(e._s(e.$t("cruds.user.fields.username")))]),e._v(" "),t("input",{staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:e.entry.username},on:{input:e.updateUsername,focus:function(t){return e.focusField("username")},blur:e.clearFocus}})]),e._v(" "),t("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.email,"is-focused":"email"==e.activeField}},[t("label",{staticClass:"bmd-label-floating required"},[e._v(e._s(e.$t("cruds.user.fields.email")))]),e._v(" "),t("input",{staticClass:"form-control",attrs:{type:"text",required:""},domProps:{value:e.entry.email},on:{input:e.updateEmail,focus:function(t){return e.focusField("email")},blur:e.clearFocus}})]),e._v(" "),t("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.password,"is-focused":"password"==e.activeField}},[t("label",{staticClass:"bmd-label-floating"},[e._v(e._s(e.$t("cruds.user.fields.password")))]),e._v(" "),t("input",{staticClass:"form-control",attrs:{type:"password"},domProps:{value:e.entry.password},on:{input:e.updatePassword,focus:function(t){return e.focusField("password")},blur:e.clearFocus}})]),e._v(" "),t("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":0!==e.entry.roles.length,"is-focused":"roles"==e.activeField}},[t("label",{staticClass:"required"},[e._v(e._s(e.$t("cruds.user.fields.roles")))]),e._v(" "),t("v-select",{key:"roles-field",attrs:{name:"roles",label:"title",value:e.entry.roles,options:e.lists.roles,closeOnSelect:!1,multiple:"",disabled:!0},on:{input:e.updateRoles,search:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"focus",void 0,t.key,void 0)?null:e.focusField("roles")},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"blur",void 0,t.key,void 0)?null:e.clearFocus.apply(null,arguments)}]}})],1),e._v(" "),t("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":0!==e.entry.depts.length,"is-focused":"bus"==e.activeField}},[t("label",{},[e._v(e._s(e.$t("cruds.user.fields.bu")))]),e._v(" "),t("v-select",{key:"bus-field",attrs:{name:"bus",label:"name",value:e.entry.bus,options:e.lists.bus,closeOnSelect:!1,disabled:!0,multiple:""},on:{input:e.updateBu,search:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"focus",void 0,t.key,void 0)?null:e.focusField("depts")},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"blur",void 0,t.key,void 0)?null:e.clearFocus.apply(null,arguments)}]}})],1),e._v(" "),t("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":0!==e.entry.depts.length,"is-focused":"depts"==e.activeField}},[t("label",{},[e._v(e._s(e.$t("cruds.user.fields.dept")))]),e._v(" "),t("v-select",{key:"depts-field",attrs:{name:"depts",label:"name",value:e.entry.depts,options:e.depts,closeOnSelect:!1,multiple:"",disabled:!0},on:{input:e.updateDept,search:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"focus",void 0,t.key,void 0)?null:e.focusField("depts")},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"blur",void 0,t.key,void 0)?null:e.clearFocus.apply(null,arguments)}]}})],1),e._v(" "),t("div",{staticClass:"form-group bmd-form-group",class:{"is-filled":e.entry.notifable,"is-focused":"notifable"==e.activeField}},[t("input",{attrs:{type:"checkbox"},domProps:{checked:e.entry.notifable},on:{change:e.updateNotifable}}),e._v(" "),t("label",{},[e._v("Ijinkan Notifikasi")])])])])],1),e._v(" "),t("div",{staticClass:"card-footer"},[t("vue-button-spinner",{staticClass:"btn-primary",attrs:{status:e.status,isLoading:e.loading,disabled:e.loading}},[e._v("\n              "+e._s(e.$t("global.save"))+"\n            ")])],1)])])])])])}),[function(){var e=this._self._c;return e("div",{staticClass:"card-icon"},[e("i",{staticClass:"material-icons"},[this._v("edit")])])}],!1,null,null,null);t.default=c.exports}}]);