(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[87],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      status: '',
      activeField: '',
      depts: []
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('UsersSingle', ['entry', 'loading', 'lists'])),
  beforeDestroy: function beforeDestroy() {
    this.resetState();
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: function handler() {
        this.resetState();
        this.fetchEditData(this.$route.params.id);
      }
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])('UsersSingle', ['fetchEditData', 'updateData', 'resetState', 'setName', 'setEmail', 'setUsername', 'setPassword', 'setRoles', 'setBus', 'setDepts', 'setListDepts', 'fetchBuDept', 'addItem', 'deleteItem'])), {}, {
    addNewRow: function addNewRow() {
      this.addItem();
    },
    deleteRow: function deleteRow(index) {
      var _this = this;
      console.log(index);
      this.$swal({
        title: 'Hapus Item ini ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        showCloseButton: true
      }).then(function (result) {
        if (result.isConfirmed) {
          _this.deleteItem(index);
        }
      });
    },
    updateUsername: function updateUsername(e) {
      this.setUsername(e.target.value);
    },
    updateName: function updateName(e) {
      this.setName(e.target.value);
    },
    updateEmail: function updateEmail(e) {
      this.setEmail(e.target.value);
    },
    updatePassword: function updatePassword(e) {
      this.setPassword(e.target.value);
    },
    updateRoles: function updateRoles(index, value) {
      this.setRoles({
        index: index,
        value: value
      });
    },
    submitForm: function submitForm() {
      var _this2 = this;
      this.updateData().then(function () {
        _this2.$router.push({
          name: 'users.index'
        });
        _this2.$eventHub.$emit('update-success');
      })["catch"](function (error) {
        _this2.status = 'failed';
        _.delay(function () {
          _this2.status = '';
        }, 3000);
      });
    },
    focusField: function focusField(name) {
      this.activeField = name;
    },
    clearFocus: function clearFocus() {
      this.activeField = '';
    },
    selectAllBu: function selectAllBu() {
      this.setBus('all');
    },
    deselectAllBu: function deselectAllBu() {
      this.setBus([]);
      this.setDepts([]);
      this.setListDepts([]);
    },
    selectAllDept: function selectAllDept() {
      this.setDepts('all');
    },
    deselectAllDept: function deselectAllDept() {
      this.setDepts([]);
    },
    updateBu: function updateBu(index, value) {
      this.setBus({
        index: index,
        value: value
      });
      this.setListDepts({
        index: index,
        lists: []
      });
      this.setDepts({
        index: index,
        value: []
      });
      this.fetchBuDept({
        index: index,
        value: value
      });
    },
    updateDept: function updateDept(index, value) {
      this.setDepts({
        index: index,
        value: value
      });
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=template&id=83330428&":
/*!***********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=template&id=83330428& ***!
  \***********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "container-fluid"
  }, [_c("form", {
    on: {
      submit: function submit($event) {
        $event.preventDefault();
        return _vm.submitForm.apply(null, arguments);
      }
    }
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "card"
  }, [_c("div", {
    staticClass: "card-header card-header-primary card-header-icon"
  }, [_vm._m(0), _vm._v(" "), _c("h4", {
    staticClass: "card-title"
  }, [_vm._v("\n              " + _vm._s(_vm.$t("global.edit")) + "\n              "), _c("strong", [_vm._v(_vm._s(_vm.$t("cruds.user.title_singular")))])])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("back-button")], 1), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("bootstrap-alert"), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.name,
      "is-focused": _vm.activeField == "name"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.user.fields.name")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control",
    attrs: {
      type: "text",
      required: ""
    },
    domProps: {
      value: _vm.entry.name
    },
    on: {
      input: _vm.updateName,
      focus: function focus($event) {
        return _vm.focusField("name");
      },
      blur: _vm.clearFocus
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.username,
      "is-focused": _vm.activeField == "username"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.user.fields.username")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control",
    attrs: {
      type: "text",
      required: ""
    },
    domProps: {
      value: _vm.entry.username
    },
    on: {
      input: _vm.updateUsername,
      focus: function focus($event) {
        return _vm.focusField("username");
      },
      blur: _vm.clearFocus
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-6"
  }, [_c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.email,
      "is-focused": _vm.activeField == "email"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.user.fields.email")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control",
    attrs: {
      type: "email",
      required: ""
    },
    domProps: {
      value: _vm.entry.email
    },
    on: {
      input: _vm.updateEmail,
      focus: function focus($event) {
        return _vm.focusField("email");
      },
      blur: _vm.clearFocus
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.password,
      "is-focused": _vm.activeField == "password"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.user.fields.password")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control",
    attrs: {
      type: "password"
    },
    domProps: {
      value: _vm.entry.password
    },
    on: {
      input: _vm.updatePassword,
      focus: function focus($event) {
        return _vm.focusField("password");
      },
      blur: _vm.clearFocus
    }
  })])])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("bootstrap-alert"), _vm._v(" "), _c("table", {
    staticClass: "table table-bordered",
    attrs: {
      name: "inputItem"
    }
  }, [_vm._m(1), _vm._v(" "), _c("tbody", _vm._l(_vm.entry.bu_roles, function (buRole, k) {
    return _c("tr", {
      key: k
    }, [_c("td", {
      staticClass: "trashIconContainer",
      staticStyle: {
        width: "40px"
      },
      attrs: {
        scope: "row"
      }
    }, [_c("i", {
      staticClass: "fa fa-trash-o",
      on: {
        click: function click($event) {
          return _vm.deleteRow(k);
        }
      }
    })]), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "150px"
      }
    }, [_c("v-select", {
      key: "bus-field",
      attrs: {
        name: "bus",
        label: "code",
        value: buRole.bu_id,
        options: _vm.lists.bus,
        reduce: function reduce(bu) {
          return bu.id;
        },
        closeOnSelect: true
      },
      on: {
        input: function input($event) {
          return _vm.updateBu(k, $event);
        },
        change: function change($event) {
          return _vm.updateBu(k, $event);
        }
      }
    })], 1), _vm._v(" "), _c("td", [_c("v-select", {
      key: "depts-field",
      attrs: {
        name: "depts",
        label: "code",
        value: buRole.depts,
        reduce: function reduce(depts) {
          return depts.id;
        },
        options: buRole.list_depts,
        closeOnSelect: true,
        multiple: ""
      },
      on: {
        input: function input($event) {
          return _vm.updateDept(k, $event);
        }
      }
    })], 1), _vm._v(" "), _c("td", {
      staticStyle: {
        width: "200px"
      }
    }, [_c("v-select", {
      key: "roles-field",
      attrs: {
        name: "roles",
        label: "title",
        value: buRole.role_id,
        options: _vm.lists.roles,
        reduce: function reduce(role) {
          return role.id;
        },
        closeOnSelect: true
      },
      on: {
        input: function input($event) {
          return _vm.updateRoles(k, $event);
        }
      }
    })], 1)]);
  }), 0)]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-sm btn-info",
    attrs: {
      type: "button"
    },
    on: {
      click: _vm.addNewRow
    }
  }, [_c("i", {
    staticClass: "fa fa-plus-circle"
  }), _vm._v("\n                        Tambah Item\n                    ")])], 1)], 1), _vm._v(" "), _c("div", {
    staticClass: "card-footer"
  }, [_c("vue-button-spinner", {
    staticClass: "btn-primary",
    attrs: {
      status: _vm.status,
      isLoading: _vm.loading,
      disabled: _vm.loading
    }
  }, [_vm._v("\n              " + _vm._s(_vm.$t("global.save")) + "\n            ")])], 1)])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-icon"
  }, [_c("i", {
    staticClass: "material-icons"
  }, [_vm._v("edit")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("th", {
    staticStyle: {
      width: "40px"
    }
  }), _vm._v(" "), _c("th", {
    staticStyle: {
      width: "150px"
    }
  }, [_vm._v("BU")]), _vm._v(" "), _c("th", [_vm._v("Dept")]), _vm._v(" "), _c("th", {
    staticStyle: {
      width: "200px"
    }
  }, [_vm._v("Role")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/adminapp/js/cruds/Users/Edit.vue":
/*!****************************************************!*\
  !*** ./resources/adminapp/js/cruds/Users/Edit.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_83330428___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=83330428& */ "./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=template&id=83330428&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_83330428___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_83330428___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/adminapp/js/cruds/Users/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=template&id=83330428&":
/*!***********************************************************************************!*\
  !*** ./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=template&id=83330428& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_83330428___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=83330428& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/Users/Edit.vue?vue&type=template&id=83330428&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_83330428___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_83330428___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);