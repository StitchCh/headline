webpackJsonp([141],{"+e73":function(e,t,n){var i=n("dnp8");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("4e06f7a8",i,!1,{})},MIzW:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("S07m"),r=n.n(i),o=(n("O4Lo"),n("jelr")),a=n("4r9f"),l=n("jLa5"),d=[],c={name:"article-editor",components:{VueUeditorWrap:r.a,MediaPhotos:o.default,MediaVideos:a.default,MediaAudios:l.default},data:function(){return{siteId:"1001",liststr:"",startNumber:0,end:0,btn:"",arList:[],allLength:0,number:0,sitesList:[],ui:{imageSelectorShow:!1,videoSelectorShow:!1,audioSelectorShow:!1,index:0},title:"",titleColorBoxShow:!1,titleColor:"#000000",content:"",endn:0,editor:null,config:{autoFloatEnabled:!1,zIndex:1,height:800,toolbars:[["fullscreen","autotypeset","|","source","undo","redo","|","formatmatch","removeformat","cleardoc","|","link","unlink","|","selectimage","imagenone","imageleft","imageright","|","selectvideo","|","selectaudio"],["paragraph","justifyleft","justifyright","justifycenter","justifyjustify","|","insertorderedlist","insertunorderedlist","|","indent","rowspacingtop","rowspacingbottom","lineheight","|","pagebreak","horizontal","|","fontsize","fontfamily","forecolor","backcolor","fontborder","bold","italic","underline","strikethrough","superscript","subscript","spechars"]],labelMap:{selectimage:"插入图片"},wordCount:!1,autoHeightEnabled:!0,initialFrameHeight:window.innerHeight-250,serverUrl:"/cri-cms-platform/media/uploadIAU.monitor",imageActionName:"/cri-cms-platform/media/uploadIAU.monitor"}}},methods:{start:function(){var e=this,t=this;this.startNumber=Number(this.startNumber),this.end=Number(this.end),this.number+this.startNumber<this.end&&this.$http.post("/cri-cms-platform/automatic/get.monitor",{siteId:this.siteId,id:this.arList[this.number+this.startNumber]}).then(function(n){e.content=n.article.content,setTimeout(function(){t.btn.click(),setTimeout(function(){t.$http.post("/cri-cms-platform/automatic/update.monitor",{siteId:e.siteId,id:t.arList[t.number+e.startNumber],content:t.editor.getContent()}).then(function(n){console.log(t.number+e.startNumber,t.end),t.number=t.number+1,e.start()})})})})},setStyle:function(e){this.content=e},titleChange:function(){var e=this;1002==sessionStorage.siteId&&this.$http.post("/cri-cms-platform/article/getKeyToTitle.monitor",{doc:this.title}).then(function(t){e.$emit("changeTitle",t.key.join(","))})},getText:function(){return this.editor.getContentTxt()},changeTitleColor:function(e){this.titleColor=e,this.titleColorBoxShow=!1},insertImage:function(){var e=this,t=this.$refs.mediaPhotos.selected.map(function(t){return{src:e.$refs.mediaPhotos.imgOrigin+t.filePath+t.fileName}});t.length&&this.editor.execCommand("insertimage",t),this.ui.imageSelectorShow=!1},insertVideo:function(){var e=this.$refs.mediaVideos.origin,t=this.$refs.mediaVideos.selected.map(function(t){return{url:e+t.video,thumb:e+t.thumb}});t.length&&this.editor.execCommand("insertvideo",t,"upload"),this.ui.videoSelectorShow=!1},insertAudio:function(){var e=this,t=this.$refs.mediaAudios.origin,n=this.$refs.mediaAudios.selected.map(function(e){return{url:t+e.audio}});console.log(n),n.length&&n.forEach(function(t){e.editor.execCommand("music",t,"upload",!0)}),this.ui.audioSelectorShow=!1},ready:function(e){var t=this;this.editor=e,window.UE.commands.selectimage={execCommand:function(){t.ui.imageSelectorShow=!0}},window.UE.commands.selectvideo={execCommand:function(){t.ui.videoSelectorShow=!0}},window.UE.commands.selectaudio={execCommand:function(){t.ui.audioSelectorShow=!0}},this.btn=document.getElementById("edui4_button_body")}},mounted:function(){this.arList=d,this.allLength=this.arList.length,this.end=this.arList.length},watch:{liststr:function(){this.arList=this.liststr.split(","),this.allLength=this.arList.length,this.end=this.arList.length}}},s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticStyle:{"max-height":"100%",position:"fixed",top:"0",left:"0",overflow:"auto",width:"100%"}},[n("div",{staticClass:"article-editor"},[n("div",[n("vue-ueditor-wrap",{ref:"editor",attrs:{config:e.config,destroy:!0},on:{ready:e.ready},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1),e._v(" "),n("div",[n("div",[e._v("\n        共："+e._s(e.allLength)+"\n      ")]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.startNumber,expression:"startNumber"}],attrs:{type:"text"},domProps:{value:e.startNumber},on:{input:function(t){t.target.composing||(e.startNumber=t.target.value)}}}),e._v("\n      到\n      "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.end,expression:"end"}],attrs:{type:"text"},domProps:{value:e.end},on:{input:function(t){t.target.composing||(e.end=t.target.value)}}}),e._v(" "),n("btn",{on:{click:e.start}},[e._v("开始")])],1),e._v(" "),n("div",[e._v("\n       站点： "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.siteId,expression:"siteId"}],attrs:{type:"text"},domProps:{value:e.siteId},on:{input:function(t){t.target.composing||(e.siteId=t.target.value)}}})]),e._v(" "),n("div",[e._v("ids:")]),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.liststr,expression:"liststr"}],domProps:{value:e.liststr},on:{input:function(t){t.target.composing||(e.liststr=t.target.value)}}})])])};s._withStripped=!0;var p={render:s,staticRenderFns:[]},u=p;var m=!1;var h=n("VU/8")(c,u,!1,function(e){m||n("+e73")},null,null);h.options.__file="src/apps/articleClearStyle/index.vue";t.default=h.exports},dnp8:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.article-editor {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 10px;\n  /*.ql-toolbar.ql-snow, .ql-container.ql-snow{border: none;}*/\n  /*.ql-toolbar.ql-snow{position: sticky;top: 0;border-top: 1px solid #ddd;background: #fff;z-index: 10;}*/\n  /*.ql-editor{font-size: 14px;color: #555;min-height: 200px;}*/\n  /*.ql-formats svg{vertical-align: top;}*/\n  /*.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"1\"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"1\"]::before{content: '一级标题'}*/\n  /*.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"2\"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"2\"]::before{content: '二级标题'}*/\n  /*.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"3\"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"3\"]::before{content: '三级标题'}*/\n  /*.ql-snow .ql-picker.ql-header .ql-picker-label[data-value=\"4\"]::before, .ql-snow .ql-picker.ql-header .ql-picker-item[data-value=\"4\"]::before{content: '四级标题'}*/\n  /*.ql-snow .ql-picker.ql-header .ql-picker-label::before, .ql-snow .ql-picker.ql-header .ql-picker-item::before{content: '正文'}*/\n  /*.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before{content: '超大'}*/\n  /*.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before{content: '大号'}*/\n  /*.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before, .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before{content: '小号'}*/\n  /*.ql-snow .ql-picker.ql-size .ql-picker-label::before, .ql-snow .ql-picker.ql-size .ql-picker-item::before{content: '正常'}*/\n  /*.ql-snow .ql-tooltip::before{content: '链接地址'}*/\n  /*.ql-snow .ql-tooltip a.ql-action::after{content: '修改'}*/\n  /*.ql-snow .ql-tooltip a.ql-remove::before{content: '删除'}*/\n  /*.ql-tooltip{border-radius: 6px;}*/\n}\n.article-editor .title {\n  outline: none;\n  resize: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin-bottom: 10px;\n}\n.article-editor .flex-v-center {\n  font-size: 14px !important;\n}\n.article-editor .title {\n  font-size: 30px;\n  font-weight: bold;\n  border: none;\n  width: 100%;\n  background: transparent;\n  padding: 20px 15px;\n  color: #555;\n  padding-right: 30px;\n}\n.article-editor .title::-webkit-input-placeholder {\n  color: #aaa;\n}\n.article-editor .title-colorpicker-btn {\n  width: 25px;\n  height: 25px;\n  border: 1px solid transparent;\n  margin: 3px;\n}\n.article-editor .title-colorpicker-btn:hover {\n  border: 1px solid #000000;\n}\n.article-editor .title-color-list {\n  width: 192px;\n  padding: 10px;\n}\n.article-editor .edui-for-selectimage .edui-icon {\n  background-position: -380px 0 !important;\n}\n.article-editor .edui-for-selectvideo .edui-icon {\n  background-position: -320px -20px !important;\n}\n.article-editor .edui-for-selectaudio .edui-icon {\n  background-position: -18px -40px !important;\n}\n.article-editor .layer-ctn {\n  max-width: 1000px;\n}\n.article-editor .layer-ctn .af-left {\n  width: 280px;\n  background: #fff;\n  border-right: 1px solid rgba(0, 0, 0, 0.05);\n}\n.article-editor .layer-ctn .nav-item {\n  height: 40px;\n  border-bottom: 1px solid #eee;\n  line-height: 1em;\n  padding: 0 5px 0 15px;\n}\n.article-editor .layer-ctn .nav-item.nav-item-folder {\n  padding-left: 30px;\n}\n.article-editor .layer-ctn .nav-item:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.article-editor .layer-ctn .nav-item.on {\n  background: #318fff;\n  border-color: #fff;\n  color: #fff;\n}\n.article-editor .layer-ctn .nav-item.on .icon-btn {\n  color: #fff;\n}\n.article-editor .layer-ctn .nav-item input {\n  border: none;\n  height: 36px;\n  background: transparent;\n}\n.article-editor .layer-ctn .nav-item input::-webkit-input-placeholder {\n  color: #aaa;\n}\n.article-editor .layer-ctn .nav-item .nav-item-icon {\n  margin-right: 15px;\n}\n.article-editor .layer-ctn .search-bar input {\n  width: 150px;\n  height: 100%;\n  border: none;\n  margin-left: 10px;\n}\n.article-editor .layer-ctn .media-group {\n  padding: 13px 30px;\n}\n.article-editor .layer-ctn .media-group ul {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.article-editor .layer-ctn .media-group li {\n  margin: 0 6px 6px 0;\n}\n.article-editor .layer-ctn .media-group-title {\n  padding: 15px 0;\n}\n.article-editor .layer-ctn .media-group-title {\n  padding: 15px 0;\n}\n.article-editor .layer-ctn .bubble-item {\n  padding: 4px 15px;\n  white-space: nowrap;\n  cursor: pointer;\n}\n.article-editor .layer-ctn .bubble-item:hover {\n  background: rgba(0, 0, 0, 0.1);\n}\n.article-editor .layer-ctn .datepicker:before {\n  content: none;\n}\n.article-editor .layer-ctn .datepicker input {\n  background: transparent;\n  border: none;\n  padding: 0 10px;\n}\n.article-editor .layer-ctn .datepicker-range {\n  min-width: 200px;\n}\n.article-editor .layer-ctn .datepicker-range .datepicker-popup {\n  right: 0;\n  width: 420px;\n}\n",""])}});