(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{"+SX3":function(t,e,r){"use strict";var i={props:["field","row"]},s=(r("2M0A"),r("KHd+")),n=Object(s.a)(i,(function(){var t=this,e=t._self._c;return e("div",t._l(t.row[t.field],(function(r){return e("div",{key:r.id,staticClass:"mb-1"},[e("a",{attrs:{href:r.url,title:r.name,target:"_blank"}},[e("i",{staticClass:"material-icons mr-1"},[t._v("link")]),t._v(t._s(r.file_name)+"\n    ")])])})),0)}),[],!1,null,"03717551",null);e.a=n.exports},"/QEr":function(t,e,r){"use strict";r("k1fX")},"2M0A":function(t,e,r){"use strict";r("xDE6")},AKXe:function(t,e,r){"use strict";var i={props:["field","row"],computed:{entry:function(){var t=_.split(this.field,".");return{key:t[0],field:t[1]}}}},s=(r("/QEr"),r("KHd+")),n=Object(s.a)(i,(function(){var t=this._self._c;return t("div",[this.row[this.entry.key]?t("span",{staticClass:"badge-pill badge-azure"},[this._v("\n    "+this._s(this.row[this.entry.key][this.entry.field])+"\n  ")]):t("span",{staticClass:"badge-pill badge-orange"},[this._v("\n    -\n  ")])])}),[],!1,null,"34650de5",null);e.a=n.exports},IC54:function(t,e,r){var i=r("bMjp");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(i,s);i.locals&&(t.exports=i.locals)},Y2i3:function(t,e,r){"use strict";r.r(e);var i=r("L2JU"),s=r("AKXe"),n=r("augP"),a=r("+SX3");r("IC54");function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function l(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){c(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function c(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==o(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var i=r.call(t,e||"default");if("object"!==o(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"===o(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var _={components:{DatatableSingle:s.a,DatatableEnum:n.a,DatatableAttachments:a.a},data:function(){return{}},beforeDestroy:function(){this.resetState()},computed:d({},Object(i.c)("FpdProcessesSingle",["entry","timelineData"])),watch:{"$route.params.id":{immediate:!0,handler:function(){this.resetState(),this.fetchShowData(this.$route.params.id)}}},methods:d(d({},Object(i.b)("FpdProcessesSingle",["fetchShowData","resetState"])),{},{formatCurrency:function(t){return"Rp. "+(t/1).toFixed(2).replace(".",",").toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")}})},v=r("KHd+"),u=Object(v.a)(_,(function(){var t,e,r,i,s=this,n=s._self._c;return n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"card"},[n("div",{staticClass:"card-header card-header-primary card-header-icon"},[s._m(0),s._v(" "),n("h4",{staticClass:"card-title"},[s._v("\n            "+s._s(s.$t("global.view"))+" Detail\n            "),n("strong",[s._v(s._s(s.$t("cruds.fpd.title_singular")))])])]),s._v(" "),n("div",{staticClass:"card-body"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-3"},[n("back-button")],1)])]),s._v(" "),n("div",{staticClass:"card-body"},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-12"},[n("div",{staticClass:"table-responsive"},[n("div",{staticClass:"table"},[n("tbody",[n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.code"))+"\n                      ")]),s._v(" "),n("td",[s._v("\n                        "+s._s(s.entry.code)+"\n                      ")])]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.user"))+"\n                      ")]),s._v(" "),n("td",[n("datatable-single",{attrs:{row:s.entry,field:"user.name"}})],1)]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.created_at"))+"\n                      ")]),s._v(" "),n("td",[s._v("\n                        "+s._s(s.entry.created_at)+"\n                      ")])]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.name"))+"\n                      ")]),s._v(" "),n("td",[s._v("\n                        "+s._s(s.entry.name)+"\n                      ")])]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.bu"))+"\n                      ")]),s._v(" "),n("td",[n("datatable-single",{attrs:{row:s.entry,field:"bu.name"}})],1)]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.dept"))+"\n                      ")]),s._v(" "),n("td",[n("datatable-single",{attrs:{row:s.entry,field:"dept.name"}})],1)]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.req_date"))+"\n                      ")]),s._v(" "),n("td",[s._v("\n                        "+s._s(s.entry.req_date)+"\n                      ")])]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.processed_date"))+"\n                      ")]),s._v(" "),n("td",[s._v("\n                        "+s._s(null!==(t=s.entry.processed_date)&&void 0!==t?t:"-")+"\n                      ")])]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.transact_type"))+"\n                      ")]),s._v(" "),n("td",[n("datatable-enum",{attrs:{row:s.entry,field:"transact_type"}})],1)]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.klasifikasi"))+"\n                      ")]),s._v(" "),n("td",[n("datatable-enum",{attrs:{row:s.entry,field:"klasifikasi"}})],1)]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.code_voucher"))+"\n                      ")]),s._v(" "),n("td",[s._v("\n                        "+s._s(null!==(e=s.entry.code_voucher)&&void 0!==e?e:"-")+"\n                      ")])]),s._v(" "),""!==s.entry.code_voucher_lrd?n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.code_voucher_lrd"))+"\n                      ")]),s._v(" "),n("td",[s._v("\n                        "+s._s(null!==(r=s.entry.code_voucher_lrd)&&void 0!==r?r:"-")+"\n                      ")])]):s._e(),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.status"))+"\n                      ")]),s._v(" "),n("td",[n("datatable-enum",{attrs:{row:s.entry,field:"status"}})],1)]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.lampiran"))+"\n                      ")]),s._v(" "),n("td",[n("datatable-attachments",{attrs:{row:s.entry,field:"lampiran"}})],1)]),s._v(" "),n("tr",[n("td",{staticClass:"text-primary"},[s._v("\n                        "+s._s(s.$t("cruds.fpd.fields.bukti_transfer"))+"\n                      ")]),s._v(" "),n("td",[n("datatable-attachments",{attrs:{row:s.entry,field:"bukti_transfer"}})],1)])])])])])])]),s._v(" "),n("div",{staticClass:"card-body"},[n("bootstrap-alert"),s._v(" "),n("table",{staticClass:"table table-bordered",attrs:{name:"inputItem"}},[n("thead",[n("th",[s._v("Account")]),s._v(" "),n("th",[s._v("Nominal")]),s._v(" "),parseInt(s.entry.status)>4?n("th",[s._v("Realisasi Amount")]):s._e(),s._v(" "),n("th",[s._v("Site")]),s._v(" "),n("th",[s._v("Notes")])]),s._v(" "),n("tbody",s._l(s.entry.items,(function(t,e){return n("tr",{key:e},[n("td",[s._v("\n                    "+s._s(t.account.name)+"\n                ")]),s._v(" "),n("td",[s._v("\n                    "+s._s(s.formatCurrency(t.amount))+"\n                ")]),s._v(" "),parseInt(s.entry.status)>4?n("td",[s._v("\n                    "+s._s(t.real_amount)+"\n                ")]):s._e(),s._v(" "),n("td",[s._v("\n                    "+s._s(t.site?t.site.name:"-")+"\n                ")]),s._v(" "),n("td",[s._v("\n                    "+s._s(t.ket)+"\n                ")])])})),0),s._v(" "),n("tbody",[n("tr",[n("td",[s._v("Total")]),s._v(" "),n("td",[s._v("Rp. "+s._s(null!==(i=s.entry.total_amount_label)&&void 0!==i?i:0))]),s._v(" "),n("td"),s._v(" "),n("td")])])])],1),s._v(" "),n("div",{staticClass:"card-body"},[s._m(1),s._v(" "),s._l(s.timelineData,(function(t,e){return n("timeline",{key:e},["selesai"==t.proses?n("timeline-item",{attrs:{"bg-color":"green"}},[s._v("\n                "+s._s(t.status)+"\n                "),t.tanggal?n("p",[s._v("Tanggal : "+s._s(t.tanggal))]):s._e(),s._v(" "),t.user?n("p",[s._v("Diproses Oleh : "+s._s(t.user))]):s._e()]):s._e(),s._v(" "),"proses"==t.proses?n("timeline-item",{attrs:{"bg-color":"yellow"}},[s._v("\n                "+s._s(t.status)+"\n                "),t.tanggal?n("p",[s._v("Tanggal : "+s._s(t.tanggal))]):s._e()]):s._e(),s._v(" "),""==t.proses?n("timeline-item",{attrs:{"bg-color":"red"}},[s._v("\n                "+s._s(t.status)+"\n              ")]):s._e()],1)}))],2)])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-icon"},[t("i",{staticClass:"material-icons"},[this._v("remove_red_eye")])])},function(){var t=this._self._c;return t("h4",[t("strong",[this._v("Alur Pengajuan FPD")])])}],!1,null,null,null);e.default=u.exports},augP:function(t,e,r){"use strict";var i={props:["field","row"]},s=r("KHd+"),n=Object(s.a)(i,(function(){return(0,this._self._c)("div",[this._v("\n  "+this._s(this.row["".concat(this.field,"_label")])+"\n")])}),[],!1,null,null,null);e.a=n.exports},bMjp:function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,'.timeline{padding:0;position:relative;list-style:none;font-family:PingFangSC-light,Avenir,Helvetica,Arial,Hiragino Sans GB,Microsoft YaHei,sans-serif;-webkit-font-smoothing:antialiased;margin:10px 20px}.timeline:after{position:absolute;content:"";left:0;top:0;width:1px;height:100%;background-color:var(--timelineTheme)}.timeline-item{position:relative;margin:1.5em 0 0 28px;padding-bottom:1.5em;border-bottom:1px dotted var(--timelineTheme)}.timeline-item:last-child{border-bottom:none}.timeline-circle{position:absolute;top:.28em;left:-34px;width:10px;height:10px;border-radius:50%;border:1px solid var(--timelineTheme);background-color:var(--timelineTheme);z-index:1;box-sizing:content-box}.timeline-circle.hollow{background-color:var(--timelineBg)}.timeline-title{position:relative;display:inline-block;cursor:crosshair;margin:-.15em 0 15px 28px}.timeline-title:not(:first-child){margin-top:28px}.timeline-title-circle{left:-36px;top:.15em;width:16px;height:16px}.timeline-others{width:40px;height:auto;top:.2em;left:-48px;line-height:1;padding:2px 0;text-align:center;border:none;background-color:var(--timelineBg)}',""])},"eP+7":function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,"a[data-v-03717551]{font-size:13px;font-weight:500;color:#202124}a[data-v-03717551]:hover{color:#9c27b0;text-decoration:underline}",""])},jgPe:function(t,e,r){(t.exports=r("I1BE")(!1)).push([t.i,".badge[data-v-34650de5]{font-size:.875rem;font-weight:500;text-transform:none}",""])},k1fX:function(t,e,r){var i=r("jgPe");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(i,s);i.locals&&(t.exports=i.locals)},xDE6:function(t,e,r){var i=r("eP+7");"string"==typeof i&&(i=[[t.i,i,""]]);var s={hmr:!0,transform:void 0,insertInto:void 0};r("aET+")(i,s);i.locals&&(t.exports=i.locals)}}]);