(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"/AXO":function(t,a,e){"use strict";e("7jp4")},"7jp4":function(t,a,e){var s=e("obGa");"string"==typeof s&&(s=[[t.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};e("aET+")(s,i);s.locals&&(t.exports=s.locals)},QI4D:function(t,a,e){(t.exports=e("I1BE")(!1)).push([t.i,"*{padding:0;margin:0;box-sizing:border-box}body,html{height:100vh}body{font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-size:14px}",""])},hP5O:function(t,a,e){"use strict";e.r(a);var s=e("L2JU"),i=e("dRb6"),n=e("PNu4"),l=e("9G7H"),r=e("RQVy");function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function d(t,a){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),e.push.apply(e,s)}return e}function c(t){for(var a=1;a<arguments.length;a++){var e=null!=arguments[a]?arguments[a]:{};a%2?d(Object(e),!0).forEach((function(a){u(t,a,e[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):d(Object(e)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))}))}return t}function u(t,a,e){return(a=function(t){var a=function(t,a){if("object"!==o(t)||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var s=e.call(t,a||"default");if("object"!==o(s))return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===a?String:Number)(t)}(t,"string");return"symbol"===o(a)?a:String(a)}(a))in t?Object.defineProperty(t,a,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[a]=e,t}var v={components:{FullCalendar:i.a},data:function(){return{selectedDate:"",calendarData:"",defaultDate:"created_at",defaultBu:"",query:{sort:"id",order:"desc",limit:100,s:""}}},mounted:function(){var t=this.defaultDate,a=this.defaultBu;this.fetchCalendarData({x:t,bu_id:a})},beforeDestroy:function(){this.resetState()},computed:c(c({},Object(s.c)("CalendarIndex",["data","events","lists"])),{},{config:function(){return c(c({},this.configOptions),this.eventHandlers)},configOptions:function(){return{editable:!0,selectable:!0,selectMirror:!0,dayMaxEvents:!0,events:this.events,plugins:[n.a,l.a,r.a],headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth"},initialView:"dayGridMonth"}},eventHandlers:function(){return{dateClick:this.onDateClick,eventClick:this.onEventClick}}}),methods:c(c({},Object(s.b)("CalendarIndex",["fetchCalendarData","setQuery","resetState"])),{},{onDateClick:function(t){this.calendarData="",this.selectedDate=this.formatDate(t.dateStr)},onEventClick:function(t){var a=t.event;this.calendarData=a;var e=a.extendedProps.dateStr.substr(6,4)+a.extendedProps.dateStr.substr(2,4)+a.extendedProps.dateStr.substr(0,2);this.selectedDate=this.formatDate(e),this.$bvModal.show("dateModal")},formatDate:function(t){var a=t.split("-");if(3!==a.length)return"Invalid Date";var e=parseInt(a[0]),s=parseInt(a[1])-1,i=parseInt(a[2]),n=new Date(e,s,i);if(isNaN(n.getTime()))return"Invalid Date";return"".concat(String(i)," ").concat(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][s]," ").concat(e)},updateBu:function(t){this.defaultBu=t;var a=this.defaultDate,e=this.defaultBu;this.fetchCalendarData({x:a,bu_id:e})},updateView:function(t){this.defaultDate=t;var a=this.defaultDate,e=this.defaultBu;this.fetchCalendarData({x:a,bu_id:e})}})},p=(e("oQCV"),e("/AXO"),e("KHd+")),_=Object(p.a)(v,(function(){var t,a,e,s,i,n,l,r,o,d,c=this,u=c._self._c;return u("div",{attrs:{id:"app"}},[u("div",{staticClass:"calendar"},[u("div",{staticClass:"card"},[u("div",{staticClass:"card-header"},[u("div",{staticClass:"row"},[u("div",{staticClass:"col-md-3"},[u("v-select",{key:"bu-field",attrs:{name:"bu",label:"name",value:c.defaultBu,options:c.lists.bu,reduce:function(t){return t.id},placeholder:"Filter BU"},on:{input:c.updateBu}})],1),c._v(" "),u("div",{staticClass:"col-md-3"},[u("v-select",{key:"view-field",attrs:{name:"view",label:"name",value:c.defaultDate,options:c.lists.view,reduce:function(t){return t.id},placeholder:"Filter View"},on:{input:c.updateView}})],1)])]),c._v(" "),u("div",{staticClass:"card-body"},[u("full-calendar",{staticClass:"full-calendar",attrs:{options:c.config},scopedSlots:c._u([{key:"eventContent",fn:function(t){var a=t.event;return[0===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar0"},[c._v(c._s(a.extendedProps.code))]):1===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar1"},[c._v(c._s(a.extendedProps.code))]):2===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar2"},[c._v(c._s(a.extendedProps.code))]):3===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar3"},[c._v(c._s(a.extendedProps.code))]):4===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar4"},[c._v(c._s(a.extendedProps.code))]):5===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar5"},[c._v(c._s(a.extendedProps.code))]):6===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar6"},[c._v(c._s(a.extendedProps.code))]):7===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar7"},[c._v(c._s(a.extendedProps.code))]):8===parseInt(a.extendedProps.status)?u("span",{staticClass:"labelCalendar labelCalendar8"},[c._v(c._s(a.extendedProps.code))]):u("span",{staticClass:"labelCalendar labelCalendar99"},[c._v(c._s(a.extendedProps.code))])]}}])}),c._v(" "),u("div",[u("b-modal",{attrs:{id:"dateModal",centered:"","hide-backdrop":"","ok-only":""},scopedSlots:c._u([c.calendarData?{key:"modal-title",fn:function(){var t;return[c._v("\n                "+c._s(null===(t=c.calendarData.extendedProps)||void 0===t?void 0:t.code)+"\n              ")]},proxy:!0}:{key:"modal-title",fn:function(){return[c._v("\n                "+c._s(c.selectedDate)+"\n              ")]},proxy:!0},c.calendarData?{key:"modal-footer",fn:function(t){var a,e,s=t.hide;return[c.$can("fpd_show")&&(null===(a=c.calendarData.extendedProps)||void 0===a?void 0:a.status)<5?u("a",{staticClass:"btn btn-sm btn-info",attrs:{href:"/admin/fpd-processes/"+c.calendarData.id,target:"_blank"}},[c._v("Detail")]):c._e(),c._v(" "),c.$can("fpd_show")&&(null===(e=c.calendarData.extendedProps)||void 0===e?void 0:e.status)>=5?u("a",{staticClass:"btn btn-sm btn-info",attrs:{href:"/admin/lrds/"+c.calendarData.id,target:"_blank"}},[c._v("Detail")]):c._e(),c._v(" "),u("b-button",{attrs:{size:"sm",variant:"outline-secondary"},on:{click:function(t){return s("forget")}}},[c._v("\n                  Cancel\n                ")])]}}:{key:"default",fn:function(t){return u("div",[u("p",[c._v("Tidak ada Data yang ditampilkan")])])}}],null,!0)},[c._v(" "),c.calendarData?u("div",[u("div",{staticClass:"row"},[u("div",{staticClass:"col-lg-4"},[c._v("Dibuat tanggal ")]),c._v(" "),u("div",{staticClass:"col-lg-8"},[c._v(": "+c._s(null===(t=c.calendarData.extendedProps)||void 0===t?void 0:t.created_at))])]),c._v(" "),u("div",{staticClass:"row"},[u("div",{staticClass:"col-lg-4"},[c._v("Dibutuhkan tanggal ")]),c._v(" "),u("div",{staticClass:"col-lg-8"},[c._v(": "+c._s(null===(a=c.calendarData.extendedProps)||void 0===a?void 0:a.req_date))])]),c._v(" "),u("div",{staticClass:"row"},[u("div",{staticClass:"col-lg-4"},[c._v("Diproses tanggal ")]),c._v(" "),u("div",{staticClass:"col-lg-8"},[c._v(": "+c._s(null!==(e=null===(s=c.calendarData.extendedProps)||void 0===s?void 0:s.processed_date)&&void 0!==e?e:"-"))])]),c._v(" "),u("div",{staticClass:"row"},[u("div",{staticClass:"col-lg-4"},[c._v("Code Voucher ")]),c._v(" "),u("div",{staticClass:"col-lg-8"},[c._v(": "+c._s(null!==(i=null===(n=c.calendarData.extendedProps)||void 0===n?void 0:n.code_voucher)&&void 0!==i?i:"-"))])]),c._v(" "),u("div",{staticClass:"row"},[u("div",{staticClass:"col-lg-4"},[c._v("User ")]),c._v(" "),u("div",{staticClass:"col-lg-8"},[c._v(": "+c._s(null===(l=c.calendarData.extendedProps)||void 0===l?void 0:l.user))])]),c._v(" "),u("div",{staticClass:"row"},[u("div",{staticClass:"col-lg-4"},[c._v("BU ")]),c._v(" "),u("div",{staticClass:"col-lg-8"},[c._v(": "+c._s(null===(r=c.calendarData.extendedProps)||void 0===r?void 0:r.bu))])]),c._v(" "),u("div",{staticClass:"row"},[u("div",{staticClass:"col-lg-4"},[c._v("Amount ")]),c._v(" "),u("div",{staticClass:"col-lg-8"},[c._v(": "+c._s(null===(o=c.calendarData.extendedProps)||void 0===o?void 0:o.total))])]),c._v(" "),u("div",{staticClass:"row"},[u("div",{staticClass:"col-lg-4"},[c._v("Status ")]),c._v(" "),u("div",{staticClass:"col-lg-8"},[c._v(": "+c._s(null===(d=c.calendarData.extendedProps)||void 0===d?void 0:d.status_label))])])]):c._e()])],1)],1),c._v(" "),c._m(0),c._v(" "),c._m(1),c._v(" "),c._m(2),c._v(" "),c._m(3),c._v(" "),c._m(4),c._v(" "),c._m(5),c._v(" "),c._m(6),c._v(" "),c._m(7),c._v(" "),c._m(8),c._v(" "),c._m(9)])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"card-body"},[this._v("\n          Keterangan Warna :"),t("br")])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"rgb(255, 37, 37)"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Menunggu Persetujuan Leader")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"orange"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Menunggu Persetujuan Direktur")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"yellow"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Menunggu Finance Manager")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"rgb(21, 255, 21)"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Menunggu Penjadwalan Finance")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"rgb(19, 98, 167)"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Menunggu Proses Finance")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"rgb(154, 11, 255)"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Menunggu Realisasi User")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"rgb(255, 7, 255)"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Realisasi, Menunggu Persetujuan Leader")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"rgb(175, 22, 160)"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Realisasi, Menunggu Proses Finance")])])},function(){var t=this._self._c;return t("div",{staticClass:"card-body row",staticStyle:{"margin-left":"20px"}},[t("div",{staticClass:"col-auto",staticStyle:{height:"auto",width:"50px","background-color":"rgb(0, 0, 0)"}}),this._v(" "),t("div",{staticClass:"col-auto"},[this._v(" : Konfirmasi User")])])}],!1,null,"95197c88",null);a.default=_.exports},k1Df:function(t,a,e){var s=e("QI4D");"string"==typeof s&&(s=[[t.i,s,""]]);var i={hmr:!0,transform:void 0,insertInto:void 0};e("aET+")(s,i);s.locals&&(t.exports=s.locals)},oQCV:function(t,a,e){"use strict";e("k1Df")},obGa:function(t,a,e){(t.exports=e("I1BE")(!1)).push([t.i,"#app[data-v-95197c88]{display:flex;overflow:hidden;height:100%}.calendar[data-v-95197c88]{flex:1;padding:2em}",""])}}]);