webpackJsonp([96],{"72QE":function(t,e,i){var a=i("nyK7");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("ae269bc0",a,!1,{})},Lq2v:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("2get"),o=i("qfV/"),s=i("O4Lo"),l=i.n(s),n={name:"video-album",components:{Account:a.a,ListView:o.a},props:["id"],data:function(){return{list:[],totalPage:1,filter:{toPage:1,pageSize:30,title:""}}},methods:{getList:function(t){var e=this;t&&(this.filter.toPage=1),this.$http.post("/cri-cms-platform/video/albumList.monitor",this.filter).then(function(t){e.list=t.data||[],e.totalPage=t.totalPage||1,e.$router.push("/video/album/"+e.list[0].id)}).catch(function(t){console.log(t)})},onPrev:function(){var t=this.filter;1!==t.toPage&&(t.toPage=t.toPage<=1?1:t.toPage-1)},onNext:function(){var t=this.filter,e=this.totalPage;t.toPage!==e&&(t.toPage=t.toPage>=e?e:t.toPage+1)},search:l()(function(){this.getList(!0)},400),deleteAlbum:function(){var t=this;this.$confirm({title:"您确定要删除此专辑吗？",text:"被删除的专辑将无法恢复。",btns:["取消","删除"],color:"red",yes:function(){t.$http.post("/cri-cms-platform/video/albumDel.monitor",{id:t.id}).then(function(e){t.getList(),t.$router.replace("/video/album")})}})}},created:function(){this.getList()},watch:{"filter.title":function(){this.search()},"filter.toPage":function(){this.getList()}}},r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"flex-item flex album"},[i("div",{staticClass:"flex-col album-center"},[i("div",{staticClass:"af-topbar flex-center"},[i("icon-btn",{directives:[{name:"tooltip",rawName:"v-tooltip:bottom",value:"添加",expression:"'添加'",arg:"bottom"}],staticClass:"add-btn",on:{click:function(e){t.$router.push("/videoAlbumEdit")}}},[t._v("add")])],1),t._v(" "),i("div",{staticClass:"flex-v-center search-bar c-6 f-13"},[i("i",{staticClass:"icon c-a f-20"},[t._v("search")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.filter.title,expression:"filter.title"}],staticClass:"flex-item c-6 f-14 search-input",attrs:{type:"text",placeholder:"搜索标题"},domProps:{value:t.filter.title},on:{input:function(e){e.target.composing||t.$set(t.filter,"title",e.target.value)}}}),t._v(" "),i("icon-btn",{attrs:{small:""},on:{click:function(e){t.filter.title=""}}},[t._v("close")])],1),t._v(" "),i("list-view",{staticClass:"flex-item",attrs:{list:t.list},on:{prev:function(e){t.filter.toPage=t.filter.toPage<=1?1:t.filter.toPage-1},next:function(e){t.filter.toPage=t.filter.toPage>=t.totalPage?t.totalPage:t.filter.toPage+1}},scopedSlots:t._u([{key:"default",fn:function(e){return i("li",{},[i("div",{staticClass:"list-item c-6 f-14 a flex-v-center",class:{on:e.item.id===t.id},on:{click:function(i){t.$router.push("/video/album/"+e.item.id)}}},[i("div",{staticClass:"list-thumb flex-center"},[e.item.thumb.length?i("img",{attrs:{src:e.item.thumb,alt:""}}):t._e()]),t._v(" "),i("div",{staticClass:"flex-item"},[i("div",{staticClass:"b",staticStyle:{"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis"}},[t._v(t._s(e.item.title))]),t._v(" "),i("div",{staticClass:"c-8 f-12",staticStyle:{"white-space":"nowrap",overflow:"hidden","text-overflow":"ellipsis","margin-top":"5px"}},[i("span",[t._v(t._s(e.item.videoAbstract))])]),t._v(" "),i("div",{staticClass:"c-8 f-12",staticStyle:{"margin-top":"5px"}},[i("span",[t._v(t._s(e.item.createDate))])])])])])}}])}),t._v(" "),i("div",{staticClass:"af-bottombar flex-center"},[i("icon-btn",{staticClass:"a",attrs:{small:"",disabled:t.filter.toPage<=1},on:{click:t.onPrev}},[t._v("keyboard_arrow_left")]),t._v(" "),i("span",{staticClass:"f-14 c-6",staticStyle:{margin:"0 10px","line-height":"1em"}},[t._v("第 "+t._s(t.filter.toPage)+" / "+t._s(t.totalPage)+" 页")]),t._v(" "),i("icon-btn",{staticClass:"a",attrs:{small:"",disabled:t.filter.toPage>=t.totalPage},on:{click:t.onNext}},[t._v("keyboard_arrow_right")])],1)],1),t._v(" "),i("div",{staticClass:"af-right flex-item flex-col"},[i("div",{staticClass:"af-topbar flex-v-center"},[t.$route.params.id?i("div",{staticClass:"flex-v-center"},[i("icon-btn",{directives:[{name:"tooltip",rawName:"v-tooltip:bottom",value:"编辑",expression:"'编辑'",arg:"bottom"}],staticStyle:{"margin-right":"10px"},attrs:{small:""},on:{click:function(e){t.$router.push("/videoAlbumEdit/"+t.id)}}},[t._v("edit")]),t._v(" "),i("icon-btn",{directives:[{name:"tooltip",rawName:"v-tooltip:bottom",value:"删除",expression:"'删除'",arg:"bottom"}],attrs:{small:""},on:{click:t.deleteAlbum}},[t._v("delete")])],1):t._e(),t._v(" "),i("div",{staticClass:"flex-item"}),t._v(" "),i("account")],1),t._v(" "),i("router-view")],1)])};r._withStripped=!0;var c={render:r,staticRenderFns:[]},f=c;var d=!1;var u=i("VU/8")(n,f,!1,function(t){d||i("72QE")},null,null);u.options.__file="src/apps/videos/album/index.vue";e.default=u.exports},nyK7:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.album .search-bar {\n  border-bottom: 1px solid #ddd;\n  height: 36px;\n  padding: 0 15px;\n  line-height: 1em;\n}\n.album .search-input {\n  height: 30px;\n  border: none;\n  background: transparent;\n  margin-left: 10px;\n}\n.album .album-center {\n  width: 400px;\n  border-right: 1px solid rgba(0, 0, 0, 0.1);\n  background: #f8f8f8;\n}\n.album .list-thumb {\n  width: 80px;\n  height: 60px;\n  background: rgba(0, 0, 0, 0.07);\n  margin-right: 10px;\n}\n.album .list-thumb img {\n  max-width: 100%;\n  max-height: 100%;\n}\n.album .list-item.on {\n  background: #42aad8;\n  color: #fff;\n}\n.album .list-item.on span {\n  color: rgba(255, 255, 255, 0.8);\n}\n",""])}});