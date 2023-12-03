(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/pages/Dashboard.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/pages/Dashboard.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_chartjs_legacy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-chartjs/legacy */ "./node_modules/vue-chartjs/legacy/index.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/chart.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




chart_js__WEBPACK_IMPORTED_MODULE_2__["Chart"].register(chart_js__WEBPACK_IMPORTED_MODULE_2__["Title"], chart_js__WEBPACK_IMPORTED_MODULE_2__["Tooltip"], chart_js__WEBPACK_IMPORTED_MODULE_2__["Legend"], chart_js__WEBPACK_IMPORTED_MODULE_2__["LineElement"], chart_js__WEBPACK_IMPORTED_MODULE_2__["BarElement"], chart_js__WEBPACK_IMPORTED_MODULE_2__["LinearScale"], chart_js__WEBPACK_IMPORTED_MODULE_2__["CategoryScale"], chart_js__WEBPACK_IMPORTED_MODULE_2__["PointElement"]);
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    LineChartGenerator: vue_chartjs_legacy__WEBPACK_IMPORTED_MODULE_0__["Line"],
    Bar: vue_chartjs_legacy__WEBPACK_IMPORTED_MODULE_0__["Bar"]
  },
  props: {
    chartId: {
      type: String,
      "default": 'cashIn'
    },
    datasetIdKey: {
      type: String,
      "default": 'label'
    },
    width: {
      type: Number,
      "default": 400
    },
    height: {
      type: Number,
      "default": 400
    },
    cssClasses: {
      "default": '',
      type: String
    },
    styles: {
      type: Object,
      "default": function _default() {}
    },
    plugins: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      query: {
        bu_id: null,
        dept: {
          id: null,
          name: null
        },
        startDate: null,
        endDate: null
      },
      chartOptions_cash_in: {
        legend: {
          display: true
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function label(context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(context.parsed.y * 100) + '%';
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            // 'y' specifies the y-axis
            ticks: {
              callback: function callback(value) {
                return value * 100 + '%'; // Formatting tick labels as percentages
              }
            }
          }
        },

        responsive: true,
        maintainAspectRatio: false
      },
      chartOptions_cash_out: {
        legend: {
          display: true
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function label(context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(context.parsed.y * 100) + '%';
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            // 'y' specifies the y-axis
            ticks: {
              callback: function callback(value) {
                return value * 100 + '%'; // Formatting tick labels as percentages
              }
            }
          }
        },

        responsive: true,
        maintainAspectRatio: false
      },
      chartOptions_coa_dept: {
        legend: {
          display: true
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function label(context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                label += Math.round(context.parsed.x * 100) + '%';
                return label;
              }
            }
          }
        },
        indexAxis: 'y',
        scales: {
          x: {
            // 'y' specifies the y-axis
            ticks: {
              callback: function callback(value) {
                return value * 100 + '%'; // Formatting tick labels as percentages
              }
            }
          }
        },

        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  beforeDestroy: function beforeDestroy() {
    this.resetState();
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"])('ChartIndex', ['chart', 'loading', 'lists'])), Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"])('AuthBu', ['selected_bu'])), {}, {
    updatedQuery: function updatedQuery() {
      return _objectSpread(_objectSpread({}, this.query), {}, {
        bu_id: this.selected_bu ? this.selected_bu.id : null
      });
    }
  }),
  mounted: function mounted() {
    // Set the query.id when the component is mounted
    this.query.bu_id = this.selected_bu ? this.selected_bu.id : null;
  },
  watch: {
    selected_bu: function selected_bu(newSelectedBu) {
      // React to changes in selected_bu
      this.query.bu_id = newSelectedBu ? newSelectedBu.id : null;
    },
    query: {
      handler: function handler(query) {
        this.setQuery(query);
        this.fetchCharts();
      },
      deep: true
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapActions"])('ChartIndex', ['fetchCharts', 'setQuery', 'resetState'])), {}, {
    updateStartDate: function updateStartDate(value) {
      var newValue = JSON.parse(JSON.stringify(value.add(1, 'day'))); // Deep clone with value + 1 month
      this.query.startDate = newValue;
    },
    updateEndDate: function updateEndDate(value) {
      var newValue = JSON.parse(JSON.stringify(value.add(1, 'month').subtract(1, 'second'))); // Deep clone with value + 1 month
      this.query.endDate = newValue;
    },
    updateDept: function updateDept(value) {
      this.query.dept.id = value.id;
      this.query.dept.name = value.name;
      console.log(this.query.dept);
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/pages/Dashboard.vue?vue&type=template&id=0abe2158&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/pages/Dashboard.vue?vue&type=template&id=0abe2158& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
  }, [_c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "card"
  }, [_c("div", {
    staticClass: "card-header card-header-success card-header-icon"
  }, [_vm._m(0), _vm._v(" "), _c("h4", {
    staticClass: "card-title"
  }, [_vm._v("\n            " + _vm._s(_vm.$t("global.dashboard")) + "\n          ")])]), _vm._v(" "), _c("br"), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_vm._v("\n          " + _vm._s(_vm.$t("global.youAreLoggedIn")) + "\n        ")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_vm._v("\n          Jika Anda menemui kendala dalam penggunaan aplikasi, hubungi xxx\n        ")]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_vm._v("\n          Jika Anda menemui error, tekan Ctrl+F5. Jika masih error, hubungi Digitalisasi Prisma\n        ")])])])]), _vm._v(" "), _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "card"
  }, [_vm._m(2), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("div", {
    staticClass: "row justify-content-end"
  }, [_c("div", {
    staticClass: "col-auto",
    staticStyle: {
      width: "200px"
    }
  }, [_c("v-select", {
    key: "dept-field",
    attrs: {
      name: "dept",
      label: "name",
      value: _vm.query.dept,
      options: _vm.lists.dept,
      placeholder: "Dept"
    },
    on: {
      input: _vm.updateDept
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "col-auto"
  }, [_c("vue-monthly-picker", {
    attrs: {
      "input-class": "form-control",
      value: _vm.query.startDate,
      placeHolder: "From Period",
      "month-labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "date-format": "MMM yyyy"
    },
    on: {
      input: _vm.updateStartDate
    }
  }, [_vm._v("\n                    >\n                ")])], 1), _vm._v(" "), _c("div", {
    staticClass: "col-auto"
  }, [_vm._v(" --- ")]), _vm._v(" "), _c("div", {
    staticClass: "col-auto"
  }, [_c("vue-monthly-picker", {
    attrs: {
      "input-class": "form-control",
      placeHolder: "To Period",
      value: _vm.query.endDate,
      "month-labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "date-format": "MMM yyyy"
    },
    on: {
      input: _vm.updateEndDate
    }
  }, [_vm._v("\n                    >\n                    ")])], 1)])]), _vm._v(" "), _c("br"), _vm._v(" "), _c("div", {
    staticClass: "card-header"
  }, [_c("h4", {
    staticStyle: {
      "text-align": "center"
    }
  }, [_c("strong", [_c("b", [_vm._v("\n              Cashflow IN Actual & Projection - " + _vm._s(this.selected_bu ? this.selected_bu.name : "") + "\n            ")])])])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("LineChartGenerator", {
    attrs: {
      "chart-options": _vm.chartOptions_cash_in,
      "chart-data": _vm.chart.cash_in_charts,
      "dataset-id-key": _vm.datasetIdKey,
      "css-classes": _vm.cssClasses,
      styles: _vm.styles,
      width: _vm.width,
      height: _vm.height
    }
  })], 1), _vm._v(" "), _c("br"), _vm._v(" "), _c("div", {
    staticClass: "card-header"
  }, [_c("h4", {
    staticStyle: {
      "text-align": "center"
    }
  }, [_c("strong", [_c("b", [_vm._v("\n              Cashflow OUT Actual & Projection - " + _vm._s(this.selected_bu ? this.selected_bu.name : "") + "\n            ")])])])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("LineChartGenerator", {
    attrs: {
      "chart-options": _vm.chartOptions_cash_out,
      "chart-data": _vm.chart.cash_out_charts,
      "dataset-id-key": _vm.datasetIdKey,
      "css-classes": _vm.cssClasses,
      styles: _vm.styles,
      width: _vm.width,
      height: _vm.height
    }
  })], 1), _vm._v(" "), _c("div", {
    staticClass: "card-header"
  }, [_c("h4", {
    staticStyle: {
      "text-align": "center"
    }
  }, [_c("strong", [_c("b", [_vm._v("\n              Cashflow OUT by DEPT - " + _vm._s(this.query.dept ? this.query.dept.name : "") + "\n            ")])])])]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("Bar", {
    attrs: {
      "chart-options": _vm.chartOptions_coa_dept,
      "chart-data": _vm.chart.coa_dept_charts,
      "dataset-id-key": _vm.datasetIdKey,
      "css-classes": _vm.cssClasses,
      styles: _vm.styles,
      width: _vm.width,
      height: _vm.height
    }
  })], 1)])])]), _vm._v(" "), _vm._m(3)]);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-icon"
  }, [_c("i", {
    staticClass: "material-icons"
  }, [_vm._v("language")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-body"
  }, [_c("a", {
    attrs: {
      href: "https://drive.google.com/drive/folders/1VWyftVKzPYCqIZJs8RGBedUcQbr32rTn?usp=drive_link",
      target: "_blank"
    }
  }, [_vm._v("Link Panduan Penggunaan")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "card-header card-header-success card-header-icon"
  }, [_c("div", {
    staticClass: "card-icon"
  }, [_c("i", {
    staticClass: "material-icons"
  }, [_vm._v("stacked_line_chart")])]), _vm._v(" "), _c("h4", {
    staticClass: "card-title"
  }, [_vm._v("\n            Charts\n          ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("div", {
    staticClass: "row"
  }, [_c("div", {
    staticClass: "col-md-12"
  }, [_c("div", {
    staticClass: "card"
  }, [_c("div", {
    staticClass: "card-header card-header-success card-header-icon"
  }, [_c("div", {
    staticClass: "card-icon"
  }, [_c("i", {
    staticClass: "material-icons"
  }, [_vm._v("summarize")])]), _vm._v(" "), _c("h4", {
    staticClass: "card-title"
  }, [_vm._v("\n            Summary\n          ")])])])])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/adminapp/js/pages/Dashboard.vue":
/*!***************************************************!*\
  !*** ./resources/adminapp/js/pages/Dashboard.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Dashboard_vue_vue_type_template_id_0abe2158___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=template&id=0abe2158& */ "./resources/adminapp/js/pages/Dashboard.vue?vue&type=template&id=0abe2158&");
/* harmony import */ var _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dashboard.vue?vue&type=script&lang=js& */ "./resources/adminapp/js/pages/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Dashboard_vue_vue_type_template_id_0abe2158___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Dashboard_vue_vue_type_template_id_0abe2158___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/adminapp/js/pages/Dashboard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/adminapp/js/pages/Dashboard.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/adminapp/js/pages/Dashboard.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/pages/Dashboard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/adminapp/js/pages/Dashboard.vue?vue&type=template&id=0abe2158&":
/*!**********************************************************************************!*\
  !*** ./resources/adminapp/js/pages/Dashboard.vue?vue&type=template&id=0abe2158& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_0abe2158___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../node_modules/vue-loader/lib??vue-loader-options!./Dashboard.vue?vue&type=template&id=0abe2158& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/pages/Dashboard.vue?vue&type=template&id=0abe2158&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_0abe2158___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Dashboard_vue_vue_type_template_id_0abe2158___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);