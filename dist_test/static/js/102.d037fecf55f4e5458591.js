webpackJsonp([102],{"2LBU":function(e,t,c){(e.exports=c("FZ+f")(!1)).push([e.i,"\n.app-ecommerce .navigator-item.active {\n  color: #009282;\n}\n",""])},"7P7m":function(e,t,c){var r=c("2LBU");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);c("rjj0")("23c2e605",r,!1,{})},mx9u:function(e,t,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=c("2Dnl"),o=c("MYRd"),n={name:"app-ecommerce",components:{AfCenter:r.a,AfLeft:o.a},computed:{defaultActive:function(){var e=this.$route.name;e=e||"";var t=this.$route.query.status;return t||e.replace("Content","")}}},a=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"abs bg-f flex app-ecommerce"},[c("af-left",{attrs:{color:"#4d7b76","bg-color":"#e0f3f1","vibrant-color":"#009282",title:"电商",defaultActive:e.defaultActive}},[c("navigator-item",{attrs:{icon:"folder",index:"all"},on:{click:function(t){e.$router.replace("/ecommerce?status=all")}}},[e._v("全部")]),e._v(" "),c("navigator-item",{attrs:{icon:"check_circle",index:"PASS"},on:{click:function(t){e.$router.replace("/ecommerce?status=PASS")}}},[e._v("已审")]),e._v(" "),c("navigator-item",{attrs:{icon:"hourglass_full",index:"AUDITING"},on:{click:function(t){e.$router.replace("/ecommerce?status=AUDITING")}}},[e._v("待审")]),e._v(" "),c("navigator-item",{attrs:{icon:"error",index:"EcommerceReject"},on:{click:function(t){e.$router.replace("/ecommerce/reject")}}},[e._v("驳回")]),e._v(" "),c("navigator-item",{attrs:{icon:"class",index:"EcommerceDraft"},on:{click:function(t){e.$router.replace("/ecommerce/draft")}}},[e._v("草稿")]),e._v(" "),c("navigator-item",{attrs:{icon:"delete",index:"EcommerceRecycle"},on:{click:function(t){e.$router.replace("/ecommerce/recycle")}}},[e._v("回收站")])],1),e._v(" "),c("router-view")],1)};a._withStripped=!0;var i={render:a,staticRenderFns:[]},l=i;var s=!1;var u=c("VU/8")(n,l,!1,function(e){s||c("7P7m")},null,null);u.options.__file="src/apps/ecommerce/index.vue";t.default=u.exports}});