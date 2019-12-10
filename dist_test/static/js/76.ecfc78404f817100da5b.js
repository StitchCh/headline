webpackJsonp([76],{"7qVs":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("2get"),o=n("XRQI"),a={components:{Account:i.a,Dock:o.a},data:function(){return{list:[],loading:!1,total:1,page:1,newShow:!1,editShow:!1,newForm:{appType:"android",updateType:0,version:"",downUrl:""},editForm:{appType:"android",updateType:0,version:"",downUrl:"",id:""}}},methods:{newSubmit:function(){var t=this;if(""==this.newForm.version)return this.$toast("请输入版本号"),!1;if(""==this.newForm.downUrl)return this.$toast("请输入下载地址"),!1;var e=this.newForm;this.$http.post("/cri-cms-platform/versionUpdate/save.monitor",e).then(function(e){t.getList(),t.newShow=!1})},openNew:function(){this.newForm={appType:"android",updateType:0,version:"",downUrl:""},this.newShow=!0},getList:function(){var t=this;this.$http.post("/cri-cms-platform/versionUpdate/page.monitor",{pageSize:15,toPage:this.page}).then(function(e){console.log(e),t.list=e.data})},deleteV:function(t){var e=this;this.$http.post("/cri-cms-platform/versionUpdate/del.monitor",{id:t}).then(function(t){e.getList()})},edit:function(t){var e=this;this.editShow=!0,this.$http.post("/cri-cms-platform/versionUpdate/updateQuery.monitor",{id:t}).then(function(t){console.log(t),e.editForm={appType:t.versionUpdate.appType,updateType:t.versionUpdate.updateType,version:t.versionUpdate.version,downUrl:t.versionUpdate.downUrl,id:t.versionUpdate.id}})},editSubmit:function(t){var e=this;this.$http.post("/cri-cms-platform/versionUpdate/update.monitor",this.editForm).then(function(t){console.log(t),e.editShow=!1,e.getList()})}},mounted:function(){this.getList()}},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"abs bg-f c-6 flex-col app-version"},[n("div",{staticClass:"af-topbar flex-v-center"},[n("dock",{attrs:{title:"版本",color:"#2088ff"}}),t._v(" "),n("div",{staticClass:"flex-item"}),t._v(" "),n("account")],1),t._v(" "),n("div",{staticClass:"flex-item scroll-y bg-e relative roles-content"},[n("transition",{attrs:{name:"fade"}},[t.loading?n("div",{staticClass:"abs bg-e",staticStyle:{"z-index":"99"}},[n("loading",{staticStyle:{left:"50%",top:"50%",transform:"translate(-50%, -50%)"}})],1):t._e()]),t._v(" "),n("div",{staticClass:"setting-card f-16 add-btn",on:{click:t.openNew}},[t._v("\n      添加新版本...\n    ")]),t._v(" "),n("div",{staticClass:"setting-card f-14"},[n("table",[t._m(0),t._v(" "),n("tbody",t._l(t.list,function(e,i){return n("tr",{key:e.id},[n("td",[t._v(t._s(e.version))]),t._v(" "),n("td",[t._v(t._s(e.appType))]),t._v(" "),n("td",[t._v(t._s(e.createUser))]),t._v(" "),n("td",[t._v(t._s(e.createDate))]),t._v(" "),n("td",[t._v(t._s(0==e.updateType?"选择更新":"强制更新"))]),t._v(" "),n("td",[t._v(t._s(e.downUrl))]),t._v(" "),n("td",{staticStyle:{width:"30px"}},[n("icon-btn",{attrs:{small:""},on:{click:function(n){t.edit(e.id)}}},[t._v("edit")])],1),t._v(" "),n("td",{staticStyle:{width:"30px"}},[n("icon-btn",{attrs:{small:""},on:{click:function(n){t.deleteV(e.id)}}},[t._v("delete")])],1)])}))]),t._v(" "),n("div",{staticClass:"flex-center"},[n("pagination",{attrs:{page:t.page,size:15,total:t.total},on:{change:function(e){t.page=e,t.getList()}}})],1)])],1),t._v(" "),t.newShow?n("div",{staticClass:"zzbox"},[n("div",{staticClass:"zz_box"},[n("p",{staticClass:"zz_title"},[t._v("新增版本")]),t._v(" "),n("div",[n("div",[n("p",[t._v("发布系统")]),t._v(" "),n("radio-box",{attrs:{text:"android",label:"android"},model:{value:t.newForm.appType,callback:function(e){t.$set(t.newForm,"appType",e)},expression:"newForm.appType"}}),t._v(" "),n("radio-box",{attrs:{text:"IOS",label:"IOS"},model:{value:t.newForm.appType,callback:function(e){t.$set(t.newForm,"appType",e)},expression:"newForm.appType"}})],1),t._v(" "),n("div",{staticStyle:{"margin-bottom":"20px"}},[n("p",[t._v("更新类型")]),t._v(" "),n("radio-box",{attrs:{text:"选择性",label:0},model:{value:t.newForm.updateType,callback:function(e){t.$set(t.newForm,"updateType",e)},expression:"newForm.updateType"}}),t._v(" "),n("radio-box",{attrs:{text:"强制性",label:1},model:{value:t.newForm.updateType,callback:function(e){t.$set(t.newForm,"updateType",e)},expression:"newForm.updateType"}})],1),t._v(" "),n("input-box",{attrs:{label:"版本号"},model:{value:t.newForm.version,callback:function(e){t.$set(t.newForm,"version",e)},expression:"newForm.version"}}),t._v(" "),n("input-box",{attrs:{label:"下载地址"},model:{value:t.newForm.downUrl,callback:function(e){t.$set(t.newForm,"downUrl",e)},expression:"newForm.downUrl"}}),t._v(" "),n("div",{staticClass:"layer-btns"},[n("btn",{attrs:{flat:""},on:{click:function(e){t.newShow=!1}}},[t._v("取消")]),t._v(" "),n("btn",{on:{click:t.newSubmit}},[t._v("提交")])],1)],1)])]):t._e(),t._v(" "),t.editShow?n("div",{staticClass:"zzbox"},[n("div",{staticClass:"zz_box"},[n("p",{staticClass:"zz_title"},[t._v("修改版本")]),t._v(" "),n("div",[n("div",[n("p",[t._v("发布系统")]),t._v(" "),n("radio-box",{attrs:{text:"android",label:"android"},model:{value:t.editForm.appType,callback:function(e){t.$set(t.editForm,"appType",e)},expression:"editForm.appType"}}),t._v(" "),n("radio-box",{attrs:{text:"IOS",label:"IOS"},model:{value:t.editForm.appType,callback:function(e){t.$set(t.editForm,"appType",e)},expression:"editForm.appType"}})],1),t._v(" "),n("div",{staticStyle:{"margin-bottom":"20px"}},[n("p",[t._v("更新类型")]),t._v(" "),n("radio-box",{attrs:{text:"选择性",label:0},model:{value:t.editForm.updateType,callback:function(e){t.$set(t.editForm,"updateType",e)},expression:"editForm.updateType"}}),t._v(" "),n("radio-box",{attrs:{text:"强制性",label:1},model:{value:t.editForm.updateType,callback:function(e){t.$set(t.editForm,"updateType",e)},expression:"editForm.updateType"}})],1),t._v(" "),n("input-box",{attrs:{label:"版本号"},model:{value:t.editForm.version,callback:function(e){t.$set(t.editForm,"version",e)},expression:"editForm.version"}}),t._v(" "),n("input-box",{attrs:{label:"下载地址"},model:{value:t.editForm.downUrl,callback:function(e){t.$set(t.editForm,"downUrl",e)},expression:"editForm.downUrl"}}),t._v(" "),n("div",{staticClass:"layer-btns"},[n("btn",{attrs:{flat:""},on:{click:function(e){t.editShow=!1}}},[t._v("取消")]),t._v(" "),n("btn",{on:{click:t.editSubmit}},[t._v("提交")])],1)],1)])]):t._e()])};r._withStripped=!0;var s={render:r,staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("th",[t._v("版本号")]),t._v(" "),n("th",[t._v("发布系统")]),t._v(" "),n("th",[t._v("创建人")]),t._v(" "),n("th",[t._v("创建日期")]),t._v(" "),n("th",[t._v("更新类型")]),t._v(" "),n("th",[t._v("下载地址")]),t._v(" "),n("th",{attrs:{colspan:"2"}},[t._v("操作")])])}]},p=s;var l=!1;var d=n("VU/8")(a,p,!1,function(t){l||n("m6C+")},null,null);d.options.__file="src/apps/version/index.vue";e.default=d.exports},j118:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.app-version .zzbox {\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  z-index: 20;\n  top: 0;\n  left: 0;\n  background: rgba(0, 0, 0, 0.5);\n}\n.app-version .zz_title {\n  font-size: 18px;\n  margin-bottom: 20px;\n  font-weight: bold;\n}\n.app-version .zz_box {\n  position: absolute;\n  width: 600px;\n  height: 440px;\n  background: #fff;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  border-radius: 10px;\n  padding: 20px;\n}\n.app-version .roles-content .setting-card {\n  max-width: 1440px;\n  margin: 20px auto;\n  border-radius: 10px;\n  padding: 20px;\n  background: #fff;\n}\n.app-version .roles-content .setting-card th,\n.app-version .roles-content .setting-card td {\n  padding: 5px 10px;\n}\n.app-version .roles-content .setting-card tr {\n  border-top: 1px solid #e1e1e1;\n  cursor: pointer;\n}\n.app-version .roles-content .setting-card tr:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.app-version .roles-content .add-btn {\n  color: #008cff;\n  padding: 14px 30px;\n  cursor: pointer;\n  -webkit-transition: background 0.2s;\n  transition: background 0.2s;\n}\n.app-version .roles-content .add-btn:active {\n  background: #e1e1e1;\n}\n.app-version .layer-text .tab {\n  margin-bottom: 10px;\n}\n.app-version .layer-text th,\n.app-version .layer-text td {\n  padding: 5px 15px;\n}\n.app-version .layer-text th {\n  width: 130px;\n}\n.app-version .layer-text .site-list {\n  width: 100px;\n  border-right: 1px solid rgba(0, 0, 0, 0.07);\n  -ms-flex-item-align: stretch;\n      align-self: stretch;\n}\n.app-version .layer-text .site-list li {\n  height: 30px;\n  line-height: 30px;\n  padding: 0 20px;\n  -webkit-transition: all 0.2s;\n  transition: all 0.2s;\n  cursor: pointer;\n}\n.app-version .layer-text .site-list li:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.app-version .layer-text .site-list li.selected {\n  color: #4caf50;\n}\n.app-version .layer-text .site-list li.on {\n  color: #008cff;\n}\n.app-version .layer-text .channel-list {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  min-height: 40px;\n}\n",""])},"m6C+":function(t,e,n){var i=n("j118");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("43f6f4a0",i,!1,{})}});