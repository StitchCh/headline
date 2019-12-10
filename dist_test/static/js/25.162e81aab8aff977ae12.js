webpackJsonp([25],{"2J5o":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={name:"app-login",components:{LangSwitch:e("p29Z").a},data:function(){return{loginName:"",password:"",keepLogin:!1,loading:!1,error:{show:!1,isPasswordError:!1,message:""}}},mounted:function(){var n=this;this.keydownFun(13,function(){"/login"==n.$route.path&&n.login()}),this.$route.params.setPassword&&this.$toast("密码修改成功，请重新登录")},methods:{login:function(){var n=this;this.loading=!0;var t=this.loginName,e=this.password;this.$http.post("/cri-cms-platform/login.monitor",{loginName:t,password:e}).then(function(t){if(n.$store.commit("setMenu",t.mainMenuList),console.log(t),!t)return n.error.message="您输入的账号或密码不正确。",n.error.show=!0,void(n.loading=!1);n.keepLogin?(sessionStorage.removeItem("token"),sessionStorage.removeItem("siteId"),localStorage.token=t.token):(localStorage.removeItem("token"),localStorage.removeItem("siteId"),sessionStorage.token=t.token),sessionStorage.previewUrl=t.previewUrl,sessionStorage.type="pc","true"===t.isFirstLogin&&n.$store.commit("setFirstLogin",!0),n.$router.replace("/chooseSite")}).catch(function(t){n.showError(t)})},showError:function(n){n.msg&&n.msg.match("密码")&&(this.error.isPasswordError=!0),this.loading=!1,this.error.message=n.msg||n.message||"您输入的账号或密码不正确。",n.message&&n.message.match("timeout")&&(this.error.message="请求超时，请检查您的网络连接。"),this.error.show=!0}}},s=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"abs c-f flex-col app-login"},[e("div",{staticClass:"top f-18 flex-v-center",staticStyle:{padding:"10px 15px"}},[e("span",[n._v("中俄头条")]),n._v(" "),e("span",{staticClass:"flex-item"}),n._v(" "),e("lang-switch")],1),n._v(" "),e("div",{staticClass:"flex-item flex-center"},[e("div",{staticClass:"ctn t-center"},[e("div",{staticClass:"logo"}),n._v(" "),e("div",{staticClass:"f-22",staticStyle:{"font-weight":"300"}},[n._v("登录中俄头条")]),n._v(" "),e("div",{staticClass:"form c-6"},[e("div",{staticClass:"input bg-f flex-v-center",staticStyle:{"border-bottom":"1px solid #ddd","border-radius":"8px 8px 0 0"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:n.loginName,expression:"loginName"}],staticClass:"flex-item f-16",staticStyle:{"border-radius":"8px 8px 0 0"},attrs:{type:"text",placeholder:"用户名"},domProps:{value:n.loginName},on:{input:function(t){t.target.composing||(n.loginName=t.target.value)}}})]),n._v(" "),e("div",{staticClass:"input bg-f flex-v-center relative",staticStyle:{"border-radius":"0 0 8px 8px"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:n.password,expression:"password"}],staticClass:"flex-item f-16",staticStyle:{"margin-right":"10px","border-radius":"0 0 0 8px"},attrs:{type:"password",placeholder:"密码"},domProps:{value:n.password},on:{input:function(t){t.target.composing||(n.password=t.target.value)}}}),n._v(" "),n.loading?e("loading",{staticStyle:{"margin-right":"10px"},attrs:{size:"30"}}):e("div",{staticClass:"login-btn a",class:{disabled:!n.loginName||!n.password},on:{click:n.login}},[e("i",{staticClass:"icon"},[n._v("arrow_forward")])]),n._v(" "),n.error.show?e("bubble",{staticClass:"err-info",on:{close:function(t){n.error.show=n.error.isPasswordError=!1}}},[e("div",{staticClass:"b f-14 flex-center"},[e("div",{staticClass:"flex-item"},[e("div",[n._v(n._s(n.error.message))])])])]):n._e()],1)]),n._v(" "),e("div",{staticClass:"line"})])]),n._v(" "),e("div",{staticClass:"bottom t-right f-12",staticStyle:{padding:"10px",opacity:"0.9"}},[n._v("Copyright © 2018 XXXXX Inc.")])])};s._withStripped=!0;var a={render:s,staticRenderFns:[]},o=a;var r=!1;var l=e("VU/8")(i,o,!1,function(n){r||e("7Qxv")},null,null);l.options.__file="src/apps/login/index.vue";t.default=l.exports},"7Qxv":function(n,t,e){var i=e("ezkm");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("57cea6e3",i,!1,{})},JOpP:function(n,t,e){var i=e("VNsr");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);e("rjj0")("4f30056e",i,!1,{})},VNsr:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.lang-switch {\n  line-height: 1em;\n}\n.lang-switch .icon {\n  margin-right: 8px;\n}\n.lang-switch .lan-ico {\n  margin-right: 10px;\n}\n.lang-switch ul {\n  padding: 10px 0;\n}\n.lang-switch li {\n  padding: 6px 12px;\n  white-space: nowrap;\n}\n.lang-switch li:hover {\n  background: #eee;\n}\n",""])},ezkm:function(n,t,e){var i=e("kxFB");(n.exports=e("FZ+f")(!1)).push([n.i,"\n.app-login .ctn {\n  padding-bottom: 120px;\n}\n.app-login .logo {\n  display: inline-block;\n  width: 100px;\n  height: 100px;\n  background: url("+i(e("tsTk"))+") center / cover;\n  border-radius: 20px;\n  margin-bottom: 10px;\n}\n.app-login .form {\n  border-radius: 10px;\n  width: 320px;\n  margin: 30px 0 20px 0;\n}\n.app-login .form input {\n  margin: 0;\n  padding: 0;\n  border: none;\n  height: 46px;\n  padding: 0 15px;\n  background: transparent;\n}\n.app-login .login-btn {\n  border: 1px solid #ddd;\n  padding: 1px;\n  margin-right: 10px;\n  border-radius: 50%;\n}\n.app-login .login-btn.disabled {\n  opacity: 0.4;\n  pointer-events: none;\n}\n.app-login a.a:hover {\n  text-decoration: underline;\n}\n.app-login .err-info {\n  white-space: nowrap;\n}\n.app-login .err-info button {\n  color: #7d5634;\n}\n.app-login .err-info .bubble-arrow,\n.app-login .err-info .bubble-ctn {\n  background: #FAE9A3;\n}\n.app-login .err-info .bubble-ctn {\n  padding: 10px 10px 10px 15px;\n  color: #7d5634;\n}\n.app-login .line {\n  height: 1px;\n  background: -webkit-gradient(linear, left top, right top, from(rgba(255, 255, 255, 0)), color-stop(rgba(255, 255, 255, 0.8)), to(rgba(255, 255, 255, 0)));\n  background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));\n  margin: 15px 0;\n}\n.app-login .check-box i {\n  border-color: #ddd;\n}\n",""])},kxFB:function(n,t){n.exports=function(n){return"string"!=typeof n?n:(/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),/["'() \t\n]/.test(n)?'"'+n.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':n)}},p29Z:function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"lang-switch relative f-14 a"},[e("div",{staticClass:"flex-v-center",on:{click:function(t){n.bubbleShow=!0}}},[e("i",{staticClass:"icon f-18"},[n._v("language")]),n._v(" "),e("span",[n._v("切换语言")])]),n._v(" "),n.bubbleShow?e("bubble",{staticClass:"c-6",attrs:{pos:"bottom",align:"end"},on:{close:function(t){n.bubbleShow=!1}}},[e("ul",[e("li",{staticClass:"flex-v-center"},[e("span",{staticClass:"f-18 lan-ico"},[n._v("🇨🇳")]),n._v(" "),e("span",{staticClass:"flex-item"},[n._v("中文")])]),n._v(" "),e("li",{staticClass:"flex-v-center"},[e("span",{staticClass:"f-18 lan-ico"},[n._v("🇷🇺")]),n._v(" "),e("span",{staticClass:"flex-item"},[n._v("Русский")])]),n._v(" "),e("li",{staticClass:"flex-v-center"},[e("span",{staticClass:"f-18 lan-ico"},[n._v("🇬🇧")]),n._v(" "),e("span",{staticClass:"flex-item"},[n._v("English")])])])]):n._e()],1)};i._withStripped=!0;var s={render:i,staticRenderFns:[]},a=s;var o=!1;var r=e("VU/8")({name:"lang-switch",data:function(){return{bubbleShow:!1}}},a,!1,function(n){o||e("JOpP")},null,null);r.options.__file="src/components/langSwitch.vue";t.a=r.exports}});