"use strict";(self["webpackChunkheimatoutiao"]=self["webpackChunkheimatoutiao"]||[]).push([[365],{4365:function(t,s,a){a.r(s),a.d(s,{default:function(){return c}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"user"},[s("div",{staticClass:"header"},[s("van-image",{attrs:{round:"",fit:"cover",width:"100",height:"100",src:t.userInfo.photo}}),s("div",{staticClass:"text"},[s("div",{staticClass:"mobile"},[t._v(t._s(t.userInfo.mobile))]),s("span",{staticClass:"birth"},[t._v(t._s(t.userInfo.birthday))])])],1),s("van-row",{staticClass:"navbar",attrs:{type:"flex",justify:"center"}},[s("van-col",{attrs:{span:"8"}},[s("van-icon",{attrs:{name:"newspaper-o",size:"25px",color:"#3296fa"}}),s("span",[t._v("我的作品")])],1),s("van-col",{attrs:{span:"8"}},[s("van-icon",{attrs:{name:"star-o",size:"25px",color:"red"}}),s("span",[t._v("我的收藏")])],1),s("van-col",{attrs:{span:"8"}},[s("van-icon",{attrs:{name:"clock-o",size:"25px",color:"orange"}}),s("span",[t._v("历史记录")])],1)],1),s("van-cell-group",[s("van-cell",{attrs:{title:"编辑资料",icon:"edit","is-link":"",to:"/user/edit"}}),s("van-cell",{attrs:{to:"/user/chatRobot",title:"小智同学",icon:"chat-o","is-link":""}}),s("van-cell",{attrs:{title:"系统设置",icon:"setting-o","is-link":""}}),s("van-cell",{attrs:{title:"退出登录",icon:"info-o","is-link":""},on:{click:t.logout}})],1)],1)},o=[],n={data(){return{}},async created(){this.$store.dispatch("setUserInfo")},computed:{userInfo(){return this.$store.state.userInfo}},methods:{logout(){this.$store.commit("logout"),this.$toast.success("退出成功"),this.$router.push("/login")}}},i=n,r=a(1001),l=(0,r.Z)(i,e,o,!1,null,null,null),c=l.exports}}]);