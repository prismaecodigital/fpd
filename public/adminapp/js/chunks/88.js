(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[88],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_Datatables_DatatableSingle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @components/Datatables/DatatableSingle */ "./resources/adminapp/js/components/Datatables/DatatableSingle.vue");
/* harmony import */ var _components_Datatables_DatatableEnum__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @components/Datatables/DatatableEnum */ "./resources/adminapp/js/components/Datatables/DatatableEnum.vue");
/* harmony import */ var _components_Datatables_DatatableAttachments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @components/Datatables/DatatableAttachments */ "./resources/adminapp/js/components/Datatables/DatatableAttachments.vue");
/* harmony import */ var vue_cute_timeline_dist_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-cute-timeline/dist/index.css */ "./node_modules/vue-cute-timeline/dist/index.css");
/* harmony import */ var vue_cute_timeline_dist_index_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(vue_cute_timeline_dist_index_css__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    DatatableSingle: _components_Datatables_DatatableSingle__WEBPACK_IMPORTED_MODULE_1__["default"],
    DatatableEnum: _components_Datatables_DatatableEnum__WEBPACK_IMPORTED_MODULE_2__["default"],
    DatatableAttachments: _components_Datatables_DatatableAttachments__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  data: function data() {
    return {};
  },
  beforeDestroy: function beforeDestroy() {
    this.resetState();
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('FpdsSingle', ['entry', 'timelineData'])),
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: function handler() {
        this.resetState();
        this.fetchShowData(this.$route.params.id);
      }
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])('FpdsSingle', ['fetchShowData', 'resetState'])), {}, {
    formatCurrency: function formatCurrency(value) {
      var val = (value / 1).toFixed(2).replace('.', ',');
      return 'Rp. ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=template&id=66b53970&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=template&id=66b53970& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function render() {
  var _vm$entry$processed_d, _vm$entry$code_vouche, _vm$entry$code_vouche2, _vm$entry$total_amoun;
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "container-fluid"
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
  }, [_vm._v("\n            " + _vm._s(_vm.$t("global.view")) + " Detail\n            "), _c("strong", [_vm._v(_vm._s(_vm.$t("cruds.fpd.title_singular")))])])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-lg-3"
  }, [_c("back-button")], 1)])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "table-responsive"
  }, [_c("div", {
    staticClass: "table"
  }, [_c("tbody", [_c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.code")) + "\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s(_vm.entry.code) + "\n                      ")])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.user")) + "\n                      ")]), _vm._v(" "), _c("td", [_c("datatable-single", {
    attrs: {
      row: _vm.entry,
      field: "user.name"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.created_at")) + "\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s(_vm.entry.created_at) + "\n                      ")])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.name")) + "\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s(_vm.entry.name) + "\n                      ")])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.bu")) + "\n                      ")]), _vm._v(" "), _c("td", [_c("datatable-single", {
    attrs: {
      row: _vm.entry,
      field: "bu.name"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.dept")) + "\n                      ")]), _vm._v(" "), _c("td", [_c("datatable-single", {
    attrs: {
      row: _vm.entry,
      field: "dept.name"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.req_date")) + "\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s(_vm.entry.req_date) + "\n                      ")])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.processed_date")) + "\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s((_vm$entry$processed_d = _vm.entry.processed_date) !== null && _vm$entry$processed_d !== void 0 ? _vm$entry$processed_d : "-") + "\n                      ")])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.transact_type")) + "\n                      ")]), _vm._v(" "), _c("td", [_c("datatable-enum", {
    attrs: {
      row: _vm.entry,
      field: "transact_type"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.klasifikasi")) + "\n                      ")]), _vm._v(" "), _c("td", [_c("datatable-enum", {
    attrs: {
      row: _vm.entry,
      field: "klasifikasi"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.code_voucher")) + "\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s((_vm$entry$code_vouche = _vm.entry.code_voucher) !== null && _vm$entry$code_vouche !== void 0 ? _vm$entry$code_vouche : "-") + "\n                      ")])]), _vm._v(" "), _vm.entry.code_voucher_lrd ? _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.code_voucher_lrd")) + "\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        " + _vm._s((_vm$entry$code_vouche2 = _vm.entry.code_voucher_lrd) !== null && _vm$entry$code_vouche2 !== void 0 ? _vm$entry$code_vouche2 : "-") + "\n                      ")])]) : _vm._e(), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        Total\n                      ")]), _vm._v(" "), _c("td", [_vm._v("\n                        Rp. " + _vm._s((_vm$entry$total_amoun = _vm.entry.total_amount) !== null && _vm$entry$total_amoun !== void 0 ? _vm$entry$total_amoun : "-") + "\n                      ")])]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.status")) + "\n                      ")]), _vm._v(" "), _c("td", [_c("datatable-enum", {
    attrs: {
      row: _vm.entry,
      field: "status"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.lampiran")) + "\n                      ")]), _vm._v(" "), _c("td", [_c("datatable-attachments", {
    attrs: {
      row: _vm.entry,
      field: "lampiran"
    }
  })], 1)]), _vm._v(" "), _c("tr", [_c("td", {
    staticClass: "text-primary"
  }, [_vm._v("\n                        " + _vm._s(_vm.$t("cruds.fpd.fields.bukti_transfer")) + "\n                      ")]), _vm._v(" "), _c("td", [_c("datatable-attachments", {
    attrs: {
      row: _vm.entry,
      field: "bukti_transfer"
    }
  })], 1)])])])])])])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("bootstrap-alert"), _vm._v(" "), _c("table", {
    staticClass: "table table-bordered",
    attrs: {
      name: "inputItem"
    }
  }, [_c("thead", [_c("th", [_vm._v("Account")]), _vm._v(" "), _c("th", [_vm._v("Nominal")]), _vm._v(" "), parseInt(_vm.entry.status) > 4 ? _c("th", [_vm._v("Realisasi Amount")]) : _vm._e(), _vm._v(" "), _c("th", [_vm._v("Site")]), _vm._v(" "), _c("th", [_vm._v("Notes")])]), _vm._v(" "), _c("tbody", _vm._l(_vm.entry.items, function (item, k) {
    return _c("tr", {
      key: k
    }, [_c("td", [_vm._v("\n                    " + _vm._s(item.account.name) + "\n                ")]), _vm._v(" "), _c("td", [_vm._v("\n                    " + _vm._s(_vm.formatCurrency(item.amount)) + "\n                ")]), _vm._v(" "), parseInt(_vm.entry.status) > 4 ? _c("td", [_vm._v("\n                    " + _vm._s(item.real_amount) + "\n                ")]) : _vm._e(), _vm._v(" "), _c("td", [_vm._v("\n                    " + _vm._s(item.site ? item.site.name : "-") + "\n                ")]), _vm._v(" "), _c("td", [_vm._v("\n                    " + _vm._s(item.ket) + "\n                ")])]);
  }), 0)])], 1), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_vm._m(1), _vm._v(" "), _vm._l(_vm.timelineData, function (item, index) {
    return _c("timeline", {
      key: index
    }, [item.proses == "selesai" ? _c("timeline-item", {
      attrs: {
        "bg-color": "green"
      }
    }, [_vm._v("\n                " + _vm._s(item.status) + "\n                "), item.tanggal ? _c("p", [_vm._v("Tanggal : " + _vm._s(item.tanggal))]) : _vm._e(), _vm._v(" "), item.user ? _c("p", [_vm._v("Diproses Oleh : " + _vm._s(item.user))]) : _vm._e()]) : _vm._e(), _vm._v(" "), item.proses == "proses" ? _c("timeline-item", {
      attrs: {
        "bg-color": "yellow"
      }
    }, [_vm._v("\n                " + _vm._s(item.status) + "\n                "), item.tanggal ? _c("p", [_vm._v("Tanggal : " + _vm._s(item.tanggal))]) : _vm._e()]) : _vm._e(), _vm._v(" "), item.proses == "" ? _c("timeline-item", {
      attrs: {
        "bg-color": "red"
      }
    }, [_vm._v("\n                " + _vm._s(item.status) + "\n              ")]) : _vm._e()], 1);
  })], 2)])])])]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-icon"
  }, [_c("i", {
    staticClass: "material-icons"
  }, [_vm._v("remove_red_eye")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("h4", [_c("strong", [_vm._v("Alur Pengajuan FPD")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/adminapp/js/cruds/Fpds/Show.vue":
/*!***************************************************!*\
  !*** ./resources/adminapp/js/cruds/Fpds/Show.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Show_vue_vue_type_template_id_66b53970___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Show.vue?vue&type=template&id=66b53970& */ "./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=template&id=66b53970&");
/* harmony import */ var _Show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Show.vue?vue&type=script&lang=js& */ "./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Show_vue_vue_type_template_id_66b53970___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Show_vue_vue_type_template_id_66b53970___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/adminapp/js/cruds/Fpds/Show.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Show.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=template&id=66b53970&":
/*!**********************************************************************************!*\
  !*** ./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=template&id=66b53970& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_template_id_66b53970___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Show.vue?vue&type=template&id=66b53970& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/Fpds/Show.vue?vue&type=template&id=66b53970&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_template_id_66b53970___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Show_vue_vue_type_template_id_66b53970___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);