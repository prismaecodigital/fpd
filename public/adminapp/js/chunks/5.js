(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{EzuS:function(t,a,s){"use strict";s.r(a);var e=s("e5cX"),r=s("L2JU"),i=s("m0r1");function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,a){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(t);a&&(e=e.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),s.push.apply(s,e)}return s}function c(t){for(var a=1;a<arguments.length;a++){var s=null!=arguments[a]?arguments[a]:{};a%2?l(Object(s),!0).forEach((function(a){d(t,a,s[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):l(Object(s)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(s,a))}))}return t}function d(t,a,s){return(a=function(t){var a=function(t,a){if("object"!==n(t)||null===t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var e=s.call(t,a||"default");if("object"!==n(e))return e;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===a?String:Number)(t)}(t,"string");return"symbol"===n(a)?a:String(a)}(a))in t?Object.defineProperty(t,a,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[a]=s,t}i.e.register(i.p,i.q,i.g,i.i,i.b,i.j,i.d,i.l);var o={components:{LineChartGenerator:e.b,Bar:e.a},props:{chartId:{type:String,default:"cashIn"},datasetIdKey:{type:String,default:"label"},width:{type:Number,default:400},height:{type:Number,default:400},cssClasses:{default:"",type:String},styles:{type:Object,default:function(){}},plugins:{type:Array,default:function(){return[]}}},data:function(){return{query:{bu_id:null,dept:{id:null,name:null},startDate:null,endDate:null,startDateSummary:null,endDateSummary:null},chartOptions_cash_in:{legend:{display:!0},plugins:{tooltip:{callbacks:{label:function(t){var a=t.dataset.label||"";return a&&(a+=": "),a+=Math.round(100*t.parsed.y)+"%",a}}}},scales:{y:{beginAtZero:!0,ticks:{callback:function(t){return 100*t+"%"}}}},responsive:!0,maintainAspectRatio:!1},chartOptions_cash_out:{legend:{display:!0},plugins:{tooltip:{callbacks:{label:function(t){var a=t.dataset.label||"";return a&&(a+=": "),a+=Math.round(100*t.parsed.y)+"%",a}}}},scales:{y:{beginAtZero:!0,ticks:{callback:function(t){return 100*t+"%"}}}},responsive:!0,maintainAspectRatio:!1},chartOptions_coa_dept:{legend:{display:!0},plugins:{tooltip:{callbacks:{label:function(t){var a=t.dataset.label||"";return a&&(a+=": "),a+=Math.round(100*t.parsed.x)+"%",a}}}},indexAxis:"y",scales:{x:{beginAtZero:!0,ticks:{callback:function(t){return 100*t+"%"}}}},responsive:!0,maintainAspectRatio:!1}}},beforeDestroy:function(){this.resetState()},computed:c(c(c({},Object(r.c)("ChartIndex",["chart","loading","lists"])),Object(r.c)("AuthBu",["selected_bu","survey"])),{},{updatedQuery:function(){return c(c({},this.query),{},{bu_id:this.selected_bu?this.selected_bu.id:null})},dynamicHeight:function(){return 15*this.chart.coa_dept_charts.datasets.reduce((function(t,a){return t+a.data.length}),0)+20}}),mounted:function(){this.query.bu_id=this.selected_bu?this.selected_bu.id:null},watch:{selected_bu:function(t){this.query.bu_id=t?t.id:null},query:{handler:function(t){this.setQuery(t),this.fetchCharts()},deep:!0},survey:function(){this.survey.has_completed_survey||this.$bvModal.show("formSurvey")}},methods:c(c({},Object(r.b)("ChartIndex",["fetchCharts","setQuery","resetState","updateUserSurvey"])),{},{updateStartDate:function(t){var a=JSON.parse(JSON.stringify(t.add(1,"day")));this.query.startDate=a},updateEndDate:function(t){var a=JSON.parse(JSON.stringify(t.add(1,"month").subtract(1,"second")));this.query.endDate=a},updateStartDateSummary:function(t){var a=JSON.parse(JSON.stringify(t.add(1,"day")));this.query.startDateSummary=a},updateEndDateSummary:function(t){var a=JSON.parse(JSON.stringify(t.add(1,"month").subtract(1,"second")));this.query.endDateSummary=a},updateDept:function(t){this.query.dept.id=t.id,this.query.dept.name=t.name,console.log(this.query.dept)},goToSurvey:function(){window.open(this.survey.link,"_blank"),this.$bvModal.hide("formSurvey"),this.updateUserSurvey(),console.log("ok")}})},u=s("KHd+"),v=Object(u.a)(o,(function(){var t,a,s,e,r,i,n,l,c,d,o,u,v,_,h,y,b,m,p=this,f=p._self._c;return f("div",{staticClass:"container-fluid"},[p.$can(this.selected_bu?this.selected_bu.code+"-graph_access":"-")?f("div",{staticClass:"row"},[f("div",{staticClass:"col-md-12"},[f("div",{staticClass:"card"},[p._m(0),p._v(" "),f("div",{staticClass:"card-body"},[f("div",{staticClass:"row justify-content-end"},[f("div",{staticClass:"col-auto",staticStyle:{width:"200px"}},[f("v-select",{key:"dept-field",attrs:{name:"dept",label:"name",value:p.query.dept,options:p.lists.dept,placeholder:"Dept"},on:{input:p.updateDept}})],1),p._v(" "),f("div",{staticClass:"col-auto"},[f("vue-monthly-picker",{attrs:{"input-class":"form-control",value:p.query.startDate,placeHolder:"From Period","month-labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"date-format":"MMM yyyy"},on:{input:p.updateStartDate}},[p._v("\n                    >\n                ")])],1),p._v(" "),f("div",{staticClass:"col-auto"},[p._v(" --- ")]),p._v(" "),f("div",{staticClass:"col-auto"},[f("vue-monthly-picker",{attrs:{"input-class":"form-control",placeHolder:"To Period",value:p.query.endDate,"month-labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"date-format":"MMM yyyy"},on:{input:p.updateEndDate}},[p._v("\n                    >\n                    ")])],1)])]),p._v(" "),f("br"),p._v(" "),f("div",{staticClass:"card-header"},[f("h4",{staticStyle:{"text-align":"center"}},[f("strong",[f("b",[p._v("\n              Cashflow IN Actual & Projection - "+p._s(this.selected_bu?this.selected_bu.name:"")+"\n            ")])])])]),p._v(" "),f("div",{staticClass:"card-body"},[f("LineChartGenerator",{attrs:{"chart-options":p.chartOptions_cash_in,"chart-data":p.chart.cash_in_charts,"dataset-id-key":p.datasetIdKey,"css-classes":p.cssClasses,styles:p.styles,width:p.width,height:p.height}})],1),p._v(" "),f("br"),p._v(" "),f("div",{staticClass:"card-header"},[f("h4",{staticStyle:{"text-align":"center"}},[f("strong",[f("b",[p._v("\n              Cashflow OUT Actual & Projection - "+p._s(this.selected_bu?this.selected_bu.name:"")+"\n            ")])])])]),p._v(" "),f("div",{staticClass:"card-body"},[f("LineChartGenerator",{attrs:{"chart-options":p.chartOptions_cash_out,"chart-data":p.chart.cash_out_charts,"dataset-id-key":p.datasetIdKey,"css-classes":p.cssClasses,styles:p.styles,width:p.width,height:p.height}})],1),p._v(" "),f("div",{staticClass:"card-header"},[f("h4",{staticStyle:{"text-align":"center"}},[f("strong",[f("b",[p._v("\n              Cashflow OUT by DEPT - "+p._s(this.query.dept?this.query.dept.name:"")+"\n            ")])])])]),p._v(" "),f("div",{staticClass:"card-body"},[f("Bar",{style:{height:p.dynamicHeight+"px"},attrs:{"chart-options":p.chartOptions_coa_dept,"chart-data":p.chart.coa_dept_charts,"dataset-id-key":p.datasetIdKey,"css-classes":p.cssClasses,styles:p.styles,width:p.width}})],1)])])]):p._e(),p._v(" "),p.$can(this.selected_bu?this.selected_bu.code+"-summary_access":"-")?f("div",{staticClass:"row"},[f("div",{staticClass:"col-md-12"},[f("div",{staticClass:"card"},[f("div",{staticClass:"card-header card-header-success card-header-icon"},[p._m(1),p._v(" "),f("h4",{staticClass:"card-title"},[p._v("\n            Summary\n          ")]),p._v(" "),f("div",{staticClass:"card-body"},[f("div",{staticClass:"row justify-content-end"},[f("div",{staticClass:"col-auto",staticStyle:{color:"black"}},[f("vue-monthly-picker",{attrs:{"input-class":"form-control",value:p.query.startDateSummary,placeHolder:"From Period","month-labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"date-format":"MMM yyyy"},on:{input:p.updateStartDateSummary}},[p._v("\n                    >\n                ")])],1),p._v(" "),f("div",{staticClass:"col-auto"},[p._v(" --- ")]),p._v(" "),f("div",{staticClass:"col-auto",staticStyle:{color:"black"}},[f("vue-monthly-picker",{attrs:{"input-class":"form-control",placeHolder:"To Period",value:p.query.endDateSummary,"month-labels":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],"date-format":"MMM yyyy"},on:{input:p.updateEndDateSummary}},[p._v("\n                    >\n                    ")])],1)])]),p._v(" "),f("br"),p._v(" "),null!==p.query.startDateSummary&&null!==p.query.endDateSummary?f("div",{staticClass:"table-responsive"},[f("table",{staticClass:"table table-bordered"},[f("tbody",[p._m(2),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      Saldo Awal\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(p.chart.summary.saldo_awal)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(p.chart.summary.saldo_awal)+"\n                    ")])]),p._v(" "),p._m(3),p._v(" "),p._m(4),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      REVENUE\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(t=p.chart.summary.rev)||void 0===t?void 0:t.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(a=p.chart.summary.rev)||void 0===a?void 0:a.realized)+"\n                    ")])]),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      LOAN PRISMA\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(s=p.chart.summary.loan_prisma)||void 0===s?void 0:s.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(e=p.chart.summary.loan_prisma)||void 0===e?void 0:e.realized)+"\n                    ")])]),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      LOAN BANK\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(r=p.chart.summary.loan_bank)||void 0===r?void 0:r.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(i=p.chart.summary.loan_bank)||void 0===i?void 0:i.realized)+"\n                    ")])]),p._v(" "),p._m(5),p._v(" "),p._m(6),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      COGS - MATERIAL COST\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(n=p.chart.summary.mc)||void 0===n?void 0:n.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(l=p.chart.summary.mc)||void 0===l?void 0:l.realized)+"\n                    ")])]),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      COGS - LABOR COST\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(c=p.chart.summary.lc)||void 0===c?void 0:c.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(d=p.chart.summary.lc)||void 0===d?void 0:d.realized)+"\n                    ")])]),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      OPEX\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(o=p.chart.summary.opex)||void 0===o?void 0:o.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(u=p.chart.summary.opex)||void 0===u?void 0:u.realized)+"\n                    ")])]),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      HUTANG SUPPLIER\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(v=p.chart.summary.hutang_supplier)||void 0===v?void 0:v.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(_=p.chart.summary.hutang_supplier)||void 0===_?void 0:_.realized)+"\n                    ")])]),p._v(" "),f("tr",[f("td",{staticClass:"text-black"},[p._v("\n                      HUTANG NON-SUPPLIER\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(h=p.chart.summary.hutang_nonsupplier)||void 0===h?void 0:h.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(y=p.chart.summary.hutang_nonsupplier)||void 0===y?void 0:y.realized)+"\n                    ")])]),p._v(" "),p._m(7),p._v(" "),f("tr",[p._m(8),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(b=p.chart.summary.diff)||void 0===b?void 0:b.unrealized)+"\n                    ")]),p._v(" "),f("td",{staticClass:"text-black"},[p._v("\n                      "+p._s(null===(m=p.chart.summary.diff)||void 0===m?void 0:m.realized)+"\n                    ")])])])])]):p._e()])])])]):p._e(),p._v(" "),f("div",[f("b-modal",{attrs:{id:"formSurvey",centered:"","hide-backdrop":"","ok-only":"","no-close-on-backdrop":"","no-close-on-esc":"","hide-header-close":""},scopedSlots:p._u([{key:"modal-title",fn:function(){return[p._v("\n          Survey\n        ")]},proxy:!0},{key:"modal-footer",fn:function(){return[f("b-button",{attrs:{size:"sm",variant:"outline-secondary"},on:{click:p.goToSurvey}},[p._v("\n                  Klik di sini\n          ")])]},proxy:!0}])},[p._v(" "),f("div",[p._v("\n          Anda belum mengisi survey. Silahkan isi survey terlebih dahulu. Hanya 1-2 menit, santai saja\n        ")])])],1)])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-header card-header-success card-header-icon"},[t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("stacked_line_chart")])]),this._v(" "),t("h4",{staticClass:"card-title"},[this._v("\n            Charts\n          ")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("summarize")])])},function(){var t=this._self._c;return t("tr",[t("td",{staticClass:"text-black"},[t("strong",[t("b",[this._v("KETERANGAN")])])]),this._v(" "),t("td",{staticClass:"text-black"},[t("strong",[t("b",[this._v("UNREALIZED")])])]),this._v(" "),t("td",{staticClass:"text-black"},[t("strong",[t("b",[this._v("REALIZED")])])])])},function(){var t=this._self._c;return t("tr",[t("td",{staticClass:"text-black"},[t("strong",[t("b")])]),this._v(" "),t("td",{staticClass:"text-black"}),this._v(" "),t("td",{staticClass:"text-black"})])},function(){var t=this._self._c;return t("tr",[t("td",{staticClass:"text-black"},[t("strong",[t("b",[this._v("CASH IN")])])]),this._v(" "),t("td",{staticClass:"text-black"}),this._v(" "),t("td",{staticClass:"text-black"})])},function(){var t=this._self._c;return t("tr",[t("td",{staticClass:"text-black"}),this._v(" "),t("td",{staticClass:"text-black"}),this._v(" "),t("td",{staticClass:"text-black"})])},function(){var t=this._self._c;return t("tr",[t("td",{staticClass:"text-black"},[t("strong",[t("b",[this._v("CASH OUT")])])]),this._v(" "),t("td",{staticClass:"text-black"}),this._v(" "),t("td",{staticClass:"text-black"})])},function(){var t=this._self._c;return t("tr",[t("td",{staticClass:"text-black"},[t("strong",[t("b")])]),this._v(" "),t("td",{staticClass:"text-black"}),this._v(" "),t("td",{staticClass:"text-black"})])},function(){var t=this._self._c;return t("td",{staticClass:"text-black"},[t("strong",[t("b",[this._v("SURPLUS / DEFISIT")])])])}],!1,null,null,null);a.default=v.exports}}]);