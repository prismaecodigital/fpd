(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[53],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var _components_BootstrapAlert_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/BootstrapAlert.vue */ "./resources/adminapp/js/components/BootstrapAlert.vue");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.mjs");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    BootstrapAlert: _components_BootstrapAlert_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      status: '',
      activeField: '',
      query: {
        bu_id: null
      }
    };
  },
  computed: _objectSpread(_objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('CashOutProjectionsSingle', ['entry', 'loading', 'lists'])), Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapGetters"])('AuthBu', ['selected_bu'])), {}, {
    updatedQuery: function updatedQuery() {
      return _objectSpread(_objectSpread({}, this.query), {}, {
        bu_id: this.selected_bu.id
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
      this.query.bu_id = newSelectedBu.id;
    },
    query: {
      handler: function handler(query) {
        this.setQuery(query);
        this.fetchCreateData();
        this.resetState();
      },
      deep: true
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.resetState();
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_0__["mapActions"])('CashOutProjectionsSingle', ['storeData', 'resetState', 'setCoa', 'setDate', 'setProjectionAmount', 'setBu', 'setDept', 'fetchCreateData', 'addItem', 'deleteItem', 'setQuery', 'setEntry'])), {}, {
    updateCoa: function updateCoa(index, value) {
      this.setCoa({
        index: index,
        value: value
      });
    },
    updateDate: function updateDate(index, value) {
      console.log(value);
      this.setDate({
        index: index,
        value: value
      });
    },
    updateProjectionAmount: function updateProjectionAmount(index, e) {
      this.setProjectionAmount({
        index: index,
        value: e.target.value
      });
    },
    updateDept: function updateDept(index, value) {
      this.setDept({
        index: index,
        value: value
      });
    },
    updateBu: function updateBu(value) {
      this.setBu(value);
    },
    submitForm: function submitForm() {
      var _this = this;
      this.storeData().then(function () {
        _this.$router.push({
          name: 'cash-out-projections.index'
        });
        _this.$eventHub.$emit('create-success');
      })["catch"](function (error) {
        _this.status = 'failed';
        _.delay(function () {
          _this.status = '';
        }, 3000);
      });
    },
    focusField: function focusField(name) {
      this.activeField = name;
    },
    clearFocus: function clearFocus() {
      this.activeField = '';
    },
    addNewRow: function addNewRow() {
      this.addItem();
    },
    deleteRow: function deleteRow(index) {
      var _this2 = this;
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
          _this2.deleteItem(index);
        }
      });
    },
    updateExcelCoa: function updateExcelCoa(index, value) {
      var item = this.lists.coa.find(function (obj) {
        return obj.code === value;
      });
      this.setCoa({
        index: index,
        value: item.id
      });
      // imported from excel
    },
    updateExcelProjection: function updateExcelProjection(index, value) {
      this.setProjectionAmount({
        index: index,
        value: value
      });
      // imported from excel
    },
    updateExcelDate: function updateExcelDate(index, value) {
      console.log(value);
      this.setDate({
        index: index,
        value: value
      });
      // imported from excel
    },
    updateExcelDept: function updateExcelDept(index, value) {
      var item = this.lists.dept.find(function (obj) {
        return obj.code === value;
      });
      this.setDept({
        index: index,
        value: item.id
      });
    },
    handleFileUpload: function handleFileUpload(event) {
      var file = event.target.files[0];
      if (file) {
        this.readExcelFile(file);
      }
    },
    readExcelFile: function readExcelFile(file) {
      var _this3 = this;
      var reader = new FileReader();
      reader.onload = function (event) {
        var data = event.target.result;
        var workbook = Object(xlsx__WEBPACK_IMPORTED_MODULE_2__["read"])(data, {
          type: 'binary'
        });
        var sheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[sheetName];
        var excelData = xlsx__WEBPACK_IMPORTED_MODULE_2__["utils"].sheet_to_json(worksheet, {
          raw: false
        });
        var rowExcel = excelData.filter(function (obj) {
          return obj.hasOwnProperty('coa_code');
        });
        console.log(rowExcel);
        // Process the excelData and add new rows based on the 'qty' column
        for (var i = 0; i < rowExcel.length; i++) {
          var rowData = rowExcel[i];
          if (rowData.coa_code !== undefined) {
            if (i !== 0) {
              _this3.addItem();
            }
            console.log(rowData);
            _this3.updateExcelCoa(i, rowData.coa_code);
            _this3.updateExcelProjection(i, rowData.projection);
            _this3.updateExcelDate(i, rowData.period);
            _this3.updateExcelDept(i, rowData.dept);
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=template&id=33424137&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!./node_modules/vue-loader/lib??vue-loader-options!./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=template&id=33424137& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
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
  }, [_vm._v("\n              " + _vm._s(_vm.$t("global.create")) + "\n              "), _c("strong", [_vm._v(_vm._s(_vm.$t("cruds.cash-out-projection.title_singular")) + " " + _vm._s(this.selected_bu ? this.selected_bu.code : ""))])])]), _vm._v(" "), _c("div", {
    staticClass: "card-header card-header-primary card-header-icon"
  }, [_c("h4", {
    staticClass: "card-title"
  }, [_c("br"), _c("br"), _vm._v("\n              Upload CSV : "), _c("input", {
    attrs: {
      type: "file"
    },
    on: {
      change: _vm.handleFileUpload
    }
  })]), _vm._v(" "), _c("input", {
    attrs: {
      type: "text",
      hidden: ""
    },
    domProps: {
      value: _vm.entry.bu_id
    }
  })]), _vm._v(" "), _c("div", {
    staticClass: "card-body"
  }, [_c("bootstrap-alert"), _vm._v(" "), _c("table", {
    staticClass: "table table-bordered",
    attrs: {
      name: "inputItem"
    }
  }, [_vm._m(1), _vm._v(" "), _c("tbody", _vm._l(_vm.entry.items, function (item, k) {
    return _c("tr", {
      key: k
    }, [_c("td", {
      staticClass: "trashIconContainer",
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
    })]), _vm._v(" "), _c("td", [_c("vue-monthly-picker", {
      attrs: {
        "input-class": "form-control",
        value: item.date_label,
        "month-labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        "date-format": "MMM yyyy"
      },
      on: {
        input: function input($event) {
          return _vm.updateDate(k, $event);
        }
      }
    })], 1), _vm._v(" "), _c("td", [_c("v-select", {
      key: "coa-field",
      attrs: {
        name: "coa",
        label: "code",
        value: item.coa_id,
        options: _vm.lists.coa,
        reduce: function reduce(coa) {
          return coa.id;
        },
        disabled: ""
      }
    })], 1), _vm._v(" "), _c("td", [_c("v-select", {
      key: "coa-field",
      attrs: {
        name: "coa",
        label: "name",
        value: item.coa_id,
        options: _vm.lists.coa,
        reduce: function reduce(coa) {
          return coa.id;
        }
      },
      on: {
        input: function input($event) {
          return _vm.updateCoa(k, $event);
        }
      },
      scopedSlots: _vm._u([{
        key: "search",
        fn: function fn(_ref) {
          var attributes = _ref.attributes,
            events = _ref.events;
          return [_c("input", _vm._g(_vm._b({
            staticClass: "vs__search",
            attrs: {
              required: !item.coa_id
            }
          }, "input", attributes, false), events))];
        }
      }], null, true)
    })], 1), _vm._v(" "), _c("td", [_vm._v("\n                      Rp. "), _c("input", {
      staticClass: "inputRp wrapText required",
      attrs: {
        type: "number",
        required: ""
      },
      domProps: {
        value: item.projection_amount
      },
      on: {
        input: function input($event) {
          return _vm.updateProjectionAmount(k, $event);
        }
      }
    })]), _vm._v(" "), _c("td", [_c("v-select", {
      key: "dept-field",
      attrs: {
        name: "dept",
        label: "code",
        value: item.dept_id,
        options: _vm.lists.dept,
        reduce: function reduce(dept) {
          return dept.id;
        }
      },
      on: {
        input: function input($event) {
          return _vm.updateDept(k, $event);
        }
      }
    })], 1)]);
  }), 0)]), _vm._v(" "), _c("button", {
    staticClass: "btn btn-sm btn-dark",
    attrs: {
      type: "button"
    },
    on: {
      click: _vm.addNewRow
    }
  }, [_c("i", {
    staticClass: "fa fa-plus-circle"
  }), _vm._v("\n                Tambah Item\n            ")])], 1), _vm._v(" "), _c("div", {
    staticClass: "card-footer"
  }, [_c("vue-button-spinner", {
    staticClass: "btn-sm btn-primary",
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
  }, [_vm._v("add")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c("thead", [_c("th"), _vm._v(" "), _c("th", [_vm._v("Date")]), _vm._v(" "), _c("th", [_vm._v("COA")]), _vm._v(" "), _c("th", [_vm._v("Nama")]), _vm._v(" "), _c("th", [_vm._v("Projection ")]), _vm._v(" "), _c("th", [_vm._v("Dept")])]);
}];
render._withStripped = true;


/***/ }),

/***/ "./resources/adminapp/js/cruds/CashOutProjections/Create.vue":
/*!*******************************************************************!*\
  !*** ./resources/adminapp/js/cruds/CashOutProjections/Create.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Create_vue_vue_type_template_id_33424137___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Create.vue?vue&type=template&id=33424137& */ "./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=template&id=33424137&");
/* harmony import */ var _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Create.vue?vue&type=script&lang=js& */ "./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Create_vue_vue_type_template_id_33424137___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Create_vue_vue_type_template_id_33424137___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/adminapp/js/cruds/CashOutProjections/Create.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=template&id=33424137&":
/*!**************************************************************************************************!*\
  !*** ./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=template&id=33424137& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_33424137___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??ref--6!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Create.vue?vue&type=template&id=33424137& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/adminapp/js/cruds/CashOutProjections/Create.vue?vue&type=template&id=33424137&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_33424137___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_loaders_templateLoader_js_ref_6_node_modules_vue_loader_lib_index_js_vue_loader_options_Create_vue_vue_type_template_id_33424137___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);