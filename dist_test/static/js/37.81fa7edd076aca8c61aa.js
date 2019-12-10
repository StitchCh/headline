webpackJsonp([37],{"2fTq":function(t,e,i){var n=i("uWdD");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("c7ef6ade",n,!1,{})},"2nlL":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"app-ecommerce-draft",components:{Account:i("2get").a},data:function(){return{loading:!0,width:0,list:[],filter:{app:"ECOMMERCE",pageSize:30,toPage:1,searchby:"",search:"title"},totalPage:1}},created:function(){this.getList()},mounted:function(){this.onResize(),window.addEventListener("resize",this.onResize)},beforeDestroy:function(){window.removeEventListener("resize",this.onResize)},methods:{onResize:function(){this.width=this.$refs.ul.clientWidth},deleteItem:function(t){var e=this;this.$confirm({title:"您确定要删除此草稿吗？",text:"删除后的草稿将无法恢复。",btns:["取消","删除"],color:"red",yes:function(){e.$http.post("/cri-cms-platform/articleAutoSave/delete.monitor",{id:t.id}).then(function(t){e.getList()})}})},getList:function(t){var e=this;this.loading=!0,t&&(this.filter.toPage=1),this.$http.post("/cri-cms-platform/articleAutoSave/listAuto.monitor",this.filter).then(function(t){e.list=t.pages||[],e.totalPage=t.totalPage,e.loading=!1}).catch(function(t){console.log(t)})},onPageChange:function(t){this.filter.toPage=parseInt(t),this.getList()}}},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"flex-item flex-col ecommerce-draft"},[i("div",{staticClass:"af-topbar flex-v-center"},[i("div",{staticClass:"flex-item"}),t._v(" "),i("account")],1),t._v(" "),i("div",{staticClass:"flex-item flex-col f-14"},[i("div",{staticClass:"t-center",staticStyle:{padding:"15px 0"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.searchby,expression:"filter.searchby"}],staticClass:"search",attrs:{type:"text",placeholder:"输入标题并回车"},domProps:{value:t.filter.searchby},on:{keyup:function(e){return"button"in e||!t._k(e.keyCode,"enter",13,e.key,"Enter")?t.getList(e):null},input:function(e){e.target.composing||t.$set(t.filter,"searchby",e.target.value)}}})]),t._v(" "),i("div",{staticClass:"box flex-item relative scroll-y"},[i("transition",{attrs:{name:"fade"}},[t.loading?i("div",{staticClass:"flex-center abs bg-f",staticStyle:{"z-index":"10"}},[i("loading")],1):t._e()]),t._v(" "),t.list.length?t._e():i("div",{staticClass:"abs flex-center",staticStyle:{height:"80%"}},[i("no-data")],1),t._v(" "),i("ul",{ref:"ul",staticClass:"flex",staticStyle:{"flex-wrap":"wrap","padding-bottom":"50px"},style:{paddingLeft:.5*(t.width-240*~~((t.width-80)/240))+"px"}},t._l(t.list,function(e){return i("li",{key:e.id,staticClass:"a",on:{click:function(i){t.$router.push("/ecommerceEdit/draft/"+e.id)}}},[i("div",{staticClass:"cover flex-center"},[e.thumb&&e.thumb.length?i("img",{attrs:{src:e.thumb[0].url,alt:""}}):t._e()]),t._v(" "),i("div",{staticClass:"flex-v-center item-info"},[i("div",{staticClass:"flex-item",staticStyle:{overflow:"hidden"}},[i("div",{staticClass:"c-6 item-name"},[t._v(t._s(e.title))]),t._v(" "),i("div",{staticClass:"f-12 c-8"},[t._v(t._s(e.createDate))])]),t._v(" "),i("icon-btn",{staticClass:"c-c",nativeOn:{click:function(i){i.stopPropagation(),t.deleteItem(e)}}},[t._v("delete")])],1)])}))],1)]),t._v(" "),i("div",{staticClass:"af-bottombar flex-center"},[t.totalPage?i("pagination",{attrs:{size:t.filter.pageSize,total:t.filter.pageSize*t.totalPage,page:t.filter.toPage},on:{change:t.onPageChange}}):t._e()],1)])};a._withStripped=!0;var o={render:a,staticRenderFns:[]},s=o;var r=!1;var c=i("VU/8")(n,s,!1,function(t){r||i("2fTq")},null,null);c.options.__file="src/apps/ecommerce/draft/index.vue";e.default=c.exports},uWdD:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.ecommerce-draft .search {\n  width: 300px;\n  line-height: 32px;\n  border: 1px solid #ddd;\n  border-radius: 20px;\n  padding: 0 20px;\n}\n.ecommerce-draft .box li {\n  width: 210px;\n  margin: 15px;\n  -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);\n  border-radius: 6px;\n  overflow: hidden;\n  -webkit-transition: -webkit-box-shadow 0.3s;\n  transition: -webkit-box-shadow 0.3s;\n  transition: box-shadow 0.3s;\n  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;\n}\n.ecommerce-draft .box li:hover {\n  -webkit-box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.05), 0 10px 30px rgba(0, 0, 0, 0.15);\n          box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.05), 0 10px 30px rgba(0, 0, 0, 0.15);\n}\n.ecommerce-draft .box li:hover .icon {\n  color: #ff7373;\n}\n.ecommerce-draft .box .cover {\n  width: 210px;\n  height: 210px;\n  background: #eee;\n}\n.ecommerce-draft .box .cover img {\n  max-height: 100%;\n}\n.ecommerce-draft .box .item-info {\n  padding: 10px;\n}\n.ecommerce-draft .box .item-name {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n",""])}});