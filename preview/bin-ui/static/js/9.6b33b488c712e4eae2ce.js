webpackJsonp([9],{"35pZ":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=r("QX6o"),i=Object(s.b)("transform"),a={props:{percent:{type:Number,default:0},allTime:{type:Boolean,default:!1}},created:function(){this.touch={}},methods:{progressTouchStart:function(t){this.touch.initiated=!0,this.touch.startX=t.touches[0].pageX,this.touch.left=this.$refs.progress.offsetWidth},progressTouchMove:function(t){if(this.touch.initiated){var e=this.$refs.progressBar.clientWidth-0,r=t.touches[0].pageX-this.touch.startX,s=Math.min(e,Math.max(0,this.touch.left+r));this._offset(s),this.allTime&&this._triggerPercent()}},progressTouchEnd:function(){this.touch.initiated=!1,this._triggerPercent()},progressClick:function(t){this._offset(t.offsetX);var e=this.$refs.progressBar.getBoundingClientRect(),r=t.pageX-e.left;this._offset(r),this._triggerPercent()},_triggerPercent:function(){var t=this.$refs.progressBar.clientWidth-0,e=this.$refs.progress.clientWidth/t;this.$emit("percentChange",e)},_offset:function(t){this.$refs.progress.style.width=t+"px",this.$refs.progressBtn.style[i]="translate3d("+t+"px,0,0)"}},watch:{percent:function(t){if(t>=0&&!this.touch.initiated){var e=t*(this.$refs.progressBar.clientWidth-0);this._offset(e)}}}},n={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"progressBar",staticClass:"progress-bar",on:{click:t.progressClick}},[r("div",{staticClass:"bar-inner"},[r("div",{ref:"progress",staticClass:"progress"}),t._v(" "),r("div",{ref:"progressBtn",staticClass:"progress-btn-wrapper",on:{click:function(t){t.stopPropagation()},touchstart:function(e){return e.preventDefault(),t.progressTouchStart(e)},touchmove:function(e){return e.preventDefault(),t.progressTouchMove(e)},touchend:function(e){return e.preventDefault(),t.progressTouchEnd(e)}}},[r("div",{staticClass:"progress-btn"})])])])},staticRenderFns:[]};var c=r("VU/8")(a,n,!1,function(t){r("Oc5A")},"data-v-8aa3e8f4",null).exports,o={props:{radius:{type:Number,default:100},percent:{type:Number,default:0}},data:function(){return{dashArray:100*Math.PI}},computed:{dashoffset:function(){return this.dashArray*(1-this.percent)}}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"progress-circle"},[e("svg",{attrs:{width:this.radius,height:this.radius,viewBox:"0 0 100 100",version:"1.1",xmlns:"http://www.w3.org/2000/svg"}},[e("circle",{staticClass:"progress-background",attrs:{r:"50",cx:"50",cy:"50",fill:"transparent"}}),this._v(" "),e("circle",{staticClass:"progress-bar",attrs:{r:"50",cx:"50",cy:"50",fill:"transparent","stroke-dasharray":this.dashArray,"stroke-dashoffset":this.dashoffset}})]),this._v(" "),this._t("default")],2)},staticRenderFns:[]};var u={data:function(){return{barPercent:0}},methods:{back:function(){this.$router.back()},onProgressBarChange:function(t){this.barPercent=t}},components:{ProgressBar:c,ProgressCircle:r("VU/8")(o,h,!1,function(t){r("dcq6")},"data-v-26c3a46a",null).exports},computed:{percentLabel:function(){return 100*this.barPercent|0}}},f={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("transition",{attrs:{name:"slide"}},[r("div",{staticClass:"demo"},[r("div",{staticClass:"title border-bottom-1px"},[r("i",{staticClass:"icon-back",on:{click:function(e){t.back()}}}),t._v("progress\n    ")]),t._v(" "),r("div",{staticClass:"container"},[r("h3",{staticClass:"percent"},[t._v(t._s(t.percentLabel)+"%")]),t._v(" "),r("div",{staticClass:"progress-wrapper"},[r("progress-bar",{attrs:{allTime:!0},on:{percentChange:t.onProgressBarChange}})],1),t._v(" "),r("div",{staticClass:"progress-circle-wrapper"},[r("h3",{staticClass:"percent2"},[t._v(t._s(t.percentLabel)+"%")]),t._v(" "),r("progress-circle",{attrs:{radius:50,percent:t.barPercent}})],1)])])])},staticRenderFns:[]};var p=r("VU/8")(u,f,!1,function(t){r("uvlL")},"data-v-3c6528b3",null);e.default=p.exports},Oc5A:function(t,e){},dcq6:function(t,e){},uvlL:function(t,e){}});