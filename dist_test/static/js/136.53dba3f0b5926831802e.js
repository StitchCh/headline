webpackJsonp([136],{JB2T:function(t,s,e){var i=e("pK+M");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("rjj0")("ee609e7c",i,!1,{})},"pK+M":function(t,s,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.gallery-statistics {\n  height: 100%;\n  overflow: auto;\n}\n.gallery-statistics .gallery-statistics-content {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 20px 0;\n  /*th,td {text-align: center;}*/\n}\n",""])},rOXR:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=e("Icdr"),a=e.n(i),n=(e("GbHy"),e("4UDB"),e("Oq2I"),e("YsUA"),e("miEh"),e("80cc"),{name:"app-gallery-statistics",props:["id"],data:function(){return{statistics:null,days:{value:"1",list:[{value:"1",text:"当日"},{value:"2",text:"昨日"},{value:"3",text:"7日内"},{value:"4",text:"30日内"}]},myEcharts:null,option:{title:{text:"趋势"},tooltip:{trigger:"axis"},toolbox:{feature:{dataView:{show:!0,readOnly:!0},magicType:{show:!0,type:["line","bar","stack","tiled"]},restore:{show:!0},saveAsImage:{show:!0}}},legend:{},dataset:{source:[],dimension:[{name:"day",type:"string"},{name:"pv"},{name:"uv"}]},xAxis:{type:"category"},yAxis:{},series:[{name:"pv",type:"line",seriesLayoutBy:"row"},{name:"uv",type:"line",seriesLayoutBy:"row"}]},pv:0,uv:0}},methods:{getStatistics:function(){var t=this;this.$http.post("/cri-cms-platform/gallery/statistics.monitor",{contentId:this.id,days:this.days.value}).then(function(s){t.statistics=s;var e=["day"],i=["pv"],a=["uv"],n=0,l=0;for(var o in t.statistics.pv)e.push(o),i.push(t.statistics.pv[o]),a.push(t.statistics.uv[o]),n+=Number(t.statistics.pv[o]),l+=Number(t.statistics.uv[o]);t.pv=n,t.uv=l,t.option.dataset.source=[e,i,a],t.setOption()})},setOption:function(){this.myEcharts.setOption(this.option)}},created:function(){this.getStatistics()},mounted:function(){this.myEcharts=a.a.init(this.$refs.echarts)}}),l=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"relative gallery-statistics c-6"},[e("div",{staticClass:"gallery-statistics-content"},[e("div",{staticClass:"flex"},[e("select-box",{attrs:{list:t.days.list,label:"时间范围"},on:{change:t.getStatistics},model:{value:t.days.value,callback:function(s){t.$set(t.days,"value",s)},expression:"days.value"}})],1),t._v(" "),t.statistics?t._e():e("div",{staticClass:"abs flex-center",staticStyle:{height:"400px"}},[e("no-data")],1),t._v(" "),e("div",{ref:"echarts",staticStyle:{height:"400px"}}),t._v(" "),t.statistics?e("div",{staticClass:"flex",staticStyle:{"padding-top":"20px"}},[e("div",{staticClass:"flex-item"},[e("div",{staticStyle:{"font-weight":"700",color:"#000000","margin-bottom":"20px"}},[t._v(t._s(t.days.list.find(function(s){return s.value===t.days.value}).text)+"总计")]),t._v(" "),e("table",[e("tbody",[e("tr",{staticStyle:{border:"0"}},[e("th",[t._v("阅读")]),t._v(" "),e("td",[t._v(t._s(t.statistics.global.pv))])]),t._v(" "),e("tr",[e("th",[t._v("评论")]),t._v(" "),e("td",[t._v(t._s(t.statistics.global.commentCount))])]),t._v(" "),e("tr",[e("th",[t._v("分享")]),t._v(" "),e("td",[t._v(t._s(t.statistics.global.shareCount))])]),t._v(" "),e("tr",[e("th",[t._v("点赞")]),t._v(" "),e("td",[t._v(t._s(t.statistics.global.diggCount))])])])])]),t._v(" "),e("div",{staticStyle:{flex:"2","margin-left":"100px"}},[e("div",{staticStyle:{"font-weight":"700",color:"#000000","margin-bottom":"20px"}},[t._v("各平台统计")]),t._v(" "),e("table",[e("tbody",[e("tr",[e("th",[t._v("pv")]),t._v(" "),e("td",[t._v(t._s(t.pv))])]),t._v(" "),e("tr",[e("th",[t._v("uv")]),t._v(" "),e("td",[t._v(t._s(t.uv))])])])])])]):t._e()])])};l._withStripped=!0;var o={render:l,staticRenderFns:[]},r=o;var c=!1;var v=e("VU/8")(n,r,!1,function(t){c||e("JB2T")},null,null);v.options.__file="src/apps/gallery/list/statistics.vue";s.default=v.exports}});