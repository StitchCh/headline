webpackJsonp([39],{AThL:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"index",data:function(){return{setShow:!1,addShow:!1,zqlist:["一次","每天","间隔分钟","不限"],setdata:{cycleType:0,cycleTime:0,rewardNum:0,point:0,id:null},list:[]}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;this.$http.post("/cri-cms-platform//creditRule/page.monitor").then(function(e){t.list=e.pages,t.list.forEach(function(t){t.status=Number(t.status)})})},openSet:function(t){this.setShow=!0,this.setdata={cycleType:t.cycleType,cycleTime:t.cycleTime,rewardNum:t.rewardNum,point:t.point,id:t.id}},statusChange:function(t){var e=this;this.$http.post("/cri-cms-platform/creditRule/toggle.monitor",{id:t.id}).then(function(t){e.getList()})},changeList:function(){var t=this;this.$http.post("/cri-cms-platform/creditRule/update.monitor",this.setdata).then(function(e){t.getList(),t.setShow=!1})}}},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex-item flex-col"},[n("div",{staticClass:"flex-item scroll-y",staticStyle:{background:"#eee"}},[n("div",{staticClass:"relative article-content c-6",staticStyle:{"max-width":"1200px"}},[n("div",{staticClass:"setting-card f-14"},[n("table",[t._m(0),t._v(" "),n("tbody",t._l(t.list,function(e){return n("tr",{on:{click:function(n){t.openSet(e)}}},[n("td",[t._v(t._s(e.name))]),t._v(" "),n("td",[t._v(t._s(t.zqlist[e.cycleType]))]),t._v(" "),n("td",[t._v(t._s(e.cycleTime))]),t._v(" "),n("td",[t._v(t._s(e.rewardNum))]),t._v(" "),n("td",[t._v(t._s(e.point))]),t._v(" "),n("td",{staticStyle:{"text-align":"right"},on:{click:function(t){t.stopPropagation()}}},[n("switcher",{on:{change:function(n){t.statusChange(e)}},model:{value:e.status,callback:function(n){t.$set(e,"status",n)},expression:"item.status"}})],1)])}))])]),t._v(" "),t.setShow?n("div",{staticClass:"set_bigbox"},[n("div",{staticClass:"set_box"},[n("ul",[n("li",{staticClass:"set_list"},[n("span",[t._v("周期")]),t._v(" "),n("div",{staticClass:"relative",staticStyle:{width:"100px","text-align":"right"}},[n("div",{staticClass:"a",on:{click:function(e){t.addShow=!0}}},[t._v("\n                  "+t._s(t.zqlist[t.setdata.cycleType])+"\n                ")]),t._v(" "),t.addShow?n("bubble",{on:{close:function(e){t.addShow=!1}}},[n("ul",{staticClass:"f-14 c-5 add-select",staticStyle:{padding:"4px 10px",width:"100px",left:"0","box-sizing":"border-box"}},t._l(t.zqlist,function(e,a){return n("li",{staticClass:"a flex-v-center",staticStyle:{"line-height":"36px"},on:{click:function(e){t.setdata.cycleType=a,t.addShow=!1}}},[t._v("\n                      "+t._s(e)+"\n                    ")])}))]):t._e()],1)]),t._v(" "),2==t.setdata.cycleType?n("li",{staticClass:"set_list"},[n("span",[t._v("间隔分钟数")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setdata.cycleTime,expression:"setdata.cycleTime"}],attrs:{placeholder:"间隔分钟数",type:"number"},domProps:{value:t.setdata.cycleTime},on:{input:function(e){e.target.composing||t.$set(t.setdata,"cycleTime",e.target.value)}}})]):t._e(),t._v(" "),n("li",{staticClass:"set_list"},[n("span",[t._v("最多奖励次数")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setdata.rewardNum,expression:"setdata.rewardNum"}],attrs:{placeholder:"最多奖励次数",type:"number"},domProps:{value:t.setdata.rewardNum},on:{input:function(e){e.target.composing||t.$set(t.setdata,"rewardNum",e.target.value)}}})]),t._v(" "),n("li",{staticClass:"set_list"},[n("span",[t._v("每次积分")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.setdata.point,expression:"setdata.point"}],attrs:{placeholder:"每次积分",type:"number"},domProps:{value:t.setdata.point},on:{input:function(e){e.target.composing||t.$set(t.setdata,"point",e.target.value)}}})])]),t._v(" "),n("div",{staticStyle:{"text-align":"right","padding-top":"20px"}},[n("btn",{attrs:{flat:""},on:{click:function(e){t.setShow=!1}}},[t._v("取消")]),t._v(" "),n("btn",{on:{click:t.changeList}},[t._v("确定")])],1)])]):t._e()])])])};i._withStripped=!0;var s={render:i,staticRenderFns:[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("thead",[n("th",[t._v("积分名称")]),t._v(" "),n("th",[t._v("周期")]),t._v(" "),n("th",[t._v("时间间隔")]),t._v(" "),n("th",[t._v("最多奖励次数")]),t._v(" "),n("th",[t._v("每次积分")]),t._v(" "),n("th",[t._v("开启状态")])])}]},d=s;var o=!1;var c=n("VU/8")(a,d,!1,function(t){o||n("XI1S")},"data-v-ed4ea51e",null);c.options.__file="src/apps/shop/credit/index.vue";e.default=c.exports},Tfs5:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"\n.setting-card td[data-v-ed4ea51e]{\n  padding-top: 10px;\n  padding-bottom: 10px;\n}\ninput[data-v-ed4ea51e]{\n  border: 0;\n  width: 100px !important;\n  height: 20px !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  text-align: right;\n}\n.set_list[data-v-ed4ea51e]{\n  padding: 10px;\n  border-bottom: 1px solid #ddd;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.set_box[data-v-ed4ea51e]{\n  width: 600px;\n  background: #fff;\n  padding: 30px 20px 20px;\n  border-radius: 10px;\n  -webkit-box-shadow: 0px 0px 15px rgba(0,0,0,0.3);\n          box-shadow: 0px 0px 15px rgba(0,0,0,0.3);\n}\n.set_bigbox[data-v-ed4ea51e]{\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0,0,0,0.5);\n  z-index: 100;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\ninput[data-v-ed4ea51e]{\n  height: 37px;\n  margin: 5px 0;\n  width: 80%;\n  padding: 0 10px;\n}\n.article-content[data-v-ed4ea51e]{\n  margin: 20px auto 0;\n  max-width: 1000px;\n  background: #fff;\n  padding: 20px;\n  border-radius: 10px;\n}\n.product_top[data-v-ed4ea51e]{\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  margin-bottom: 30px;\n}\n.a[data-v-ed4ea51e]:hover{\n  color: #318fff;\n}\n.setting-card[data-v-ed4ea51e] {max-width: 1440px;margin: 20px auto;border-radius: 10px;padding: 20px;background: #fff;\n}\nth[data-v-ed4ea51e],td[data-v-ed4ea51e] {padding: 5px 10px;\n}\ntr[data-v-ed4ea51e] {border-top: 1px solid #e1e1e1;cursor: pointer;\n}\ntr[data-v-ed4ea51e]:hover {background: rgba(0, 0, 0, .05);\n}\n",""])},XI1S:function(t,e,n){var a=n("Tfs5");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("4969c12a",a,!1,{})}});