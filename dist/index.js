import{openBlock as e,createElementBlock as t,normalizeStyle as n,createElementVNode as o,Fragment as s,renderList as i,normalizeClass as l,renderSlot as a,toDisplayString as r,createCommentVNode as d,withDirectives as h,vShow as c}from"vue";function u(e){const t=window.getSelection();t&&(t.removeAllRanges(),t.addRange(e))}function f(){const e=window.getSelection();if(e&&e.rangeCount>0)return e.getRangeAt(0)}function p(e,t){return t.map((t=>({at:t,index:e.lastIndexOf(t)}))).reduce(((e,t)=>e.index>t.index?e:t))}function m(){const e=f();if(e){const t=e.cloneRange();return t.collapse(!0),t.setStart(t.endContainer,0),t}}const w={class:"atwho-inner"},g={class:"atwho-view"},y={class:"atwho-ul"},v=["data-index"],x=["textContent"],C={ref:"embeddedItem"};const b={render:function(u,f){return e(),t("div",{ref:"wrap",class:"atwho-wrap",onCompositionstart:f[2]||(f[2]=(...e)=>u.handleCompositionStart&&u.handleCompositionStart(...e)),onCompositionend:f[3]||(f[3]=(...e)=>u.handleCompositionEnd&&u.handleCompositionEnd(...e)),onInput:f[4]||(f[4]=e=>u.handleInput()),onKeydownCapture:f[5]||(f[5]=(...e)=>u.handleKeyDown&&u.handleKeyDown(...e))},[u.atwho?(e(),t("div",{key:0,class:"atwho-panel",style:n(u.style)},[o("div",w,[o("div",g,[o("ul",y,[(e(!0),t(s,null,i(u.atwho.list,((n,s)=>(e(),t("li",{class:l(["atwho-li",u.isCur(s)&&"atwho-cur"]),key:s,ref_for:!0,ref:e=>u.setItemRef(e,s),"data-index":s,onMouseenter:f[0]||(f[0]=(...e)=>u.handleItemHover&&u.handleItemHover(...e)),onClick:f[1]||(f[1]=(...e)=>u.handleItemClick&&u.handleItemClick(...e))},[a(u.$slots,"item",{item:n},(()=>[o("span",{textContent:r(u.itemName(n))},null,8,x)]))],42,v)))),128))])])])],4)):d("v-if",!0),h(o("span",C,[a(u.$slots,"embeddedItem",{current:u.currentItem})],512),[[c,!1]]),a(u.$slots,"default")],544)},__scopeId:"data-v-99e0b7f4",__file:"src/AtTemplate.vue"};var S,I,T,E,N={name:"At",mixins:[b],props:{value:{type:String,default:null},at:{type:String,default:null},ats:{type:Array,default:()=>["@"]},suffix:{type:String,default:" "},loop:{type:Boolean,default:!0},allowSpaces:{type:Boolean,default:!0},tabSelect:{type:Boolean,default:!1},avoidEmail:{type:Boolean,default:!0},showUnique:{type:Boolean,default:!0},hoverSelect:{type:Boolean,default:!0},members:{type:Array,default:()=>[]},nameKey:{type:String,default:""},filterMatch:{type:Function,default:(e,t,n)=>e.toLowerCase().indexOf(t.toLowerCase())>-1},deleteMatch:{type:Function,default:(e,t,n)=>t===e+n},scrollRef:{type:String,default:""}},data(){return{bindsValue:null!=this.value,customsEmbedded:!1,hasComposition:!1,atwho:null,itemRefs:{}}},computed:{atItems(){return this.at?[this.at]:this.ats},currentItem(){return this.atwho?this.atwho.list[this.atwho.cur]:""},style(){if(this.atwho){const{list:e,cur:t,x:n,y:o}=this.atwho;console.log(2);const{wrap:s}=this.$refs;if(s){const e=function(e,t){t=t||window;for(var n={top:e.offsetTop,left:e.offsetLeft},o=e.offsetParent;null!=o&&o!=t;)n.left+=o.offsetLeft,n.top+=o.offsetTop,o=o.offsetParent;return n}(s),t=this.scrollRef?document.querySelector(this.scrollRef).scrollLeft:0,i=this.scrollRef?document.querySelector(this.scrollRef).scrollTop:0;return{left:n+t+window.pageXOffset-e.left+"px",top:o+i+window.pageYOffset-e.top+"px"}}}return null}},watch:{"atwho.cur"(e){null!=e&&this.$nextTick((()=>{this.scrollToCur()}))},members(){this.handleInput(!0)},value(e,t){this.bindsValue&&this.handleValueUpdate(e)}},mounted(){this.$slots.embeddedItem&&(this.customsEmbedded=!0),this.bindsValue&&this.handleValueUpdate(this.value)},methods:{setItemRef(e,t){this.itemRefs[t]||(this.itemRefs[t]=e)},itemName(e){const{nameKey:t}=this;return t?e[t]:e},isCur(e){return e===this.atwho.cur},handleValueUpdate(e){const t=this.$el.querySelector("[contenteditable]");e!==t.innerHTML&&(t.innerHTML=e,this.dispatchInput())},dispatchInput(){let e=this.$el.querySelector("[contenteditable]"),t=new Event("input",{bubbles:!0});e.dispatchEvent(t)},handleItemHover(e){this.hoverSelect&&this.selectByMouse(e)},handleItemClick(e){this.selectByMouse(e),this.insertItem(),this.itemRefs={}},handleDelete(e){const t=m();if(t){if(this.customsEmbedded&&t.endOffset>=1){let n=t.endContainer.childNodes[t.endOffset]||t.endContainer.childNodes[t.endOffset-1];if(!n||n.nodeType===Node.TEXT_NODE&&!/^\s?$/.test(n.data))return;n.nodeType===Node.TEXT_NODE?n.previousSibling&&(n=n.previousSibling):n.previousElementSibling&&(n=n.previousElementSibling);let o,s=[].slice.call(n.childNodes);if(s=[].reverse.call(s),s.unshift(n),[].some.call(s,(e=>{if(e.getAttribute&&null!=e.getAttribute("data-at-embedded"))return o=e,!0})),o){e.preventDefault(),e.stopPropagation();const t=f();t&&(t.setStartBefore(o),t.deleteContents(),u(t),this.handleInput())}return}const{atItems:n,members:o,suffix:s,deleteMatch:i,itemName:l}=this,a=t.toString(),{at:r,index:d}=p(a,n);if(d>-1){const t=a.slice(d+r.length);if(o.some((e=>{const n=l(e);return i(n,t,s)}))){e.preventDefault(),e.stopPropagation();const t=f();t&&(t.setStart(t.endContainer,d),t.deleteContents(),u(t),this.handleInput())}}}},handleKeyDown(e){const{atwho:t}=this;if(t){if(38===e.keyCode||40===e.keyCode)return void(e.metaKey||e.ctrlKey||(e.preventDefault(),e.stopPropagation(),this.selectByKeyboard(e)));if(13===e.keyCode||this.tabSelect&&9===e.keyCode)return this.insertItem(),e.preventDefault(),e.stopPropagation(),void(this.itemRefs={});if(27===e.keyCode)return this.closePanel(),void(this.itemRefs={})}(e.keyCode>=48&&e.keyCode<=90||8===e.keyCode)&&setTimeout((()=>{this.handleInput()}),50),8===e.keyCode&&(this.handleDelete(e),this.itemRefs={})},handleCompositionStart(){this.hasComposition=!0},handleCompositionEnd(){this.hasComposition=!1,this.handleInput()},handleInput(e){if(this.hasComposition)return;const t=this.$el.querySelector("[contenteditable]");this.$emit("input",t.innerHTML);const n=m();if(n){const{atItems:t,avoidEmail:o,allowSpaces:s,showUnique:i}=this;let l=!0;const a=n.toString(),{at:r,index:d}=p(a,t);d<0&&(l=!1);const h=a[d-1],c=a.slice(d+r.length,a.length);if(o&&/^[a-z0-9]$/i.test(h)&&(l=!1),!s&&/\s/.test(c)&&(l=!1),/^\s/.test(c)&&(l=!1),l){const{members:t,filterMatch:o,itemName:s}=this;!e&&c&&this.$emit("at",c);const a=t.filter((e=>{const t=s(e);return o(t,c,r)}));if(l=!1,a.length&&(l=!0,!i)){let e=a[0];c===s(e)&&(l=!1)}l?this.openPanel(a,n,d,r):this.closePanel()}else this.closePanel()}},closePanel(){this.atwho&&(this.atwho=null)},openPanel(e,t,n,o){const s=()=>{const s=t.cloneRange();s.setStart(s.endContainer,n+o.length);const i=s.getClientRects()[0];this.atwho={range:t,offset:n,list:e,x:i.left,y:i.top-4,cur:0}};this.atwho?s():setTimeout(s,10)},scrollToCur:function(){const e=this.itemRefs[this.atwho.cur];!function(e,t){if(e.scrollIntoViewIfNeeded)e.scrollIntoViewIfNeeded(!1);else{const n=e.offsetTop-t.scrollTop;(n<0||n>t.offsetHeight-e.offsetHeight)&&((t=t||e.parentElement).scrollTop=e.offsetTop)}}(e,e.parentElement.parentElement)},selectByMouse(e){const t=+function(e,t){do{if(t(e))return e}while(e=e&&e.parentNode)}(e.target,(e=>e.getAttribute("data-index"))).getAttribute("data-index");this.atwho={...this.atwho,cur:t}},selectByKeyboard(e){const t=38===e.keyCode?-1:1,{cur:n,list:o}=this.atwho,s=this.loop?(n+t+o.length)%o.length:Math.max(0,Math.min(n+t,o.length-1));this.atwho={...this.atwho,cur:s}},insertText(e,t){t.deleteContents();const n=t.endContainer;if(n.nodeType===Node.TEXT_NODE){const o=t.endOffset;n.data=n.data.slice(0,o)+e+n.data.slice(o),t.setEnd(n,o+e.length)}else{const n=document.createTextNode(e);t.insertNode(n),t.setEndAfter(n)}t.collapse(!1),u(t),this.dispatchInput()},insertHtml(e,t){t.deleteContents();const n=t.endContainer;var o=document.createElement("span");if(o.appendChild(document.createTextNode(" ")),o.appendChild(this.htmlToElement(e)),o.appendChild(document.createTextNode(" ")),o.setAttribute("data-at-embedded",""),o.setAttribute("contenteditable",!1),n.nodeType===Node.TEXT_NODE){const e=t.endOffset;var s=n.splitText(e);n.parentNode.insertBefore(o,s),t.setEndBefore(s)}else{const e=document.createTextNode(suffix);t.insertNode(o),t.setEndAfter(o),t.insertNode(e),t.setEndAfter(e)}t.collapse(!1),u(t)},insertItem(){const{range:e,offset:t,list:n,cur:o}=this.atwho,{suffix:s,atItems:i,itemName:l,customsEmbedded:a}=this,r=e.cloneRange(),d=e.toString(),{at:h,index:c}=p(d,i),f=a?c:c+h.length;r.setStart(r.endContainer,f),u(r),u(r);const m=n[o];if(a){const e=this.$refs.embeddedItem.firstChild.innerHTML;this.insertHtml(e,r)}else{const e=l(m)+s;this.insertText(e,r)}this.$emit("insert",m),this.handleInput()},htmlToElement(e){var t=document.createElement("template");return e=e.trim(),t.innerHTML=e,t.content.firstChild}},__file:"src/At.vue"},$={exports:{}};S=$,I=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing","tabSize","MozTabSize"],T="undefined"!=typeof window,E=T&&null!=window.mozInnerScreenX,S.exports=function(e,t,n){if(!T)throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");var o=n&&n.debug||!1;if(o){var s=document.querySelector("#input-textarea-caret-position-mirror-div");s&&s.parentNode.removeChild(s)}var i=document.createElement("div");i.id="input-textarea-caret-position-mirror-div",document.body.appendChild(i);var l=i.style,a=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,r="INPUT"===e.nodeName;l.whiteSpace="pre-wrap",r||(l.wordWrap="break-word"),l.position="absolute",o||(l.visibility="hidden"),I.forEach((function(e){r&&"lineHeight"===e?l.lineHeight=a.height:l[e]=a[e]})),E?e.scrollHeight>parseInt(a.height)&&(l.overflowY="scroll"):l.overflow="hidden",i.textContent=e.value.substring(0,t),r&&(i.textContent=i.textContent.replace(/\s/g," "));var d=document.createElement("span");d.textContent=e.value.substring(t)||".",i.appendChild(d);var h={top:d.offsetTop+parseInt(a.borderTopWidth),left:d.offsetLeft+parseInt(a.borderLeftWidth),height:parseInt(a.lineHeight)};return o?d.style.backgroundColor="#aaa":document.body.removeChild(i),h};var R=$.exports,k={extends:N,name:"AtTextarea",computed:{style:function(){if(this.atwho){const{list:e,cur:t,x:n,y:o}=this.atwho,{wrap:s}=this.$refs,i=this.$el.querySelector("textarea");if(s){return{left:n+i.offsetLeft-i.scrollLeft+"px",top:o+i.offsetTop-i.scrollTop+"px"}}}return null}},methods:{handleValueUpdate(e){const t=this.$el.querySelector("textarea");e!==t.value&&(t.value=e,this.dispatchInput())},dispatchInput(){let e=this.$el.querySelector("textarea"),t=new Event("input",{bubbles:!0});e.dispatchEvent(t)},handleDelete(e){const t=this.$el.querySelector("textarea"),n=t.value.slice(0,t.selectionEnd);if(n){const{atItems:e,members:o,suffix:s,deleteMatch:i,itemName:l}=this,{at:a,index:r}=p(n,e);if(r>-1){const e=n.slice(r+a.length);o.some((t=>{const n=l(t);return i(n,e,s)}))&&(t.value=t.value.slice(0,r)+t.value.slice(t.selectionEnd-1),t.selectionStart=r+1,t.selectionEnd=r+1,this.handleInput())}}},handleInput(e){if(this.hasComposition)return;const t=this.$el.querySelector("textarea");this.$emit("input",t.value);const n=t.value.slice(0,t.selectionEnd);if(n){const{atItems:t,avoidEmail:o,allowSpaces:s}=this;let i=!0;const{at:l,index:a}=p(n,t);a<0&&(i=!1);const r=n[a-1],d=n.slice(a+l.length,n.length);if(o&&/^[a-z0-9]$/i.test(r)&&(i=!1),!s&&/\s/.test(d)&&(i=!1),/^\s/.test(d)&&(i=!1),i){const{members:t,filterMatch:n,itemName:o}=this;e||this.$emit("at",d);const s=t.filter((e=>{const t=o(e);return n(t,d,l)}));s.length?this.openPanel(s,d,a,l,e):this.closePanel()}else this.closePanel()}else this.closePanel()},openPanel(e,t,n,o){const s=()=>{const s=this.$el.querySelector("textarea"),i=n+o.length,l=R(s,i);this.atwho={chunk:t,offset:n,list:e,atEnd:i,x:l.left,y:l.top-4,cur:0}};this.atwho?s():setTimeout(s,10)},insertText(e,t){const n=t.selectionStart,o=t.selectionEnd;t.value=t.value.slice(0,n)+e+t.value.slice(o);const s=n+e.length;t.selectionStart=s,t.selectionEnd=s,this.dispatchInput()},insertItem(){const{chunk:e,offset:t,list:n,cur:o,atEnd:s}=this.atwho,{suffix:i,atItems:l,itemName:a}=this,r=this.$el.querySelector("textarea"),d=r.value.slice(0,s),{at:h,index:c}=p(d,l),u=c+h.length;r.selectionStart=u,r.focus();const f=n[o],m=a(f)+i;this.insertText(m,r),this.$emit("insert",f),this.handleInput()}},__file:"src/AtTextarea.vue"};const A=N,M=k;export{A as At,M as AtTa};
