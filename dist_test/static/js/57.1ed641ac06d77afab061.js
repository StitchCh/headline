webpackJsonp([57],{JjuC:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i("Icdr"),a=i.n(e),n=(i("GbHy"),i("4UDB"),i("Oq2I"),i("YsUA"),i("miEh"),i("80cc"),{name:"app-article-statistics",props:["id"],data:function(){return{statistics:null,days:{value:"1",list:[{value:"1",text:"当日"},{value:"2",text:"昨日"},{value:"3",text:"7日内"},{value:"4",text:"30日内"}]},myEcharts:null,option:{title:{text:"趋势"},tooltip:{trigger:"axis"},toolbox:{feature:{dataView:{show:!0,readOnly:!0},magicType:{show:!0,type:["line","bar","stack","tiled"]},restore:{show:!0},saveAsImage:{show:!0}}},legend:{},dataset:{source:[],dimension:[{name:"day",type:"string"},{name:"pv"},{name:"uv"}]},xAxis:{type:"category"},yAxis:{},series:[{name:"pv",type:"line",seriesLayoutBy:"row"},{name:"uv",type:"line",seriesLayoutBy:"row"}]}}},methods:{getStatistics:function(){var t=this;this.$http.post("/cri-cms-platform/vote/statistics.monitor",{contentId:this.id,days:this.days.value}).then(function(s){t.statistics=s;var i=["day"],e=["pv"],a=["uv"],n=0,o=0;for(var c in t.statistics.pv)i.push(c),e.push(t.statistics.pv[c]),a.push(t.statistics.uv[c]),n+=Number(t.statistics.pv[c]),o+=Number(t.statistics.uv[c]);t.pv=n,t.uv=o,t.option.dataset.source=[i,e,a],t.setOption()})},setOption:function(){this.myEcharts.setOption(this.option)}},created:function(){this.getStatistics()},mounted:function(){this.myEcharts=a.a.init(this.$refs.echarts)}}),o=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"relative article-statistics c-6"},[i("div",{staticClass:"article-statistics-content"},[i("div",{staticClass:"flex"},[i("select-box",{attrs:{list:t.days.list,label:"时间范围"},on:{change:t.getStatistics},model:{value:t.days.value,callback:function(s){t.$set(t.days,"value",s)},expression:"days.value"}})],1),t._v(" "),t.statistics?t._e():i("div",{staticClass:"abs flex-center",staticStyle:{height:"400px"}},[i("no-data")],1),t._v(" "),i("div",{ref:"echarts",staticStyle:{height:"400px"}}),t._v(" "),t.statistics?i("div",{staticClass:"flex",staticStyle:{"padding-top":"20px"}},[i("div",{staticClass:"flex-item"},[i("div",{staticStyle:{"font-weight":"700",color:"#000000","margin-bottom":"20px"}},[t._v(t._s(t.days.list.find(function(s){return s.value===t.days.value}).text)+"总计")]),t._v(" "),i("table",[i("tbody",[i("tr",{staticStyle:{border:"0"}},[i("th",[t._v("阅读")]),t._v(" "),i("td",[t._v(t._s(t.statistics.global.pv))])]),t._v(" "),i("tr",[i("th",[t._v("评论")]),t._v(" "),i("td",[t._v(t._s(t.statistics.global.commentCount))])]),t._v(" "),i("tr",[i("th",[t._v("分享")]),t._v(" "),i("td",[t._v(t._s(t.statistics.global.shareCount))])]),t._v(" "),i("tr",[i("th",[t._v("点赞")]),t._v(" "),i("td",[t._v(t._s(t.statistics.global.diggCount))])])])])]),t._v(" "),i("div",{staticStyle:{flex:"2","margin-left":"100px"}},[i("div",{staticStyle:{"font-weight":"700",color:"#000000","margin-bottom":"20px"}},[t._v("各平台统计")]),t._v(" "),i("table",[i("tbody",[i("tr",[i("th",[t._v("pv")]),t._v(" "),i("td",[t._v(t._s(t.pv))])]),t._v(" "),i("tr",[i("th",[t._v("uv")]),t._v(" "),i("td",[t._v(t._s(t.uv))])])])])])]):t._e()])])};o._withStripped=!0;var c={render:o,staticRenderFns:[]},l=c;var r=!1;var v=i("VU/8")(n,l,!1,function(t){r||i("MVe5")},null,null);v.options.__file="src/apps/vote/list/statistics.vue";s.default=v.exports},MVe5:function(t,s,i){var e=i("fYWF");"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);i("rjj0")("d1822f5e",e,!1,{})},fYWF:function(t,s,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.article-statistics {\n  height: 100%;\n  overflow: auto;\n}\n.article-statistics .article-statistics-content {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 20px 0;\n  /*th,td {text-align: center;}*/\n}\n",""])}});