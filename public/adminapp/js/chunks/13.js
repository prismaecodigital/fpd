(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{"+SX3":function(t,e,r){"use strict";var i={props:["field","row"]},s=(r("2M0A"),r("KHd+")),n=Object(s.a)(i,(function(){var t=this,e=t._self._c;return e("div",t._l(t.row[t.field],(function(r){return e("div",{key:r.id,staticClass:"mb-1"},[e("a",{attrs:{href:r.url,title:r.name,target:"_blank"}},[e("i",{staticClass:"material-icons mr-1"},[t._v("link")]),t._v(t._s(r.file_name)+"\n    ")])])})),0)}),[],!1,null,"03717551",null);e.a=n.exports},"/QEr":function(t,e,r){"use strict";r("k1fX")},"2M0A":function(t,e,r){"use strict";r("xDE6")},AKXe:function(t,e,r){"use strict";var i={props:["field","row"],computed:{entry:function(){var t=_.split(this.field,".");return{key:t[0],field:t[1]}}}},s=(r("/QEr"),r("KHd+")),n=Object(s.a)(i,(function(){var t=this._self._c;return t("div",[this.row[this.entry.key]?t("span",{staticClass:"badge-pill badge-azure"},[this._v("\n    "+this._s(this.row[this.entry.key][this.entry.field])+"\n  ")]):t("span",{staticClass:"badge-pill badge-orange"},[this._v("\n    -\n  ")])])}),[],!1,null,"34650de5",null);e.a=n.exports},IC54:function(t,e,r){var i=r("bMjp");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(i,s);i.locals&&(t.exports=i.locals)},Y2i3:function(t,e,r){"use strict";r.r(e);var i=r("L2JU"),s=r("AKXe"),n=r("augP"),a=r("+SX3");r("IC54");function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==o(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var i=r.call(t,e||"default");if("object"!==o(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===o(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var _={components:{DatatableSingle:s.a,DatatableEnum:n.a,DatatableAttachments:a.a},data:function(){return{}},beforeDestroy:function(){this.resetState()},computed:d({},Object(i.c)("FpdProcessesSingle",["entry","timelineData"])),watch:{"$route.params.id":{immediate:!0,handler:function(){this.resetState(),this.fetchShowData(this.$route.params.id)}}},methods:d(d({},Object(i.b)("FpdProcessesSingle",["fetchShowData","resetState"])),{},{formatCurrency:function(t){return"Rp. "+(t/1).toFixed(2).replace(".",",").toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}})},v=r("KHd+"),u=Object(v.a)(_,(function(){var t,e,r,i=this,s=i._self._c;return s("div",{staticClass:"container-fluid"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header card-header-primary card-header-icon"},[i._m(0),i._v(" "),s("h4",{staticClass:"card-title"},[i._v("\n            "+i._s(i.$t("global.view"))+" Detail\n            "),s("strong",[i._v(i._s(i.$t("cruds.fpd.title_singular")))])])]),i._v(" "),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-lg-3"},[s("back-button")],1)])]),i._v(" "),s("div",{staticClass:"card-body"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-md-12"},[s("div",{staticClass:"table-responsive"},[s("div",{staticClass:"table"},[s("tbody",[s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.code"))+"\n                      ")]),i._v(" "),s("td",[i._v("\n                        "+i._s(i.entry.code)+"\n                      ")])]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.user"))+"\n                      ")]),i._v(" "),s("td",[s("datatable-single",{attrs:{row:i.entry,field:"user.name"}})],1)]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.created_at"))+"\n                      ")]),i._v(" "),s("td",[i._v("\n                        "+i._s(i.entry.created_at)+"\n                      ")])]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.name"))+"\n                      ")]),i._v(" "),s("td",[i._v("\n                        "+i._s(i.entry.name)+"\n                      ")])]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.bu"))+"\n                      ")]),i._v(" "),s("td",[s("datatable-single",{attrs:{row:i.entry,field:"bu.name"}})],1)]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.dept"))+"\n                      ")]),i._v(" "),s("td",[s("datatable-single",{attrs:{row:i.entry,field:"dept.name"}})],1)]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.req_date"))+"\n                      ")]),i._v(" "),s("td",[i._v("\n                        "+i._s(i.entry.req_date)+"\n                      ")])]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.processed_date"))+"\n                      ")]),i._v(" "),s("td",[i._v("\n                        "+i._s(null!==(t=i.entry.processed_date)&&void 0!==t?t:"-")+"\n                      ")])]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.transact_type"))+"\n                      ")]),i._v(" "),s("td",[s("datatable-enum",{attrs:{row:i.entry,field:"transact_type"}})],1)]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.klasifikasi"))+"\n                      ")]),i._v(" "),s("td",[s("datatable-enum",{attrs:{row:i.entry,field:"klasifikasi"}})],1)]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.code_voucher"))+"\n                      ")]),i._v(" "),s("td",[i._v("\n                        "+i._s(null!==(e=i.entry.code_voucher)&&void 0!==e?e:"-")+"\n                      ")])]),i._v(" "),""!==i.entry.code_voucher_lrd?s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.code_voucher_lrd"))+"\n                      ")]),i._v(" "),s("td",[i._v("\n                        "+i._s(null!==(r=i.entry.code_voucher_lrd)&&void 0!==r?r:"-")+"\n                      ")])]):i._e(),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.status"))+"\n                      ")]),i._v(" "),s("td",[s("datatable-enum",{attrs:{row:i.entry,field:"status"}})],1)]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.lampiran"))+"\n                      ")]),i._v(" "),s("td",[s("datatable-attachments",{attrs:{row:i.entry,field:"lampiran"}})],1)]),i._v(" "),s("tr",[s("td",{staticClass:"text-primary"},[i._v("\n                        "+i._s(i.$t("cruds.fpd.fields.bukti_transfer"))+"\n                      ")]),i._v(" "),s("td",[s("datatable-attachments",{attrs:{row:i.entry,field:"bukti_transfer"}})],1)])])])])])])]),i._v(" "),s("div",{staticClass:"card-body"},[s("bootstrap-alert"),i._v(" "),s("table",{staticClass:"table table-bordered",attrs:{name:"inputItem"}},[s("thead",[s("th",[i._v("Account")]),i._v(" "),s("th",[i._v("Nominal")]),i._v(" "),parseInt(i.entry.status)>4?s("th",[i._v("Realisasi Amount")]):i._e(),i._v(" "),s("th",[i._v("Site")]),i._v(" "),s("th",[i._v("Notes")])]),i._v(" "),s("tbody",i._l(i.entry.items,(function(t,e){return s("tr",{key:e},[s("td",[i._v("\n                    "+i._s(t.account.name)+"\n                ")]),i._v(" "),s("td",[i._v("\n                    "+i._s(i.formatCurrency(t.amount))+"\n                ")]),i._v(" "),parseInt(i.entry.status)>4?s("td",[i._v("\n                    "+i._s(t.real_amount)+"\n                ")]):i._e(),i._v(" "),s("td",[i._v("\n                    "+i._s(t.site?t.site.name:"-")+"\n                ")]),i._v(" "),s("td",[i._v("\n                    "+i._s(t.ket)+"\n                ")])])})),0)])],1),i._v(" "),s("div",{staticClass:"card-body"},[i._m(1),i._v(" "),i._l(i.timelineData,(function(t,e){return s("timeline",{key:e},["selesai"==t.proses?s("timeline-item",{attrs:{"bg-color":"green"}},[i._v("\n                "+i._s(t.status)+"\n                "),t.tanggal?s("p",[i._v("Tanggal : "+i._s(t.tanggal))]):i._e(),i._v(" "),t.user?s("p",[i._v("Diproses Oleh : "+i._s(t.user))]):i._e()]):i._e(),i._v(" "),"proses"==t.proses?s("timeline-item",{attrs:{"bg-color":"yellow"}},[i._v("\n                "+i._s(t.status)+"\n                "),t.tanggal?s("p",[i._v("Tanggal : "+i._s(t.tanggal))]):i._e()]):i._e(),i._v(" "),""==t.proses?s("timeline-item",{attrs:{"bg-color":"red"}},[i._v("\n                "+i._s(t.status)+"\n              ")]):i._e()],1)}))],2)])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("remove_red_eye")])])},function(){var t=this._self._c;return t("h4",[t("strong",[this._v("Alur Pengajuan FPD")])])}],!1,null,null,null);e.default=u.exports},augP:function(t,e,r){"use strict";var i={props:["field","row"]},s=r("KHd+"),n=Object(s.a)(i,(function(){return(0,this._self._c)("div",[this._v("\n  "+this._s(this.row["".concat(this.field,"_label")])+"\n")])}),[],!1,null,null,null);e.a=n.exports},bMjp:function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,'.timeline{padding:0;position:relative;list-style:none;font-family:PingFangSC-light,Avenir,Helvetica,Arial,Hiragino Sans GB,Microsoft YaHei,sans-serif;-webkit-font-smoothing:antialiased;margin:10px 20px}.timeline:after{position:absolute;content:"";left:0;top:0;width:1px;height:100%;background-color:var(--timelineTheme)}.timeline-item{position:relative;margin:1.5em 0 0 28px;padding-bottom:1.5em;border-bottom:1px dotted var(--timelineTheme)}.timeline-item:last-child{border-bottom:none}.timeline-circle{position:absolute;top:.28em;left:-34px;width:10px;height:10px;border-radius:50%;border:1px solid var(--timelineTheme);background-color:var(--timelineTheme);z-index:1;box-sizing:content-box}.timeline-circle.hollow{background-color:var(--timelineBg)}.timeline-title{position:relative;display:inline-block;cursor:crosshair;margin:-.15em 0 15px 28px}.timeline-title:not(:first-child){margin-top:28px}.timeline-title-circle{left:-36px;top:.15em;width:16px;height:16px}.timeline-others{width:40px;height:auto;top:.2em;left:-48px;line-height:1;padding:2px 0;text-align:center;border:none;background-color:var(--timelineBg)}',""])},"eP+7":function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,"a[data-v-03717551]{font-size:13px;font-weight:500;color:#202124}a[data-v-03717551]:hover{color:#9c27b0;text-decoration:underline}",""])},jgPe:function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,".badge[data-v-34650de5]{font-size:.875rem;font-weight:500;text-transform:none}",""])},k1fX:function(t,e,r){var i=r("jgPe");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(i,s);i.locals&&(t.exports=i.locals)},xDE6:function(t,e,r){var i=r("eP+7");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(i,s);i.locals&&(t.exports=i.locals)}}]);