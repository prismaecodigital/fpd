(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[40],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
      query: {
        bu_id: null
      }
    };
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('AdditionalLimitsSingle', ['entry', 'loading', 'lists'])),
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
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])('AdditionalLimitsSingle', ['storeData', 'resetState', 'setDate', 'setCoa', 'setAmount', 'setKet', 'setStatus', 'setReject', 'updateData', 'fetchEditData', 'setQuery'])), {}, {
    updateDate: function updateDate(value) {
      this.setDate(value);
    },
    updateCoa: function updateCoa(value) {
      this.setCoa(value);
    },
    updateAmount: function updateAmount(e) {
      this.setAmount(e.target.value);
    },
    updateKet: function updateKet(e) {
      this.setKet(e.target.value);
    },
    approveData: function approveData() {
      var _this = this;
      this.$swal({
        title: 'Approve?',
        text: 'Yakin ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(function (result) {
        if (result.value) {
          _this.setStatus('9');
          _this.submitForm();
        }
      });
    },
    rejectData: function rejectData() {
      var _this2 = this;
      this.$swal({
        title: 'Reject ?',
        text: 'Masukkan Alasan',
        input: 'text',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(function (result) {
        if (result.value) {
          _this2.setStatus('99');
          var value = result.value;
          _this2.setReject(value);
          _this2.submitForm();
        } else {
          _this2.$swal({
            icon: 'error',
            title: 'Failed',
            text: 'Masukkan Alasan'
          });
        }
      });
    },
    submitForm: function submitForm() {
      var _this3 = this;
      this.updateData().then(function () {
        _this3.$router.push({
          name: 'additional-limits.index'
        });
        _this3.$eventHub.$emit('update-success');
      })["catch"](function (error) {
        _this3.status = 'failed';
        _.delay(function () {
          _this3.status = '';
        }, 3000);
      });
    },
    focusField: function focusField(name) {
      this.activeField = name;
    },
    clearFocus: function clearFocus() {
      this.activeField = '';
    },
    isNumberOrComma: function isNumberOrComma(event) {
      // Allow only numbers and a single comma
      var _char = String.fromCharCode(event.keyCode);
      var isNumber = _char >= '0' && _char <= '9';
      var isComma = _char === ',' && event.target.value.indexOf(',') === -1;
      if (!(isNumber || isComma)) {
        event.preventDefault();
      }
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=template&id=0a3f0acf&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=template&id=0a3f0acf& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._m(0), _vm._v(" "), _c("br"), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("bootstrap-alert"), _vm._v(" "), _vm.$can("adjustment_additional_approve") ? _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.date,
      "is-focused": _vm.activeField == "date"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.date")))]), _vm._v(" "), _c("vue-monthly-picker", {
    attrs: {
      "input-class": "form-control",
      value: _vm.entry.date_label,
      "month-labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "date-format": "MMM yyyy",
      required: ""
    },
    on: {
      input: _vm.updateDate
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.amount,
      "is-focused": _vm.activeField == "amount"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.amount")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control required",
    attrs: {
      type: "text",
      required: ""
    },
    domProps: {
      value: _vm.entry.amount_label
    },
    on: {
      input: _vm.updateAmount,
      keypress: function keypress($event) {
        return _vm.isNumberOrComma($event);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.ket,
      "is-focused": _vm.activeField == "ket"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.ket")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control",
    attrs: {
      type: "text"
    },
    domProps: {
      value: _vm.entry.ket
    },
    on: {
      input: _vm.updateKet,
      focus: function focus($event) {
        return _vm.focusField("ket");
      },
      blur: _vm.clearFocus
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-6"
  }, [_c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.coa_id,
      "is-focused": _vm.activeField == "coa"
    }
  }, [_c("label", {
    staticClass: "required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.coa_name")))]), _vm._v(" "), _c("v-select", {
    key: "coa-field",
    attrs: {
      name: "coa",
      label: "name",
      value: _vm.entry.coa_id,
      options: _vm.lists.coa,
      reduce: function reduce(entry) {
        return entry.id;
      }
    },
    on: {
      input: _vm.updateCoa
    },
    scopedSlots: _vm._u([{
      key: "search",
      fn: function fn(_ref) {
        var attributes = _ref.attributes,
          events = _ref.events;
        return [_c("input", _vm._g(_vm._b({
          staticClass: "vs__search",
          attrs: {
            required: !_vm.entry.coa_id
          }
        }, "input", attributes, false), events))];
      }
    }], null, false, 826641650)
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.coa_id,
      "is-focused": _vm.activeField == "coa"
    }
  }, [_c("label", {
    staticClass: "required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.coa_code")))]), _vm._v(" "), _c("v-select", {
    key: "coa-field",
    attrs: {
      name: "coa",
      label: "code",
      value: _vm.entry.coa_id,
      options: _vm.lists.coa,
      reduce: function reduce(entry) {
        return entry.id;
      },
      disabled: ""
    }
  })], 1)])]) : _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-6"
  }, [_c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.date,
      "is-focused": _vm.activeField == "date"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.date")))]), _vm._v(" "), _c("vue-monthly-picker", {
    attrs: {
      "input-class": "form-control",
      value: _vm.entry.date_label,
      "month-labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "date-format": "MMM yyyy",
      disabled: ""
    },
    on: {
      input: _vm.updateDate
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.amount,
      "is-focused": _vm.activeField == "amount"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.amount")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control required",
    attrs: {
      type: "text",
      disabled: ""
    },
    domProps: {
      value: _vm.entry.amount_label
    },
    on: {
      input: _vm.updateAmount,
      keypress: function keypress($event) {
        return _vm.isNumberOrComma($event);
      }
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.ket,
      "is-focused": _vm.activeField == "ket"
    }
  }, [_c("label", {
    staticClass: "bmd-label-floating"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.ket")))]), _vm._v(" "), _c("input", {
    staticClass: "form-control",
    attrs: {
      type: "text",
      disabled: ""
    },
    domProps: {
      value: _vm.entry.ket
    },
    on: {
      input: _vm.updateKet,
      focus: function focus($event) {
        return _vm.focusField("ket");
      },
      blur: _vm.clearFocus
    }
  })])]), _vm._v(" "), _c("div", {
    staticClass: "col-md-6"
  }, [_c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.coa_id,
      "is-focused": _vm.activeField == "coa"
    }
  }, [_c("label", {
    staticClass: "required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.coa_name")))]), _vm._v(" "), _c("v-select", {
    key: "coa-field",
    attrs: {
      name: "coa",
      label: "name",
      value: _vm.entry.coa_id,
      options: _vm.lists.coa,
      reduce: function reduce(entry) {
        return entry.id;
      },
      disabled: ""
    },
    on: {
      input: _vm.updateCoa
    },
    scopedSlots: _vm._u([{
      key: "search",
      fn: function fn(_ref2) {
        var attributes = _ref2.attributes,
          events = _ref2.events;
        return [_c("input", _vm._g(_vm._b({
          staticClass: "vs__search",
          attrs: {
            required: !_vm.entry.coa_id
          }
        }, "input", attributes, false), events))];
      }
    }])
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "form-group bmd-form-group",
    "class": {
      "is-filled": _vm.entry.coa_id,
      "is-focused": _vm.activeField == "coa"
    }
  }, [_c("label", {
    staticClass: "required"
  }, [_vm._v(_vm._s(_vm.$t("cruds.additional-limit.fields.coa_code")))]), _vm._v(" "), _c("v-select", {
    key: "coa-field",
    attrs: {
      name: "coa",
      label: "code",
      value: _vm.entry.coa_id,
      options: _vm.lists.coa,
      reduce: function reduce(entry) {
        return entry.id;
      },
      disabled: ""
    }
  })], 1)])])], 1), _vm._v(" "), _c("div", {
    staticClass: "card-footer"
  }, [_vm.entry.status == 1 && _vm.$can("adjustment_edit") ? _c("div", {
    staticClass: "col-auto"
  }, [_c("button", {
    staticClass: "btn btn-sm btn-success",
    staticStyle: {
      color: "black"
    },
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.submitForm();
      }
    }
  }, [_vm._v("\n                  Simpan\n              ")])]) : _vm._e(), _vm._v(" "), _vm.entry.status == 1 && _vm.$can("adjustment_additional_approve") ? _c("div", {
    staticClass: "col-auto"
  }, [_c("button", {
    staticClass: "btn btn-sm btn-primary",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.approveData();
      }
    }
  }, [_vm._v("\n                  Approve\n              ")])]) : _vm._e(), _vm._v(" "), _vm.entry.status == 1 && _vm.$can("adjustment_additional_approve") ? _c("div", {
    staticClass: "col-auto"
  }, [_c("button", {
    staticClass: "btn btn-sm btn-danger",
    attrs: {
      type: "button"
    },
    on: {
      click: function click($event) {
        $event.preventDefault();
        return _vm.rejectData();
      }
    }
  }, [_vm._v("\n                  Reject\n              ")])]) : _vm._e(), _vm._v(" "), _c("div", {
    staticClass: "col-auto"
  }, [_c("back-button", {
    staticClass: "btn-sm"
  })], 1)])])])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-header card-header-primary card-header-icon"
  }, [_c("div", {
    staticClass: "card-icon"
  }, [_c("i", {
    staticClass: "material-icons"
  }, [_vm._v("add")])]), _vm._v(" "), _c("h4", {
    staticClass: "card-title"
  }, [_c("strong", [_vm._v("Detail Request Penambahan Limit")])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue":
/*!***************************************************************!*\
  !*** ./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Edit_vue_vue_type_template_id_0a3f0acf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Edit.vue?vue&type=template&id=0a3f0acf& */ "./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=template&id=0a3f0acf&");
/* harmony import */ var _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Edit.vue?vue&type=script&lang=js& */ "./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Edit_vue_vue_type_template_id_0a3f0acf___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Edit_vue_vue_type_template_id_0a3f0acf___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/adminapp/js/cruds/AdditionalLimits/Edit.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=template&id=0a3f0acf&":
/*!**********************************************************************************************!*\
  !*** ./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=template&id=0a3f0acf& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_0a3f0acf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Edit.vue?vue&type=template&id=0a3f0acf& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/AdditionalLimits/Edit.vue?vue&type=template&id=0a3f0acf&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_0a3f0acf___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Edit_vue_vue_type_template_id_0a3f0acf___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);