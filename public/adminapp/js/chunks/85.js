(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{"2jrp":function(t,a,e){"use strict";e.r(a);var r=e("L2JU");function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function n(t,a){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),e.push.apply(e,r)}return e}function i(t){for(var a=1;a<arguments.length;a++){var e=null!=arguments[a]?arguments[a]:{};a%2?n(Object(e),!0).forEach((function(a){l(t,a,e[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):n(Object(e)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))}))}return t}function l(t,a,e){return(a=function(t){var a=function(t,a){if("object"!==s(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var r=e.call(t,a||"default");if("object"!==s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===a?String:Number)(t)}(t,"string");return"symbol"===s(a)?a:String(a)}(a))in t?Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[a]=e,t}var c={components:{},data:function(){return{query:{bu_id:null,startDate:null,endDate:null}}},mounted:function(){this.query.bu_id=this.selected_bu?this.selected_bu.id:null},beforeDestroy:function(){this.resetState()},computed:i(i({},Object(r.c)("WeeklyCashflow",["data","total","loading"])),Object(r.c)("AuthBu",["selected_bu"])),methods:i(i({},Object(r.b)("WeeklyCashflow",["fetchCalendarData","setQuery","resetState"])),{},{updateStartDate:function(t){this.query.startDate=t.target.value},updateEndDate:function(t){this.query.endDate=t.target.value}}),watch:{selected_bu:function(t){this.query.bu_id=t.id},query:{handler:function(t){this.setQuery(t),t.bu_id&&t.startDate&&t.endDate&&(this.fetchCalendarData(),console.log("fetch calendar data success"))},deep:!0}}},o=e("KHd+"),d=Object(o.a)(c,(function(){var t=this,a=t._self._c;return a("div",{staticClass:"container-fluid"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"card"},[t._m(0),t._v(" "),a("div",{staticClass:"card-header"},[a("button",{staticClass:"btn btn-primary",class:{disabled:t.loading},attrs:{type:"button",disabled:t.loading},on:{click:t.fetchCalendarData}},[a("i",{staticClass:"material-icons",class:{"fa-spin":t.loading}},[t._v("\r\n                            refresh\r\n                        ")]),t._v("\r\n                        "+t._s(t.$t("global.refresh"))+"\r\n                    ")]),t._v(" "),a("h4",{staticStyle:{"text-align":"center"}},[a("strong",[a("b",[t._v("\r\n                    Data Cashflow - "+t._s(this.selected_bu?this.selected_bu.name:"")+"\r\n                    ")])])])]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"table-overlay"},[a("div",{staticClass:"table-overlay-container"},[a("material-spinner"),t._v(" "),a("span",[t._v("Loading...")])],1)]),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"row justify-content-end"},[a("div",{staticClass:"col-auto"},[a("datetime-picker",{staticClass:"form-control",attrs:{type:"text",picker:"date",placeHolder:"From",value:t.query.startDate,required:""},on:{input:t.updateStartDate}})],1),t._v(" "),a("div",{staticClass:"col-auto"},[t._v(" --- ")]),t._v(" "),a("div",{staticClass:"col-auto"},[a("datetime-picker",{staticClass:"form-control",attrs:{type:"text",picker:"date",placeHolder:"To",value:t.query.endDate,required:""},on:{input:t.updateEndDate}})],1)])]),t._v(" "),t._m(1),t._v(" "),a("div",{staticClass:"card-body"},[Object.keys(t.data.cashIn).length>1?a("div",{staticClass:"table-responsive"},[Object.keys(t.data.cashIn).length>1?a("table",{staticClass:"table table-bordered"},[a("thead",[a("th",{staticStyle:{"background-color":"#abb6ff"}},[t._v("Partner")]),t._v(" "),t._l(t.data.cashIn[0].data,(function(e,r){return a("th",{key:r,staticStyle:{"background-color":"#abb6ff"}},[t._v("\r\n                                    "+t._s(r)+"\r\n                                ")])}))],2),t._v(" "),a("tbody",t._l(t.data.cashIn,(function(e,r){return a("tr",{key:r},[a("td",["total"!==r?a("span",[a("router-link",{attrs:{to:{name:"cash-ins.edit",params:{id:e.id}},target:"_blank"}},[t._v("\r\n                                                "+t._s(e.partner)+"\r\n                                            ")])],1):a("span",[t._v("\r\n                                            Total\r\n                                        ")])]),t._v(" "),t._l(t.data.cashIn[0].data,(function(s,n){return a("td",{key:n},["total"!==r&&e.data[n].length>0?a("span",[e.data[n][0].status_paid?t._e():a("a",{staticStyle:{color:"red"}},[t._v(t._s(e.data[n][0].real_amount_label))]),t._v(" "),e.data[n][0].status_paid?a("a",{staticStyle:{color:"black"}},[t._v(t._s(e.data[n][0].real_amount_label))]):t._e()]):a("span",[a("a",{staticStyle:{color:"blue"}},[t._v(t._s(e[n]))])])])}))],2)})),0)]):t._e()]):a("div")]),t._v(" "),t._m(2),t._v(" "),a("div",{staticClass:"card-body"},[Object.keys(t.data.cashOut).length>1?a("div",{staticClass:"table-responsive"},[Object.keys(t.data.cashOut).length>1?a("table",{staticClass:"table table-bordered"},[a("thead",[a("th",{staticStyle:{"background-color":"#abb6ff"}},[t._v("DANA")]),t._v(" "),t._l(t.data.cashOut[0].data,(function(e,r){return a("th",{key:r,staticStyle:{"background-color":"#abb6ff"}},[t._v("\r\n                                    "+t._s(r)+"\r\n                                ")])}))],2),t._v(" "),a("tbody",t._l(t.data.cashOut,(function(e,r){var s,n;return a("tr",{key:r},[a("td",["total"!==r?a("span",[e.status>=5?a("router-link",{attrs:{to:{name:"lrds.show",params:{id:e.id}},target:"_blank"}},[t._v("\r\n                                                "+t._s(null!==(s=e.name)&&void 0!==s?s:e.code)+"\r\n                                            ")]):t._e(),t._v(" "),e.status<5?a("router-link",{attrs:{to:{name:"fpd-processes.show",params:{id:e.id}},target:"_blank"}},[t._v("\r\n                                                "+t._s(null!==(n=e.name)&&void 0!==n?n:e.code)+"\r\n                                            ")]):t._e()],1):a("span",[t._v("\r\n                                            Total\r\n                                        ")])]),t._v(" "),t._l(t.data.cashOut[0].data,(function(s,n){return a("td",{key:n},["total"!==r&&0!=e.data[n].length?a("span",[e.data[n].status<5?a("a",{staticStyle:{color:"red"}},[t._v(" "+t._s(0==e.data[n].length?"-":e.data[n][0]))]):a("a",{staticStyle:{color:"black"}},[t._v(" "+t._s(0==e.data[n].length?"-":e.data[n][0]))])]):a("span",[t._v("\r\n                                            "+t._s(e[n])+"\r\n                                        ")])])}))],2)})),0)]):t._e()]):a("div")]),t._v(" "),a("br")])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-success card-header-icon"},[t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("stacked_line_chart")])]),this._v(" "),t("h4",{staticClass:"card-title"},[this._v("\r\n                        Weekly Cashflow\r\n                    ")]),this._v(" "),t("br"),this._v(" "),t("p",{staticStyle:{color:"black"}},[this._v("\r\n                        Data Pemasukan dan Pengeluaran mingguan. Pilih Tanggal atau periode sesuai keinginan anda !\r\n                    ")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-header"},[t("h4",[t("strong",[t("b",[this._v("\r\n                    Cashflow IN\r\n                    ")])])])])},function(){var t=this._self._c;return t("div",{staticClass:"card-header"},[t("h4",[t("strong",[t("b",[this._v("\r\n                    Cashflow OUT\r\n                    ")])])])])}],!1,null,null,null);a.default=d.exports}}]);