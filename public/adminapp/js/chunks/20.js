(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"+SX3":function(t,e,r){"use strict";var s={props:["field","row"]},a=(r("2M0A"),r("KHd+")),i=Object(a.a)(s,(function(){var t=this,e=t._self._c;return e("div",t._l(t.row[t.field],(function(r){return e("div",{key:r.id,staticClass:"mb-1"},[e("a",{attrs:{href:r.url,title:r.name,target:"_blank"}},[e("i",{staticClass:"material-icons mr-1"},[t._v("link")]),t._v(t._s(r.file_name)+"\n    ")])])})),0)}),[],!1,null,"03717551",null);e.a=i.exports},"/QEr":function(t,e,r){"use strict";r("k1fX")},"2M0A":function(t,e,r){"use strict";r("xDE6")},AKXe:function(t,e,r){"use strict";var s={props:["field","row"],computed:{entry:function(){var t=_.split(this.field,".");return{key:t[0],field:t[1]}}}},a=(r("/QEr"),r("KHd+")),i=Object(a.a)(s,(function(){var t=this._self._c;return t("div",[this.row[this.entry.key]?t("span",{staticClass:"badge-pill badge-azure"},[this._v("\n    "+this._s(this.row[this.entry.key][this.entry.field])+"\n  ")]):t("span",{staticClass:"badge-pill badge-orange"},[this._v("\n    -\n  ")])])}),[],!1,null,"34650de5",null);e.a=i.exports},IC54:function(t,e,r){var s=r("bMjp");"string"==typeof s&&(s=[[t.i,s,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(s,a);s.locals&&(t.exports=s.locals)},Y2i3:function(t,e,r){"use strict";r.r(e);var s=r("L2JU"),a=r("AKXe"),i=r("augP"),n=r("+SX3");r("IC54");function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==o(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var s=r.call(t,e||"default");if("object"!==o(s))return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===o(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var _={components:{DatatableSingle:a.a,DatatableEnum:i.a,DatatableAttachments:n.a},data:function(){return{}},beforeDestroy:function(){this.resetState()},computed:d({},Object(s.c)("FpdProcessesSingle",["entry","timelineData"])),watch:{"$route.params.id":{immediate:!0,handler:function(){this.resetState(),this.fetchShowData(this.$route.params.id)}}},methods:d(d({},Object(s.b)("FpdProcessesSingle",["fetchShowData","resetState"])),{},{formatCurrency:function(t){return"Rp. "+(t/1).toFixed(2).replace(".",",").toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}})},v=r("KHd+"),u=Object(v.a)(_,(function(){var t,e,r,s,a=this,i=a._self._c;return i("div",{staticClass:"container-fluid"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-12"},[i("div",{staticClass:"card"},[i("div",{staticClass:"card-header card-header-primary card-header-icon"},[a._m(0),a._v(" "),i("h4",{staticClass:"card-title"},[a._v("\n            "+a._s(a.$t("global.view"))+" Detail\n            "),i("strong",[a._v(a._s(a.$t("cruds.fpd.title_singular")))])])]),a._v(" "),i("div",{staticClass:"card-body"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-auto"},[i("back-button")],1),a._v(" "),i("div",{staticClass:"col-auto"},[a.$can(a.entry.bu.code+"-admin")||0==a.entry.status||1===a.entry.status&&a.$can(a.entry.bu.code+"-"+parseInt(a.entry.status)-1)?i("router-link",{staticClass:"btn btn-primary",attrs:{to:{name:"fpd-processes.editData",params:{id:a.entry.id}},target:"_blank"}},[a._v("\n                  Proses\n              ")]):a._e()],1)])]),a._v(" "),i("div",{staticClass:"card-body"},[i("div",{staticClass:"row"},[i("div",{staticClass:"col-md-12"},[i("div",{staticClass:"table-responsive"},[i("div",{staticClass:"table"},[i("tbody",[i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.code"))+"\n                      ")]),a._v(" "),i("td",[a._v("\n                        "+a._s(a.entry.code)+"\n                      ")])]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.user"))+"\n                      ")]),a._v(" "),i("td",[i("datatable-single",{attrs:{row:a.entry,field:"user.name"}})],1)]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.created_at"))+"\n                      ")]),a._v(" "),i("td",[a._v("\n                        "+a._s(a.entry.created_at)+"\n                      ")])]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.name"))+"\n                      ")]),a._v(" "),i("td",[a._v("\n                        "+a._s(a.entry.name)+"\n                      ")])]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.bu"))+"\n                      ")]),a._v(" "),i("td",[i("datatable-single",{attrs:{row:a.entry,field:"bu.name"}})],1)]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.dept"))+"\n                      ")]),a._v(" "),i("td",[i("datatable-single",{attrs:{row:a.entry,field:"dept.name"}})],1)]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.req_date"))+"\n                      ")]),a._v(" "),i("td",[a._v("\n                        "+a._s(a.entry.req_date)+"\n                      ")])]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.processed_date"))+"\n                      ")]),a._v(" "),i("td",[a._v("\n                        "+a._s(null!==(t=a.entry.processed_date)&&void 0!==t?t:"-")+"\n                      ")])]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.transact_type"))+"\n                      ")]),a._v(" "),i("td",[i("datatable-enum",{attrs:{row:a.entry,field:"transact_type"}})],1)]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.klasifikasi"))+"\n                      ")]),a._v(" "),i("td",[i("datatable-enum",{attrs:{row:a.entry,field:"klasifikasi"}})],1)]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.code_voucher"))+"\n                      ")]),a._v(" "),i("td",[a._v("\n                        "+a._s(null!==(e=a.entry.code_voucher)&&void 0!==e?e:"-")+"\n                      ")])]),a._v(" "),""!==a.entry.code_voucher_lrd?i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.code_voucher_lrd"))+"\n                      ")]),a._v(" "),i("td",[a._v("\n                        "+a._s(null!==(r=a.entry.code_voucher_lrd)&&void 0!==r?r:"-")+"\n                      ")])]):a._e(),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.status"))+"\n                      ")]),a._v(" "),i("td",[i("datatable-enum",{attrs:{row:a.entry,field:"status"}})],1)]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.lampiran"))+"\n                      ")]),a._v(" "),i("td",[i("datatable-attachments",{attrs:{row:a.entry,field:"lampiran"}})],1)]),a._v(" "),i("tr",[i("td",{staticClass:"text-primary"},[a._v("\n                        "+a._s(a.$t("cruds.fpd.fields.bukti_transfer"))+"\n                      ")]),a._v(" "),i("td",[i("datatable-attachments",{attrs:{row:a.entry,field:"bukti_transfer"}})],1)])])])])])])]),a._v(" "),i("div",{staticClass:"card-body"},[i("bootstrap-alert"),a._v(" "),i("table",{staticClass:"table table-bordered",attrs:{name:"inputItem"}},[i("thead",[i("th",[a._v("Account")]),a._v(" "),i("th",[a._v("Nominal")]),a._v(" "),parseInt(a.entry.status)>4?i("th",[a._v("Realisasi Amount")]):a._e(),a._v(" "),i("th",[a._v("Site")]),a._v(" "),i("th",[a._v("Notes")])]),a._v(" "),i("tbody",a._l(a.entry.items,(function(t,e){return i("tr",{key:e},[i("td",[a._v("\n                    "+a._s(t.account?t.account.name:"-")+"\n                ")]),a._v(" "),i("td",[a._v("\n                    "+a._s(t.amount_label)+"\n                ")]),a._v(" "),parseInt(a.entry.status)>4?i("td",[a._v("\n                    "+a._s(t.real_amount_label)+"\n                ")]):a._e(),a._v(" "),i("td",[a._v("\n                    "+a._s(t.site?t.site.name:"-")+"\n                ")]),a._v(" "),i("td",[a._v("\n                    "+a._s(t.ket)+"\n                ")])])})),0),a._v(" "),i("tbody",[i("tr",[i("td",[a._v("Total")]),a._v(" "),i("td",[a._v("Rp. "+a._s(null!==(s=a.entry.total_amount_label)&&void 0!==s?s:0))]),a._v(" "),i("td"),a._v(" "),i("td")])])])],1),a._v(" "),i("div",{staticClass:"card-body"},[a._m(1),a._v(" "),a._l(a.timelineData,(function(t,e){return i("timeline",{key:e},["selesai"==t.proses?i("timeline-item",{attrs:{"bg-color":"green"}},[a._v("\n                "+a._s(t.status)+"\n                "),t.tanggal?i("p",[a._v("Tanggal : "+a._s(t.tanggal))]):a._e(),a._v(" "),t.user?i("p",[a._v("Diproses Oleh : "+a._s(t.user))]):a._e()]):a._e(),a._v(" "),"proses"==t.proses?i("timeline-item",{attrs:{"bg-color":"yellow"}},[a._v("\n                "+a._s(t.status)+"\n                "),t.tanggal?i("p",[a._v("Tanggal : "+a._s(t.tanggal))]):a._e()]):a._e(),a._v(" "),""==t.proses?i("timeline-item",{attrs:{"bg-color":"red"}},[a._v("\n                "+a._s(t.status)+"\n              ")]):a._e()],1)}))],2)])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("remove_red_eye")])])},function(){var t=this._self._c;return t("h4",[t("strong",[this._v("Alur Pengajuan FPD")])])}],!1,null,null,null);e.default=u.exports},augP:function(t,e,r){"use strict";var s={props:["field","row"]},a=r("KHd+"),i=Object(a.a)(s,(function(){return(0,this._self._c)("div",[this._v("\n  "+this._s(this.row["".concat(this.field,"_label")])+"\n")])}),[],!1,null,null,null);e.a=i.exports},bMjp:function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,'.timeline{padding:0;position:relative;list-style:none;font-family:PingFangSC-light,Avenir,Helvetica,Arial,Hiragino Sans GB,Microsoft YaHei,sans-serif;-webkit-font-smoothing:antialiased;margin:10px 20px}.timeline:after{position:absolute;content:"";left:0;top:0;width:1px;height:100%;background-color:var(--timelineTheme)}.timeline-item{position:relative;margin:1.5em 0 0 28px;padding-bottom:1.5em;border-bottom:1px dotted var(--timelineTheme)}.timeline-item:last-child{border-bottom:none}.timeline-circle{position:absolute;top:.28em;left:-34px;width:10px;height:10px;border-radius:50%;border:1px solid var(--timelineTheme);background-color:var(--timelineTheme);z-index:1;box-sizing:content-box}.timeline-circle.hollow{background-color:var(--timelineBg)}.timeline-title{position:relative;display:inline-block;cursor:crosshair;margin:-.15em 0 15px 28px}.timeline-title:not(:first-child){margin-top:28px}.timeline-title-circle{left:-36px;top:.15em;width:16px;height:16px}.timeline-others{width:40px;height:auto;top:.2em;left:-48px;line-height:1;padding:2px 0;text-align:center;border:none;background-color:var(--timelineBg)}',""])},"eP+7":function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,"a[data-v-03717551]{font-size:13px;font-weight:500;color:#202124}a[data-v-03717551]:hover{color:#9c27b0;text-decoration:underline}",""])},jgPe:function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,".badge[data-v-34650de5]{font-size:.875rem;font-weight:500;text-transform:none}",""])},k1fX:function(t,e,r){var s=r("jgPe");"string"==typeof s&&(s=[[t.i,s,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(s,a);s.locals&&(t.exports=s.locals)},xDE6:function(t,e,r){var s=r("eP+7");"string"==typeof s&&(s=[[t.i,s,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(s,a);s.locals&&(t.exports=s.locals)}}]);