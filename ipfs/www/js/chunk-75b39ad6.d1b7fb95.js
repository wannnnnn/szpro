(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75b39ad6"],{"32f8":function(e,t,a){var i=a("862d"),l=a("3eba");l.extendSeriesModel({type:"series.liquidFill",visualColorAccessPath:"textStyle.normal.color",optionUpdated:function(){var e=this.option;e.gridSize=Math.max(Math.floor(e.gridSize),4)},getInitialData:function(e,t){var a=i(["value"],e.data),o=new l.List(a,this);return o.initData(e.data),o},defaultOption:{color:["#294D99","#156ACF","#1598ED","#45BDFF"],center:["50%","50%"],radius:"50%",amplitude:"8%",waveLength:"80%",phase:"auto",period:"auto",direction:"right",shape:"circle",waveAnimation:!0,animationEasing:"linear",animationEasingUpdate:"linear",animationDuration:2e3,animationDurationUpdate:1e3,outline:{show:!0,borderDistance:8,itemStyle:{color:"none",borderColor:"#294D99",borderWidth:8,shadowBlur:20,shadowColor:"rgba(0, 0, 0, 0.25)"}},backgroundStyle:{color:"#E3F7FF"},itemStyle:{opacity:.95,shadowBlur:50,shadowColor:"rgba(0, 0, 0, 0.4)"},label:{show:!0,color:"#294D99",insideColor:"#fff",fontSize:50,fontWeight:"bold",align:"center",baseline:"middle",position:"inside"},emphasis:{itemStyle:{opacity:.8}}}})},"3d07":function(e,t,a){},"66fa":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"awardPool"},[a("div",{staticClass:"wrap"},[a("div",{staticClass:"banner"},[a("div",{staticClass:"contentTxt"},[a("div",{staticClass:"awardPool-title"}),a("div",{staticClass:"buy",on:{click:function(t){return e.pushBuy()}}},[e._v("立即"),a("br"),e._v("抢购")]),a("div",{staticClass:"buyProgressBox"},[a("div",{staticClass:"buyProgressTop"},[a("div",{staticClass:"textLeft"},[a("span",{staticStyle:{"font-size":"0.24rem"}},[e._v("已售")]),e._v(e._s(e.sell_num)+"\n            ")]),a("div",{staticClass:"textRig"},[e._v(e._s(e.sell_num)+"/1000")])]),a("div",{staticClass:"buyProgressBot"},[a("div",{staticClass:"progress",style:{width:e.getProgressVal()+"%"}})])]),a("p",[e._v("\n          限1000台存储服务器，1000台存储服务器销售完毕后，统计达标用户数量，达标用户将享受不同奖励池的永久奖励。\n        ")])])])]),a("div",{staticClass:"luboView"},[a("swiper",{attrs:{options:e.swiperOption}},e._l(e.level_list,(function(t,i){return a("swiper-slide",{key:i},[a("div",{staticClass:"swipePageView firstPage",class:e.getPoolPageStyle(t.level)},[a("div",{staticClass:"titile"},[a("div",{staticClass:"img",class:e.getLevelImg(t.level)}),e._v("\n                          V"+e._s(t.level)+" 奖励池\n                        ")]),1==t.level?a("div",{staticClass:"poolPercent",class:e.getLevelPoolPercent(t.level),attrs:{id:"liquidFill"}}):2==t.level?a("div",{staticClass:"poolPercent",class:e.getLevelPoolPercent(t.level),attrs:{id:"level"}}):3==t.level?a("div",{staticClass:"poolPercent",class:e.getLevelPoolPercent(t.level),attrs:{id:"liquidFill3"}}):e._e(),a("div",{staticClass:"group"},[a("div",{staticClass:"item"},[a("div",{staticClass:"count"},[e._v(e._s(t.today_fil)+" Fil")]),a("div",{staticClass:"text"},[e._v("今日新增")])]),a("div",{staticClass:"item"},[a("div",{staticClass:"count"},[e._v(e._s(t.all_fil)+" Fil")]),a("div",{staticClass:"text"},[e._v("奖池累计")])]),a("div",{staticClass:"item"},[a("div",{staticClass:"count"},[e._v(e._s(t.target_num)+" 人")]),a("div",{staticClass:"text"},[e._v("达标人数")])]),a("div",{staticClass:"item"},[a("div",{staticClass:"count"},[e._v(e._s(e.fil_price.toFixed(2))+" U")]),a("div",{staticClass:"text"},[e._v("Fil当前价")])])]),a("div",{staticClass:"condition"},[a("div",{staticClass:"condition-title"},[e._v("达标条件")]),a("div",{staticClass:"line",class:e.getLevelLine(t.level)}),1==t.level?a("p",[e._v("\n                                自购3台存储服务器，累计推广业绩20台存储"),a("br"),e._v("服务器。\n                              ")]):e._e(),2==t.level?a("p",[e._v("\n                                 自购5台存储服务器，累计推广业绩100台存储"),a("br"),e._v("服务器。\n                              ")]):e._e(),3==t.level?a("p",[e._v("\n                                自购10台存储服务器，累计推广业绩200台存储"),a("br"),e._v("服务器。\n                              ")]):e._e()])])])})),1)],1),a("AppTabBar",{attrs:{tabIndex:2},on:{tabAction:e.tabAction}})],1)},l=[],o=a("0c6d"),r=a("6739"),n=(a("d015"),{name:"awardPool",data:function(){return{exist_buy:null,swiperOption:{direction:"horizontal",centeredSlides:!0,initialSlide:1},sell_num:0,level_list:[],level1_pool_rate:0,level2_pool_rate:0,level3_pool_rate:0,fil_price:0}},components:{AppTabBar:r["a"]},mounted:function(){this.getDataAPI()},methods:{tabAction:function(e){0==e?this.$router.push("/home"):1==e?this.$router.push("/mall"):2==e||this.$router.push("/my")},pushBuy:function(){this.$router.push("/mall")},getDataAPI:function(){var e=this;o["a"].get("/net_data/reward_pool_info").then((function(t){console.log("res",t);var a=t.data.Data;if(0==t.data.Code){e.fil_price=a.fil_price,e.sell_num=a.sell_num,e.level_list=a.level_list;for(var i=a.level_list,l=0;l<i.length;l++){var o=i[l];0==l?(e.level1_pool_rate=o.pool_rate/100,setTimeout((function(){e.liquidFill()}),1e3)):1==l?(e.level2_pool_rate=o.pool_rate/100,setTimeout((function(){e.liquidFills()}),1e3)):(e.level3_pool_rate=o.pool_rate/100,setTimeout((function(){e.liquidFillss()}),1e3))}}}))},getPoolPageStyle:function(e){var t="";return e&&(t=1==e?"firstPage":2==e?"secondPage":"threePage"),t},getLevelImg:function(e){var t="";return e&&(t=1==e?"level1Img":2==e?"level2Img":"level3Img"),t},getLevelLine:function(e){var t="";return e&&(t=1==e?"level1Line":2==e?"level2Line":"level3Line"),t},getLevelPoolPercent:function(e){var t="";return e&&(t=1==e?"level1PoolPercent":2==e?"level2PoolPercent":"level3PoolPercent"),t},getProgressVal:function(){var e=this.sell_num/1e3*100;return e},liquidFill:function(){var e=1.01*this.level1_pool_rate,t=1.05*this.level1_pool_rate,a=1.1*this.level1_pool_rate,i=this.$echarts.init(document.getElementById("liquidFill"));i.setOption({series:[{type:"liquidFill",name:" ",data:[{value:this.level1_pool_rate},e,t,a],label:{normal:{formatter:function(e){return"矿池:"+100*e.value+"%"},textStyle:{fontSize:15,color:"#404C5A",fontWeight:500}}},outline:{borderDistance:0,itemStyle:{borderWidth:0}},backgroundStyle:{color:"#F4F6FF",itemStyle:{shadowBlur:100,shadowColor:"#f60",opacity:1}},itemStyle:{opacity:.5,shadowBlur:10,shadowColor:"#4B99E0"},emphasis:{itemStyle:{opacity:1}},color:["#4B99E0","#4B99E0","#4B99E0"],shape:"circle",center:["50%","50%"],radius:"80%",amplitude:3,waveLength:"50%",phase:0,period:function(e,t){return 2e3*t},direction:"left",waveAnimation:!0,animationEasing:"linear",animationEasingUpdate:"quarticInOut",animationDuration:3e3,animationDurationUpdate:300}]})},liquidFills:function(){var e=1.01*this.level2_pool_rate,t=1.05*this.level2_pool_rate,a=1.1*this.level2_pool_rate,i=this.$echarts.init(document.getElementById("level"));i.setOption({series:[{type:"liquidFill",name:" ",data:[{value:this.level2_pool_rate},e,t,a],label:{normal:{formatter:function(e){return"矿池:"+100*e.value+"%"},textStyle:{fontSize:15,color:"#404C5A",fontWeight:500}}},outline:{borderDistance:0,itemStyle:{borderWidth:0}},backgroundStyle:{color:"#FFFAF3",itemStyle:{shadowBlur:100,shadowColor:"#f60",opacity:1}},itemStyle:{opacity:.5,shadowBlur:10,shadowColor:"#F5CA84"},emphasis:{itemStyle:{opacity:1}},color:["#F5CA84","#F5CA84","#F5CA84"],shape:"circle",center:["50%","50%"],radius:"80%",amplitude:3,waveLength:"50%",phase:0,period:function(e,t){return 2e3*t},direction:"left",waveAnimation:!0,animationEasing:"linear",animationEasingUpdate:"quarticInOut",animationDuration:3e3,animationDurationUpdate:300}]})},liquidFillss:function(){var e=1.01*this.level3_pool_rate,t=1.05*this.level3_pool_rate,a=1.1*this.level3_pool_rate,i=this.$echarts.init(document.getElementById("liquidFill3"));i.setOption({series:[{type:"liquidFill",name:" ",data:[{value:this.level3_pool_rate},e,t,a],label:{normal:{formatter:function(e){return"矿池:"+100*e.value+"%"},textStyle:{fontSize:15,color:"#404C5A",fontWeight:500}}},outline:{borderDistance:0,itemStyle:{borderWidth:0}},backgroundStyle:{color:"#FBF1FF",itemStyle:{shadowBlur:100,shadowColor:"#f60",opacity:1}},itemStyle:{opacity:.5,shadowBlur:10,shadowColor:"#D599E1"},emphasis:{itemStyle:{opacity:1}},color:["#D599E1","#D599E1","#D599E1"],shape:"circle",center:["50%","50%"],radius:"80%",amplitude:3,waveLength:"50%",phase:0,period:function(e,t){return 2e3*t},direction:"left",waveAnimation:!0,animationEasing:"linear",animationEasingUpdate:"quarticInOut",animationDuration:3e3,animationDurationUpdate:300}]})},getTest:function(){}}}),s=n,c=(a("e1c3"),a("2877")),u=Object(c["a"])(s,i,l,!1,null,"4e0e98e9",null);t["default"]=u.exports},a98e:function(e,t,a){var i=a("3eba");a("32f8"),a("cb7d"),i.registerVisual(i.util.curry(a("98e7"),"liquidFill"))},cb7d:function(e,t,a){var i=a("3eba"),l=i.number,o=a("a15a"),r=l.parsePercent,n=a("ccf7");i.extendChartView({type:"liquidFill",render:function(e,t,a){var l=this.group;l.removeAll();var s=e.getData(),c=s.getItemModel(0),u=c.get("center"),d=c.get("radius"),v=a.getWidth(),h=a.getHeight(),p=Math.min(v,h),g=0,m=0,f=e.get("outline.show");f&&(g=e.get("outline.borderDistance"),m=r(e.get("outline.itemStyle.borderWidth"),p));var y,_,w,P=r(u[0],v),C=r(u[1],h),b=!1,S=e.get("shape");if("container"===S?(b=!0,y=[v/2,h/2],_=[y[0]-m/2,y[1]-m/2],w=[r(g,v),r(g,h)],d=[Math.max(_[0]-w[0],0),Math.max(_[1]-w[1],0)]):(y=r(d,p)/2,_=y-m/2,w=r(g,p),d=Math.max(_-w,0)),f){var I=E();I.style.lineWidth=m,l.add(E())}var F=b?0:P-d,x=b?0:C-d,L=null;l.add(A());var M=this._data,D=[];function B(e,t){if(S){if(0===S.indexOf("path://")){var a=i.graphic.makePath(S.slice(7),{}),l=a.getBoundingRect(),r=l.width,n=l.height;r>n?(n*=2*e/r,r=2*e):(r*=2*e/n,n=2*e);var s=t?0:P-r/2,c=t?0:C-n/2;return a=i.graphic.makePath(S.slice(7),{},new i.graphic.BoundingRect(s,c,r,n)),t&&(a.position=[-r/2,-n/2]),a}if(b){var u=t?-e[0]:P-e[0],d=t?-e[1]:C-e[1];return o.createSymbol("rect",u,d,2*e[0],2*e[1])}u=t?-e:P-e,d=t?-e:C-e;return"pin"===S?d+=e:"arrow"===S&&(d-=e),o.createSymbol(S,u,d,2*e,2*e)}return new i.graphic.Circle({shape:{cx:t?0:P,cy:t?0:C,r:e}})}function E(){var t=B(y);return t.style.fill=null,t.setStyle(e.getModel("outline.itemStyle").getItemStyle()),t}function A(){var t=B(d);t.setStyle(e.getModel("backgroundStyle").getItemStyle()),t.style.fill=null,t.z2=5;var a=B(d);a.setStyle(e.getModel("backgroundStyle").getItemStyle()),a.style.stroke=null;var l=new i.graphic.Group;return l.add(t),l.add(a),l}function q(t,a,l){var o=b?d[0]:d,c=b?h/2:d,u=s.getItemModel(t),v=u.getModel("itemStyle"),p=u.get("phase"),g=r(u.get("amplitude"),2*c),m=r(u.get("waveLength"),2*o),f=s.get("value",t),y=c-f*c*2;p=l?l.shape.phase:"auto"===p?t*Math.PI/4:p;var _=v.getItemStyle();if(!_.fill){var w=e.get("color"),S=t%w.length;_.fill=w[S]}var I=2*o,F=new n({shape:{waveLength:m,radius:o,radiusY:c,cx:I,cy:0,waterLevel:y,amplitude:g,phase:p,inverse:a},style:_,position:[P,C]});F.shape._waterLevel=y;var x=u.getModel("emphasis.itemStyle").getItemStyle();x.lineWidth=0,i.graphic.setHoverStyle(F,x);var L=B(d,!0);return L.setStyle({fill:"white"}),F.setClipPath(L),F}function T(e,t,a){var i=s.getItemModel(e),l=i.get("period"),o=i.get("direction"),r=s.get("value",e),n=i.get("phase");n=a?a.shape.phase:"auto"===n?e*Math.PI/4:n;var c=function(t){var a=s.count();return 0===a?t:t*(.2+(a-e)/a*.8)},u=0;u="auto"===l?c(5e3):"function"===typeof l?l(r,e):l;var d=0;"right"===o||null==o?d=Math.PI:"left"===o?d=-Math.PI:"none"===o?d=0:console.error("Illegal direction value for liquid fill."),"none"!==o&&i.get("waveAnimation")&&t.animate("shape",!0).when(0,{phase:n}).when(u/2,{phase:d+n}).when(u,{phase:2*d+n}).during((function(){L&&L.dirty(!0)})).start()}function k(t){var a=c.getModel("label");function l(){var t=e.getFormattedLabel(0,"normal"),a=100*s.get("value",0),i=s.getName(0)||e.name;return isNaN(a)||(i=a.toFixed(0)+"%"),null==t?i:t}var o={z2:10,shape:{x:F,y:x,width:2*(b?d[0]:d),height:2*(b?d[1]:d)},style:{fill:"transparent",text:l(),textAlign:a.get("align"),textVerticalAlign:a.get("baseline")},silent:!0},r=new i.graphic.Rect(o),n=a.get("color");i.graphic.setText(r.style,a,n);var u=new i.graphic.Rect(o),v=a.get("insideColor");i.graphic.setText(u.style,a,v),u.style.textFill=v;var h=new i.graphic.Group;h.add(r),h.add(u);var p=B(d,!0);return L=new i.graphic.CompoundPath({shape:{paths:t},position:[P,C]}),L.setClipPath(p),u.setClipPath(L),h}s.diff(M).add((function(t){var a=q(t,!1),o=a.shape.waterLevel;a.shape.waterLevel=b?h/2:d,i.graphic.initProps(a,{shape:{waterLevel:o}},e),a.z2=2,T(t,a,null),l.add(a),s.setItemGraphicEl(t,a),D.push(a)})).update((function(t,a){for(var o=M.getItemGraphicEl(a),r=q(t,!1,o),n={},c=["amplitude","cx","cy","phase","radius","radiusY","waterLevel","waveLength"],u=0;u<c.length;++u){var d=c[u];r.shape.hasOwnProperty(d)&&(n[d]=r.shape[d])}var v={},p=["fill","opacity","shadowBlur","shadowColor"];for(u=0;u<p.length;++u){d=p[u];r.style.hasOwnProperty(d)&&(v[d]=r.style[d])}b&&(n.radiusY=h/2),i.graphic.updateProps(o,{shape:n},e),o.useStyle(v),o.position=r.position,o.setClipPath(r.clipPath),o.shape.inverse=r.inverse,T(t,o,o),l.add(o),s.setItemGraphicEl(t,o),D.push(o)})).remove((function(e){var t=M.getItemGraphicEl(e);l.remove(t)})).execute(),c.get("label.show")&&l.add(k(D)),this._data=s},dispose:function(){}})},ccf7:function(e,t,a){var i=a("3eba");function l(e,t,a,i){return 0===t?[[e+.5*a/Math.PI/2,i/2],[e+.5*a/Math.PI,i],[e+a/4,i]]:1===t?[[e+.5*a/Math.PI/2*(Math.PI-2),i],[e+.5*a/Math.PI/2*(Math.PI-1),i/2],[e+a/4,0]]:2===t?[[e+.5*a/Math.PI/2,-i/2],[e+.5*a/Math.PI,-i],[e+a/4,-i]]:[[e+.5*a/Math.PI/2*(Math.PI-2),-i],[e+.5*a/Math.PI/2*(Math.PI-1),-i/2],[e+a/4,0]]}e.exports=i.graphic.extendShape({type:"ec-liquid-fill",shape:{waveLength:0,radius:0,radiusY:0,cx:0,cy:0,waterLevel:0,amplitude:0,phase:0,inverse:!1},buildPath:function(e,t){null==t.radiusY&&(t.radiusY=t.radius);var a=Math.max(2*Math.ceil(2*t.radius/t.waveLength*4),8);while(t.phase<2*-Math.PI)t.phase+=2*Math.PI;while(t.phase>0)t.phase-=2*Math.PI;var i=t.phase/Math.PI/2*t.waveLength,o=t.cx-t.radius+i-2*t.radius;e.moveTo(o,t.waterLevel);for(var r=0,n=0;n<a;++n){var s=n%4,c=l(n*t.waveLength/4,s,t.waveLength,t.amplitude);e.bezierCurveTo(c[0][0]+o,-c[0][1]+t.waterLevel,c[1][0]+o,-c[1][1]+t.waterLevel,c[2][0]+o,-c[2][1]+t.waterLevel),n===a-1&&(r=c[2][0])}t.inverse?(e.lineTo(r+o,t.cy-t.radiusY),e.lineTo(o,t.cy-t.radiusY),e.lineTo(o,t.waterLevel)):(e.lineTo(r+o,t.cy+t.radiusY),e.lineTo(o,t.cy+t.radiusY),e.lineTo(o,t.waterLevel)),e.closePath()}})},d015:function(e,t,a){e.exports=a("a98e")},e1c3:function(e,t,a){"use strict";var i=a("3d07"),l=a.n(i);l.a}}]);
//# sourceMappingURL=chunk-75b39ad6.d1b7fb95.js.map