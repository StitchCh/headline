webpackJsonp([78],{"2+XL":function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n={name:"app-article-history",props:["id"],data:function(){return{list:[]}},methods:{getList:function(){var t=this;this.id&&this.$http.post("/cri-cms-platform/article/getOperateHistroy.monitor",{contentId:this.id}).then(function(i){t.list=i}).catch(function(t){console.log(t)})}},created:function(){this.getList()}},r=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"relative article-history c-6"},[e("div",{staticClass:"article-history-content"},[e("table",[t._m(0),t._v(" "),e("tbody",t._l(t.list,function(i){return e("tr",{key:i.id},[e("td",[t._v(t._s(i.remark))]),t._v(" "),e("td",[t._v(t._s(i.operateUser))]),t._v(" "),e("td",[t._v(t._s(i.operateTime))])])}))])])])};r._withStripped=!0;var s={render:r,staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("thead",[i("th",[this._v("操作")]),this._v(" "),i("th",[this._v("操作人")]),this._v(" "),i("th",[this._v("操作时间")])])}]},a=s;var o=!1;var c=e("VU/8")(n,a,!1,function(t){o||e("ayKU")},null,null);c.options.__file="src/apps/article/list/history.vue";i.default=c.exports},ayKU:function(t,i,e){var n=e("j4iQ");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("rjj0")("28ba291b",n,!1,{})},j4iQ:function(t,i,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.article-history {\n  height: 100%;\n  overflow: auto;\n}\n.article-history .article-history-content {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 20px 0;\n  /*th,td {text-align: center;}*/\n}\n",""])}});