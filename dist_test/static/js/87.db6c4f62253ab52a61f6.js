webpackJsonp([87],{"/NQT":function(t,n,e){var s=e("yjOj");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("0374c091",s,!1,{})},"g/li":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("//Fk"),i=e.n(s),a=e("2get"),o=e("XRQI"),r=e("obnb"),u=e("y/1I"),l={name:"app-menus",components:{Account:a.a,Dock:o.a,SelectCard:r.a,SelectCardOption:u.a},data:function(){return{loading:!0,list:[],parentMenus:[],menuChildShow:{},detailShow:!1,detail:{},newShow:!1,newParentMenusShow:!1,newForm:{sysMenuParentId:"",sysMenuName:"",sysMenuUrl:"",sysMenuOrder:"",sysMenuShowFlag:1,sysMenuIcon:""},editShow:!1,editParentMenusShow:!1,editForm:{sysMenuParentId:"",sysMenuName:"",sysMenuUrl:"",sysMenuOrder:"",sysMenuShowFlag:1,sysMenuIcon:""}}},computed:{newParentMenus:{get:function(){return""===this.newForm.sysMenuParentId?[]:this.newForm.sysMenuParentId.split(",")},set:function(t){this.newForm.sysMenuParentId=t.join(",")}},editParentMenus:{get:function(){return""===this.editForm.sysMenuParentId?[]:this.editForm.sysMenuParentId.split(",")},set:function(t){this.editForm.sysMenuParentId=t.join(",")}}},methods:{getList:function(){var t=this;this.loading=!0,this.$http.post("/cri-cms-platform/sysMenu/list.monitor").then(function(n){t.list=n,t.loading=!1})},showChild:function(t){var n=this;this.menuChildShow[t]||(this.menuChildShow[t]=!0,this.loading=!0,this.$http.post("/cri-cms-platform/sysMenu/children.monitor",{id:t}).then(function(e){n.loading=!1;var s=e,i=[];for(var a in n.list)if(i.push(n.list[a]),t===n.list[a].id)for(var o in s)i.push(s[o]);n.list=i}))},packupChild:function(t){var n=[];for(var e in this.list)this.list[e].sysMenuParentId===t&&n.push(this.list[e].id);for(var s in this.list)-1!==n.indexOf(this.list[s].sysMenuParentId)&&n.push(this.list[s].id);var i=[];for(var a in this.list)-1===n.indexOf(this.list[a].id)&&i.push(this.list[a]);this.menuChildShow[t]=!1,this.list=i},openNew:function(t){var n=this;for(var e in this.newForm)this.newForm[e]="";"-1"===t?this.$http.post("/cri-cms-platform/sysMenu/list.monitor").then(function(t){var e=[{id:"-1",sysMenuName:"根目录"}];for(var s in t)e.push(t[s]);n.newForm.sysMenuShowFlag=1,n.newForm.sysMenuParentId="-1",n.parentMenus=e}):this.$http.post("/cri-cms-platform/sysMenu/get.monitor",{id:t}).then(function(t){var e=[];e.push(t.menu),n.parentMenus=e,n.newForm.sysMenuShowFlag="0",n.newForm.sysMenuParentId=t.menu.id}),this.newShow=!0},getNewParentMenus:function(){this.newParentMenusShow=!0},getEditParentMenus:function(){this.editParentMenusShow=!0},getNewMenu:function(t){return""===t?"":this.parentMenus.find(function(n){return t===n.id}).sysMenuName},getEditMenu:function(t){return""===t?"":this.parentMenus.find(function(n){return t===n.id}).sysMenuName},openDetail:function(t){var n=this;this.$http.post("/cri-cms-platform/sysMenu/get.monitor",{id:t}).then(function(t){n.detail=t,n.detailShow=!0}).catch(function(t){n.$toast(t.msg)})},getParent:function(t){return"-1"===t?"根目录":this.list.find(function(n){return t===n.id}).sysMenuName},deleteMenu:function(t){var n=this;this.$http.post("/cri-cms-platform/sysMenu/delete.monitor",{id:t}).then(function(t){n.$toast("删除成功"),n.getList(),n.detailShow=!1}).catch(function(t){n.$toast(t.msg)})},vertifyUrl:function(){},submitNew:function(){var t=this;""!==this.newForm.sysMenuParentId?""!==this.newForm.sysMenuName?""!==this.newForm.sysMenuOrder?""!==this.newForm.sysMenuUrl?""!==this.newForm.sysMenuIcon||-1!=this.editForm.sysMenuParentId?this.$http.post("/cri-cms-platform/sysMenu/save.monitor",this.newForm).then(function(n){t.getList(),t.newShow=!1}).catch(function(n){t.$toast(n.msg)}):this.$toast("请输入菜单图标"):this.$toast("请输入菜单URL"):this.$toast("请输入菜单排序"):this.$toast("请输入菜单名称"):this.$toast("请选择上级菜单")},openEdit:function(t){var n=this;this.$http.post("/cri-cms-platform/sysMenu/get.monitor",{id:t}).then(function(t){n.editForm.id=t.menu.id,n.editForm.sysMenuName=t.menu.sysMenuName,n.editForm.sysMenuUrl=t.menu.sysMenuUrl,n.editForm.sysMenuIcon=t.menu.sysMenuIcon,n.editForm.sysMenuShowFlag=Number(t.menu.sysMenuShowFlag),n.editForm.sysMenuOrder=t.menu.sysMenuOrder,"-1"===t.menu.sysMenuParentId?n.$http.post("/cri-cms-platform/sysMenu/list.monitor").then(function(t){var e=[{id:"-1",sysMenuName:"根目录"}];for(var s in t)e.push(t[s]);n.editForm.sysMenuParentId="-1",n.parentMenus=e}):n.$http.post("/cri-cms-platform/sysMenu/get.monitor",{id:t.menu.sysMenuParentId}).then(function(t){n.$http.post("/cri-cms-platform/sysMenu/list.monitor").then(function(e){var s=[{id:"-1",sysMenuName:"根目录"}];for(var i in e)s.push(e[i]),n.parentMenus=s,n.editForm.sysMenuParentId=t.menu.id})}),n.editShow=!0}).catch(function(t){n.$toast(t.msg)})},submitEdit:function(){var t=this;""!==this.editForm.sysMenuParentId?""!==this.editForm.sysMenuName?""!==this.editForm.sysMenuOrder?""!==this.editForm.sysMenuUrl?""!==this.editForm.sysMenuIcon||-1!=this.editForm.sysMenuParentId?this.$http.post("/cri-cms-platform/sysMenu/update.monitor",this.editForm).then(function(n){t.getList(),t.editShow=!1,t.detailShow=!1}).catch(function(n){t.$toast(n.msg)}):this.$toast("请输入菜单图标"):this.$toast("请输入菜单URL"):this.$toast("请输入菜单排序"):this.$toast("请输入菜单名称"):this.$toast("请选择上级菜单")},selectNewParentMenu:function(t){this.newForm.sysMenuShowFlag=-1==t?1:0;var n=this.newParentMenus.findIndex(function(n){return n===t}),e=this.newParentMenus.map(function(t){return t});-1===n?(e=[]).push(t):e.splice(n,1),this.newParentMenus=e,this.newParentMenusShow=!1},selectEditParentMenu:function(t){var n=this.editParentMenus.findIndex(function(n){return n===t}),e=this.editParentMenus.map(function(t){return t});-1===n?(e=[]).push(t):e.splice(n,1),this.editParentMenus=e,this.editParentMenusShow=!1}},filters:{showFlag:function(t){return"1"===t?"是":"0"===t?"否":""}},created:function(){var t=this;i.a.all([this.$http.post("/cri-cms-platform/sysMenu/list.monitor")]).then(function(n){t.list=n[0],t.loading=!1})}},d=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"abs bg-f c-6 flex-col app-menus"},[e("div",{staticClass:"af-topbar flex-v-center"},[e("dock",{attrs:{title:"菜单",color:"#2088ff"}}),t._v(" "),e("div",{staticClass:"flex-item"}),t._v(" "),e("account")],1),t._v(" "),e("div",{staticClass:"flex-item scroll-y bg-e relative menus-content"},[e("transition",{attrs:{name:"fade"}},[t.loading?e("div",{staticClass:"abs bg-e",staticStyle:{"z-index":"99"}},[e("loading",{staticStyle:{left:"50%",top:"50%",transform:"translate(-50%, -50%)"}})],1):t._e()]),t._v(" "),e("div",{staticClass:"setting-card f-16 add-btn",on:{click:function(n){t.openNew("-1")}}},[t._v("\n      添加新菜单...\n    ")]),t._v(" "),e("div",{staticClass:"setting-card f-14"},[e("table",[t._m(0),t._v(" "),e("tbody",t._l(t.list,function(n){return e("tr",{key:n.id,on:{click:function(e){t.openDetail(n.id)}}},[e("td",[t.menuChildShow[n.id]?e("icon-btn",{directives:[{name:"show",rawName:"v-show",value:"-1"==n.sysMenuParentId,expression:"item.sysMenuParentId == '-1'"},{name:"tooltip",rawName:"v-tooltip",value:"收起下级",expression:"'收起下级'"}],attrs:{small:""},nativeOn:{click:function(e){e.stopPropagation(),t.packupChild(n.id)}}},[t._v("keyboard_arrow_up")]):e("icon-btn",{directives:[{name:"show",rawName:"v-show",value:"-1"==n.sysMenuParentId,expression:"item.sysMenuParentId == '-1'"},{name:"tooltip",rawName:"v-tooltip",value:"展示下级",expression:"'展示下级'"}],attrs:{small:""},nativeOn:{click:function(e){e.stopPropagation(),t.showChild(n.id)}}},[t._v("keyboard_arrow_down")])],1),t._v(" "),e("td",[t._v(t._s(n.sysMenuName))]),t._v(" "),e("td",[t._v(t._s(n.sysMenuUrl))]),t._v(" "),e("td",[t._v(t._s(n.sysMenuOrder))]),t._v(" "),e("td",[t._v(t._s(n.sysMenuIcon))]),t._v(" "),e("td",[t._v(t._s(n.createDate))]),t._v(" "),e("td",[t._v(t._s(t._f("showFlag")(n.sysMenuShowFlag)))]),t._v(" "),e("td",{staticStyle:{width:"30px"}},[e("icon-btn",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"编辑",expression:"'编辑'"}],attrs:{small:""},nativeOn:{click:function(e){e.stopPropagation(),t.openEdit(n.id)}}},[t._v("edit")])],1),t._v(" "),e("td",{staticStyle:{width:"30px"}},[e("icon-btn",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"查看",expression:"'查看'"}],attrs:{small:""},nativeOn:{click:function(e){e.stopPropagation(),t.openDetail(n.id)}}},[t._v("\n              info\n            ")])],1),t._v(" "),e("td",{staticStyle:{width:"30px"}},[e("icon-btn",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"删除",expression:"'删除'"}],attrs:{small:""},nativeOn:{click:function(e){e.stopPropagation(),t.deleteMenu(n.id)}}},[t._v("\n              delete\n            ")])],1),t._v(" "),e("td",{staticStyle:{width:"30px"}},["1"===n.sysMenuShowFlag&&"-1"!==n.sysMenuParentId?e("icon-btn",{directives:[{name:"tooltip",rawName:"v-tooltip",value:"添加子菜单",expression:"'添加子菜单'"}],attrs:{small:""},nativeOn:{click:function(e){e.stopPropagation(),t.openNew(n.id)}}},[t._v("\n              add_child\n            ")]):t._e()],1)])}))])]),t._v(" "),t.detailShow?e("layer",{attrs:{title:"菜单详情",width:"600px",maskClick:""},on:{close:function(n){t.detailShow=!1}}},[e("div",{staticClass:"layer-text"},[e("table",[e("tbody",[e("tr",[e("th",{attrs:{align:"right"}},[t._v("菜单名称")]),t._v(" "),e("td",[t._v(t._s(t.detail.menu.sysMenuName))])]),t._v(" "),e("tr",[e("th",{attrs:{align:"right"}},[t._v("菜单URL")]),t._v(" "),e("td",[t._v(t._s(t.detail.menu.sysMenuUrl))])]),t._v(" "),e("tr",[e("th",{attrs:{align:"right"}},[t._v("菜单排序")]),t._v(" "),e("td",[t._v(t._s(t.detail.menu.sysMenuOrder))])]),t._v(" "),e("tr",[e("th",{attrs:{align:"right"}},[t._v("上级菜单")]),t._v(" "),e("td",[t._v(t._s(t.getParent(t.detail.menu.sysMenuParentId)))])]),t._v(" "),e("tr",[e("th",{attrs:{align:"right"}},[t._v("是否展示项")]),t._v(" "),e("td",[t._v(t._s(t._f("showFlag")(t.detail.menu.sysMenuShowFlag)))])]),t._v(" "),e("tr",{directives:[{name:"show",rawName:"v-show",value:"1"==t.detail.menu.sysMenuShowFlag,expression:"detail.menu.sysMenuShowFlag == '1'"}]},[e("th",{attrs:{align:"right"}},[t._v("菜单图标")]),t._v(" "),e("td",[t._v(t._s(t.detail.menu.sysMenuIcon))])]),t._v(" "),e("tr",[e("th",{attrs:{align:"right"}},[t._v("创建时间")]),t._v(" "),e("td",[t._v(t._s(t.detail.menu.createDate))])])])])]),t._v(" "),e("div",{staticClass:"layer-btns"},[e("btn",{attrs:{flat:"",color:"#66BB6A"},on:{click:function(n){t.detailShow=!1}}},[t._v("关闭")])],1)]):t._e(),t._v(" "),t.newShow?e("layer",{attrs:{title:"添加菜单",width:"600px"}},[e("div",{staticClass:"layer-text"},[e("input-box",{attrs:{label:"菜单名称"},model:{value:t.newForm.sysMenuName,callback:function(n){t.$set(t.newForm,"sysMenuName",n)},expression:"newForm.sysMenuName"}}),t._v(" "),e("input-box",{attrs:{label:"菜单URL"},model:{value:t.newForm.sysMenuUrl,callback:function(n){t.$set(t.newForm,"sysMenuUrl",n)},expression:"newForm.sysMenuUrl"}}),t._v(" "),e("input-box",{attrs:{label:"菜单排序"},model:{value:t.newForm.sysMenuOrder,callback:function(n){t.$set(t.newForm,"sysMenuOrder",n)},expression:"newForm.sysMenuOrder"}}),t._v(" "),e("input-box",{directives:[{name:"show",rawName:"v-show",value:"-1"==t.newForm.sysMenuParentId,expression:"newForm.sysMenuParentId == '-1'"}],attrs:{label:"图标"},model:{value:t.newForm.sysMenuIcon,callback:function(n){t.$set(t.newForm,"sysMenuIcon",n)},expression:"newForm.sysMenuIcon"}}),t._v(" "),e("div",[e("div",{staticClass:"flex-v-center"},[e("span",{staticClass:"flex-item"},[t._v("展示项")]),t._v(" "),e("switcher",{attrs:{mode:"Number"},model:{value:t.newForm.sysMenuShowFlag,callback:function(n){t.$set(t.newForm,"sysMenuShowFlag",n)},expression:"newForm.sysMenuShowFlag"}})],1)]),t._v(" "),e("div",{staticClass:"relative input-box"},[e("label",[t._v("上级菜单")]),t._v(" "),e("div",{staticStyle:{"padding-left":"80px"}},[t._l(t.newParentMenus,function(n){return e("tag",{key:n,attrs:{small:""}},[t._v(t._s(t.getNewMenu(n)))])}),t._v(" "),e("icon-btn",{attrs:{small:""},on:{click:t.getNewParentMenus}},[t._v("edit")])],2)])],1),t._v(" "),e("div",{staticClass:"layer-btns"},[e("btn",{attrs:{flat:""},on:{click:function(n){t.newShow=!1}}},[t._v("取消")]),t._v(" "),e("btn",{attrs:{flat:"",color:"#66BB6A"},on:{click:t.submitNew}},[t._v("提交")])],1)]):t._e(),t._v(" "),t.editShow?e("layer",{attrs:{title:"修改菜单",width:"600px"}},[e("div",{staticClass:"layer-text"},[e("input-box",{attrs:{label:"菜单名称"},model:{value:t.editForm.sysMenuName,callback:function(n){t.$set(t.editForm,"sysMenuName",n)},expression:"editForm.sysMenuName"}}),t._v(" "),e("input-box",{attrs:{label:"菜单URL"},model:{value:t.editForm.sysMenuUrl,callback:function(n){t.$set(t.editForm,"sysMenuUrl",n)},expression:"editForm.sysMenuUrl"}}),t._v(" "),e("input-box",{attrs:{label:"菜单排序"},model:{value:t.editForm.sysMenuOrder,callback:function(n){t.$set(t.editForm,"sysMenuOrder",n)},expression:"editForm.sysMenuOrder"}}),t._v(" "),e("input-box",{directives:[{name:"show",rawName:"v-show",value:"-1"==t.editForm.sysMenuParentId,expression:"editForm.sysMenuParentId == '-1'"}],attrs:{label:"图标"},model:{value:t.editForm.sysMenuIcon,callback:function(n){t.$set(t.editForm,"sysMenuIcon",n)},expression:"editForm.sysMenuIcon"}}),t._v(" "),e("div",[e("div",{staticClass:"flex-v-center"},[e("span",{staticClass:"flex-item"},[t._v("展示项")]),t._v(" "),e("switcher",{attrs:{mode:"Number"},model:{value:t.editForm.sysMenuShowFlag,callback:function(n){t.$set(t.editForm,"sysMenuShowFlag",n)},expression:"editForm.sysMenuShowFlag"}})],1)]),t._v(" "),e("div",{staticClass:"relative input-box"},[e("label",[t._v("上级菜单")]),t._v(" "),e("div",{staticStyle:{"padding-left":"50px"}},[t._l(t.editParentMenus,function(n){return e("tag",{key:n,attrs:{small:""}},[t._v(t._s(t.getEditMenu(n)))])}),t._v(" "),e("icon-btn",{attrs:{small:""},on:{click:t.getEditParentMenus}},[t._v("edit")])],2)])],1),t._v(" "),e("div",{staticClass:"layer-btns"},[e("btn",{attrs:{flat:""},on:{click:function(n){t.editShow=!1}}},[t._v("取消")]),t._v(" "),e("btn",{attrs:{flat:"",color:"#66BB6A"},on:{click:t.submitEdit}},[t._v("提交")])],1)]):t._e(),t._v(" "),t.newParentMenusShow?e("select-card",{attrs:{value:t.newParentMenus,multiple:"",title:"选择上级菜单",width:"600px",maskClick:""},on:{close:function(n){t.newParentMenusShow=!1}}},t._l(t.parentMenus,function(n){return e("select-card-option",{key:n.id,attrs:{value:n.id},on:{click:function(e){t.selectNewParentMenu(n.id)}}},[t._v(t._s(n.sysMenuName))])})):t._e(),t._v(" "),t.editParentMenusShow?e("select-card",{attrs:{value:t.editParentMenus,multiple:"",title:"选择上级菜单",width:"600px",maskClick:""},on:{close:function(n){t.editParentMenusShow=!1}}},t._l(t.parentMenus,function(n){return e("select-card-option",{key:n.id,attrs:{value:n.id},on:{click:function(e){t.selectEditParentMenu(n.id)}}},[t._v(t._s(n.sysMenuName))])})):t._e()],1)])};d._withStripped=!0;var c={render:d,staticRenderFns:[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("thead",[e("th",[t._v("选项卡")]),t._v(" "),e("th",[t._v("菜单名称")]),t._v(" "),e("th",[t._v("菜单URL")]),t._v(" "),e("th",[t._v("排序")]),t._v(" "),e("th",[t._v("图标")]),t._v(" "),e("th",[t._v("创建日期")]),t._v(" "),e("th",[t._v("展示项")]),t._v(" "),e("th",{attrs:{colspan:"4"}},[t._v("操作")])])}]},m=c;var h=!1;var p=e("VU/8")(l,m,!1,function(t){h||e("/NQT")},null,null);p.options.__file="src/apps/menus/index.vue";n.default=p.exports},yjOj:function(t,n,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.app-menus .menus-content .setting-card {\n  max-width: 1440px;\n  margin: 20px auto;\n  border-radius: 10px;\n  padding: 20px;\n  background: #fff;\n}\n.app-menus .menus-content .setting-card th,\n.app-menus .menus-content .setting-card td {\n  padding: 5px 10px;\n}\n.app-menus .menus-content .setting-card tr {\n  border-top: 1px solid #e1e1e1;\n  cursor: pointer;\n}\n.app-menus .menus-content .setting-card tr:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.app-menus .account {\n  position: absolute;\n  right: 15px;\n  top: 8px;\n  z-index: 30;\n}\n.app-menus .navigator-item.active {\n  background: #66BB6A;\n  color: #fff;\n}\n.app-menus .navigator-item .icon {\n  -webkit-transition: none;\n  transition: none;\n}\n.app-menus .menus-content .setting-card {\n  max-width: 1440px;\n  margin: 20px auto;\n  border-radius: 10px;\n  padding: 20px;\n  background: #fff;\n}\n.app-menus .menus-content .setting-card th,\n.app-menus .menus-content .setting-card td {\n  padding: 5px 10px;\n}\n.app-menus .menus-content .setting-card tr {\n  border-top: 1px solid #e1e1e1;\n  cursor: pointer;\n}\n.app-menus .menus-content .setting-card tr:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.app-menus .menus-content .add-btn {\n  color: #008cff;\n  padding: 14px 30px;\n  cursor: pointer;\n  -webkit-transition: background 0.2s;\n  transition: background 0.2s;\n}\n.app-menus .menus-content .add-btn:active {\n  background: #e1e1e1;\n}\n.app-menus .menus-content .layer-text th,\n.app-menus .menus-content .layer-text td {\n  padding: 5px 15px;\n}\n.app-menus .menus-content .layer-text th {\n  width: 130px;\n}\n",""])}});