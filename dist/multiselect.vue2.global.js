var VueformMultiselect=function(e){"use strict";function a(e){return-1!==[null,void 0].indexOf(e)}function l(l,t,u){const{object:i,valueProp:r,mode:n}=e.toRefs(l),o=e.getCurrentInstance().proxy,s=u.iv,c=e=>i.value||a(e)?e:Array.isArray(e)?e.map((e=>e[r.value])):e[r.value],v=e=>a(e)?"single"===n.value?{}:[]:e;return{update:(e,a=!0)=>{s.value=v(e);const l=c(e);t.emit("change",l,o),a&&(t.emit("input",l),t.emit("update:modelValue",l))}}}function t(a,l){const{value:t,modelValue:u,mode:i,valueProp:r}=e.toRefs(a),n=e.ref("single"!==i.value?[]:{}),o=u&&void 0!==u.value?u:t,s=e.computed((()=>"single"===i.value?n.value[r.value]:n.value.map((e=>e[r.value])))),c=e.computed((()=>"single"!==i.value?n.value.map((e=>e[r.value])).join(","):n.value[r.value]));return{iv:n,internalValue:n,ev:o,externalValue:o,textValue:c,plainValue:s}}function u(a,l,t){const{regex:u}=e.toRefs(a),i=e.getCurrentInstance().proxy,r=t.isOpen,n=t.open,o=e.ref(null),s=e.ref(null);return e.watch(o,(e=>{!r.value&&e&&n(),l.emit("search-change",e,i)})),{search:o,input:s,clearSearch:()=>{o.value=""},handleSearchInput:e=>{o.value=e.target.value},handleKeypress:e=>{if(u&&u.value){let a=u.value;"string"==typeof a&&(a=new RegExp(a)),e.key.match(a)||e.preventDefault()}},handlePaste:e=>{if(u&&u.value){let a=(e.clipboardData||window.clipboardData).getData("Text"),l=u.value;"string"==typeof l&&(l=new RegExp(l)),a.split("").every((e=>!!e.match(l)))||e.preventDefault()}l.emit("paste",e,i)}}}function i(a,l,t){const{groupSelect:u,mode:i,groups:r,disabledProp:n}=e.toRefs(a),o=e.ref(null),s=e=>{void 0===e||null!==e&&e[n.value]||r.value&&e&&e.group&&("single"===i.value||!u.value)||(o.value=e)};return{pointer:o,setPointer:s,clearPointer:()=>{s(null)}}}function r(e,a=!0){return a?String(e).toLowerCase().trim():String(e).toLowerCase().normalize("NFD").trim().replace(new RegExp(/æ/g),"ae").replace(new RegExp(/œ/g),"oe").replace(new RegExp(/ø/g),"o").replace(/\p{Diacritic}/gu,"")}function n(l,t,u){const{options:i,mode:n,trackBy:o,limit:s,hideSelected:c,createTag:v,createOption:p,label:d,appendNewTag:f,appendNewOption:g,multipleLabel:m,object:h,loading:b,delay:y,resolveOnLoad:_,minChars:S,filterResults:O,clearOnSearch:L,clearOnSelect:w,valueProp:x,canDeselect:P,max:k,strict:q,closeOnSelect:T,groups:E,reverse:I,infinite:R,groupOptions:C,groupHideEmpty:B,groupSelect:D,onCreate:A,disabledProp:j,searchStart:V}=e.toRefs(l),N=e.getCurrentInstance().proxy,M=u.iv,$=u.ev,F=u.search,H=u.clearSearch,G=u.update,K=u.pointer,W=u.clearPointer,U=u.focus,X=u.deactivate,z=u.close,J=e.ref([]),Q=e.ref([]),Y=e.ref(!1),Z=e.ref(null),ee=e.ref(R.value&&-1===s.value?10:s.value),ae=e.computed((()=>v.value||p.value||!1)),le=e.computed((()=>void 0!==f.value?f.value:void 0===g.value||g.value)),te=e.computed((()=>{if(E.value){let e=Q.value||[],a=[];return e.forEach((e=>{Re(e[C.value]).forEach((l=>{a.push(Object.assign({},l,e[j.value]?{[j.value]:!0}:{}))}))})),a}{let e=Re(Q.value||[]);return J.value.length&&(e=e.concat(J.value)),e}})),ue=e.computed((()=>E.value?Ee((Q.value||[]).map(((e,a)=>{const l=Re(e[C.value]);return{...e,index:a,group:!0,[C.value]:Ie(l,!1).map((a=>Object.assign({},a,e[j.value]?{[j.value]:!0}:{}))),__VISIBLE__:Ie(l).map((a=>Object.assign({},a,e[j.value]?{[j.value]:!0}:{})))}}))):[])),ie=e.computed((()=>{let e=te.value;return I.value&&(e=e.reverse()),ve.value.length&&(e=ve.value.concat(e)),Ie(e)})),re=e.computed((()=>{let e=ie.value;return ee.value>0&&(e=e.slice(0,ee.value)),e})),ne=e.computed((()=>{switch(n.value){case"single":return!a(M.value[x.value]);case"multiple":case"tags":return!a(M.value)&&M.value.length>0}})),oe=e.computed((()=>void 0!==m&&void 0!==m.value?m.value(M.value,N):M.value&&M.value.length>1?`${M.value.length} options selected`:"1 option selected")),se=e.computed((()=>!te.value.length&&!Y.value&&!ve.value.length)),ce=e.computed((()=>te.value.length>0&&0==re.value.length&&(F.value&&E.value||!E.value))),ve=e.computed((()=>!1!==ae.value&&F.value?-1!==qe(F.value)?[]:[{[x.value]:F.value,[d.value]:F.value,[pe.value]:F.value,__CREATE__:!0}]:[])),pe=e.computed((()=>o.value||d.value)),de=e.computed((()=>{switch(n.value){case"single":return null;case"multiple":case"tags":return[]}})),fe=e.computed((()=>b.value||Y.value)),ge=e=>{switch("object"!=typeof e&&(e=ke(e)),n.value){case"single":G(e);break;case"multiple":case"tags":G(M.value.concat(e))}t.emit("select",he(e),e,N)},me=e=>{switch("object"!=typeof e&&(e=ke(e)),n.value){case"single":ye();break;case"tags":case"multiple":G(Array.isArray(e)?M.value.filter((a=>-1===e.map((e=>e[x.value])).indexOf(a[x.value]))):M.value.filter((a=>a[x.value]!=e[x.value])))}t.emit("deselect",he(e),e,N)},he=e=>h.value?e:e[x.value],be=e=>{me(e)},ye=()=>{t.emit("clear",N),G(de.value)},_e=e=>{if(void 0!==e.group)return"single"!==n.value&&(Pe(e[C.value])&&e[C.value].length);switch(n.value){case"single":return!a(M.value)&&M.value[x.value]==e[x.value];case"tags":case"multiple":return!a(M.value)&&-1!==M.value.map((e=>e[x.value])).indexOf(e[x.value])}},Se=e=>!0===e[j.value],Oe=()=>!(void 0===k||-1===k.value||!ne.value&&k.value>0)&&M.value.length>=k.value,Le=e=>{switch(e.__CREATE__&&delete(e={...e}).__CREATE__,n.value){case"single":if(e&&_e(e))return void(P.value?me(e):T.value&&(W(),z()));e&&we(e),w.value&&H(),T.value&&(W(),z()),e&&ge(e);break;case"multiple":if(e&&_e(e))return void me(e);if(Oe())return void t.emit("max",N);e&&(we(e),ge(e)),w.value&&H(),c.value&&W(),T.value&&z();break;case"tags":if(e&&_e(e))return void me(e);if(Oe())return void t.emit("max",N);e&&we(e),w.value&&H(),e&&ge(e),c.value&&W(),T.value&&z()}T.value||U()},we=e=>{void 0===ke(e[x.value])&&ae.value&&(t.emit("tag",e[x.value],N),t.emit("option",e[x.value],N),le.value&&Te(e),H())},xe=e=>void 0===e.find((e=>!_e(e)&&!e[j.value])),Pe=e=>void 0===e.find((e=>!_e(e))),ke=e=>te.value[te.value.map((e=>String(e[x.value]))).indexOf(String(e))],qe=(e,a=!0)=>te.value.map((e=>parseInt(e[pe.value])==e[pe.value]?parseInt(e[pe.value]):e[pe.value])).indexOf(parseInt(e)==e?parseInt(e):e),Te=e=>{J.value.push(e)},Ee=e=>B.value?e.filter((e=>F.value?e.__VISIBLE__.length:e[C.value].length)):e.filter((e=>!F.value||e.__VISIBLE__.length)),Ie=(e,a=!0)=>{let l=e;return F.value&&O.value&&(l=l.filter((e=>V.value?r(e[pe.value],q.value).startsWith(r(F.value,q.value)):-1!==r(e[pe.value],q.value).indexOf(r(F.value,q.value))))),c.value&&a&&(l=l.filter((e=>!(e=>-1!==["tags","multiple"].indexOf(n.value)&&c.value&&_e(e))(e)))),l},Re=e=>{let a=e;var l;return l=a,"[object Object]"===Object.prototype.toString.call(l)&&(a=Object.keys(a).map((e=>{let l=a[e];return{[x.value]:e,[pe.value]:l,[d.value]:l}}))),a=a.map((e=>"object"==typeof e?e:{[x.value]:e,[pe.value]:e,[d.value]:e})),a},Ce=()=>{a($.value)||(M.value=Ae($.value))},Be=e=>(Y.value=!0,new Promise(((a,l)=>{i.value(F.value,N).then((a=>{Q.value=a||[],"function"==typeof e&&e(a),Y.value=!1})).catch((e=>{console.error(e),Q.value=[],Y.value=!1})).finally((()=>{a()}))}))),De=()=>{if(ne.value)if("single"===n.value){let e=ke(M.value[x.value]);if(void 0!==e){let a=e[d.value];M.value[d.value]=a,h.value&&($.value[d.value]=a)}}else M.value.forEach(((e,a)=>{let l=ke(M.value[a][x.value]);if(void 0!==l){let e=l[d.value];M.value[a][d.value]=e,h.value&&($.value[a][d.value]=e)}}))},Ae=e=>a(e)?"single"===n.value?{}:[]:h.value?e:"single"===n.value?ke(e)||{}:e.filter((e=>!!ke(e))).map((e=>ke(e))),je=()=>{Z.value=e.watch(F,(e=>{e.length<S.value||!e&&0!==S.value||(Y.value=!0,L.value&&(Q.value=[]),setTimeout((()=>{e==F.value&&i.value(F.value,N).then((a=>{e!=F.value&&F.value||(Q.value=a,K.value=re.value.filter((e=>!0!==e[j.value]))[0]||null,Y.value=!1)})).catch((e=>{console.error(e)}))}),y.value))}),{flush:"sync"})};if("single"!==n.value&&!a($.value)&&!Array.isArray($.value))throw new Error(`v-model must be an array when using "${n.value}" mode`);return i&&"function"==typeof i.value?_.value?Be(Ce):1==h.value&&Ce():(Q.value=i.value,Ce()),y.value>-1&&je(),e.watch(y,((e,a)=>{Z.value&&Z.value(),e>=0&&je()})),e.watch($,(e=>{if(a(e))G(Ae(e),!1);else switch(n.value){case"single":(h.value?e[x.value]!=M.value[x.value]:e!=M.value[x.value])&&G(Ae(e),!1);break;case"multiple":case"tags":(function(e,a){const l=a.slice().sort();return e.length===a.length&&e.slice().sort().every((function(e,a){return e===l[a]}))})(h.value?e.map((e=>e[x.value])):e,M.value.map((e=>e[x.value])))||G(Ae(e),!1)}}),{deep:!0}),e.watch(i,((e,a)=>{"function"==typeof l.options?_.value&&(!a||e&&e.toString()!==a.toString())&&Be():(Q.value=l.options,Object.keys(M.value).length||Ce(),De())})),e.watch(d,De),{pfo:ie,fo:re,filteredOptions:re,hasSelected:ne,multipleLabelText:oe,eo:te,extendedOptions:te,fg:ue,filteredGroups:ue,noOptions:se,noResults:ce,resolving:Y,busy:fe,offset:ee,select:ge,deselect:me,remove:be,selectAll:()=>{"single"!==n.value&&ge(re.value)},clear:ye,isSelected:_e,isDisabled:Se,isMax:Oe,getOption:ke,handleOptionClick:e=>{if(!Se(e))return A&&A.value&&!_e(e)&&e.__CREATE__&&(delete(e={...e}).__CREATE__,(e=A.value(e,N))instanceof Promise)?(Y.value=!0,void e.then((e=>{Y.value=!1,Le(e)}))):void Le(e)},handleGroupClick:e=>{if(!Se(e)&&"single"!==n.value&&D.value){switch(n.value){case"multiple":case"tags":xe(e[C.value])?me(e[C.value]):ge(e[C.value].filter((e=>-1===M.value.map((e=>e[x.value])).indexOf(e[x.value]))).filter((e=>!e[j.value])).filter(((e,a)=>M.value.length+1+a<=k.value||-1===k.value)))}T.value&&X()}},handleTagRemove:(e,a)=>{0===a.button?be(e):a.preventDefault()},refreshOptions:e=>{Be(e)},resolveOptions:Be,refreshLabels:De}}function o(a,l,t){const{valueProp:u,showOptions:i,searchable:r,groupLabel:n,groups:o,mode:s,groupSelect:c,disabledProp:v}=e.toRefs(a),p=t.fo,d=t.fg,f=t.handleOptionClick,g=t.handleGroupClick,m=t.search,h=t.pointer,b=t.setPointer,y=t.clearPointer,_=t.multiselect,S=t.isOpen,O=e.computed((()=>p.value.filter((e=>!e[v.value])))),L=e.computed((()=>d.value.filter((e=>!e[v.value])))),w=e.computed((()=>"single"!==s.value&&c.value)),x=e.computed((()=>h.value&&h.value.group)),P=e.computed((()=>A(h.value))),k=e.computed((()=>{const e=x.value?h.value:A(h.value),a=L.value.map((e=>e[n.value])).indexOf(e[n.value]);let l=L.value[a-1];return void 0===l&&(l=T.value),l})),q=e.computed((()=>{let e=L.value.map((e=>e.label)).indexOf(x.value?h.value[n.value]:A(h.value)[n.value])+1;return L.value.length<=e&&(e=0),L.value[e]})),T=e.computed((()=>[...L.value].slice(-1)[0])),E=e.computed((()=>h.value.__VISIBLE__.filter((e=>!e[v.value]))[0])),I=e.computed((()=>{const e=P.value.__VISIBLE__.filter((e=>!e[v.value]));return e[e.map((e=>e[u.value])).indexOf(h.value[u.value])-1]})),R=e.computed((()=>{const e=A(h.value).__VISIBLE__.filter((e=>!e[v.value]));return e[e.map((e=>e[u.value])).indexOf(h.value[u.value])+1]})),C=e.computed((()=>[...k.value.__VISIBLE__.filter((e=>!e[v.value]))].slice(-1)[0])),B=e.computed((()=>[...T.value.__VISIBLE__.filter((e=>!e[v.value]))].slice(-1)[0])),D=()=>{b(O.value[0]||null)},A=e=>L.value.find((a=>-1!==a.__VISIBLE__.map((e=>e[u.value])).indexOf(e[u.value]))),j=()=>{let e=_.value.querySelector("[data-pointed]");if(!e)return;let a=e.parentElement.parentElement;o.value&&(a=x.value?e.parentElement.parentElement.parentElement:e.parentElement.parentElement.parentElement.parentElement),e.offsetTop+e.offsetHeight>a.clientHeight+a.scrollTop&&(a.scrollTop=e.offsetTop+e.offsetHeight-a.clientHeight),e.offsetTop<a.scrollTop&&(a.scrollTop=e.offsetTop)};return e.watch(m,(e=>{r.value&&(e.length&&i.value?D():y())})),e.watch(S,(a=>{if(a){let a=_.value.querySelectorAll("[data-selected]")[0];if(!a)return;let l=a.parentElement.parentElement;e.nextTick((()=>{l.scrollTop>0||(l.scrollTop=a.offsetTop)}))}})),{pointer:h,canPointGroups:w,isPointed:e=>!(!h.value||!(!e.group&&h.value[u.value]==e[u.value]||void 0!==e.group&&h.value[n.value]==e[n.value]))||void 0,setPointerFirst:D,selectPointer:()=>{h.value&&!0!==h.value[v.value]&&(x.value?g(h.value):f(h.value))},forwardPointer:()=>{if(null===h.value)b((o.value&&w.value?L.value[0]:O.value[0])||null);else if(o.value&&w.value){let e=x.value?E.value:R.value;void 0===e&&(e=q.value),b(e||null)}else{let e=O.value.map((e=>e[u.value])).indexOf(h.value[u.value])+1;O.value.length<=e&&(e=0),b(O.value[e]||null)}e.nextTick((()=>{j()}))},backwardPointer:()=>{if(null===h.value){let e=O.value[O.value.length-1];o.value&&w.value&&(e=B.value,void 0===e&&(e=T.value)),b(e||null)}else if(o.value&&w.value){let e=x.value?C.value:I.value;void 0===e&&(e=x.value?k.value:P.value),b(e||null)}else{let e=O.value.map((e=>e[u.value])).indexOf(h.value[u.value])-1;e<0&&(e=O.value.length-1),b(O.value[e]||null)}e.nextTick((()=>{j()}))}}}function s(a,l,t){const{disabled:u}=e.toRefs(a),i=e.getCurrentInstance().proxy,r=e.ref(!1);return{isOpen:r,open:()=>{r.value||u.value||(r.value=!0,l.emit("open",i))},close:()=>{r.value&&(r.value=!1,l.emit("close",i))}}}function c(a,l,t){const{searchable:u,disabled:i,clearOnBlur:r}=e.toRefs(a),n=t.input,o=t.open,s=t.close,c=t.clearSearch,v=t.isOpen,p=e.ref(null),d=e.ref(null),f=e.ref(null),g=e.ref(!1),m=e.ref(!1),h=e.computed((()=>u.value||i.value?-1:0)),b=()=>{u.value&&n.value.blur(),d.value.blur()},y=(e=!0)=>{i.value||(g.value=!0,e&&o())},_=()=>{g.value=!1,setTimeout((()=>{g.value||(s(),r.value&&c())}),1)};return{multiselect:p,wrapper:d,tags:f,tabindex:h,isActive:g,mouseClicked:m,blur:b,focus:()=>{u.value&&!i.value&&n.value.focus()},activate:y,deactivate:_,handleFocusIn:e=>{e.target.closest("[data-tags]")&&"INPUT"!==e.target.nodeName||e.target.closest("[data-clear]")||y(m.value)},handleFocusOut:()=>{_()},handleCaretClick:()=>{_(),b()},handleMousedown:e=>{m.value=!0,v.value&&(e.target.isEqualNode(d.value)||e.target.isEqualNode(f.value))?setTimeout((()=>{_()}),0):document.activeElement.isEqualNode(d.value)&&!v.value&&y(),setTimeout((()=>{m.value=!1}),0)}}}function v(a,l,t){const{mode:u,addTagOn:i,openDirection:r,searchable:n,showOptions:o,valueProp:s,groups:c,addOptionOn:v,createTag:p,createOption:d,reverse:f}=e.toRefs(a),g=e.getCurrentInstance().proxy,m=t.iv,h=t.update,b=t.search,y=t.setPointer,_=t.selectPointer,S=t.backwardPointer,O=t.forwardPointer,L=t.multiselect,w=t.wrapper,x=t.tags,P=t.isOpen,k=t.open,q=t.blur,T=t.fo,E=e.computed((()=>p.value||d.value||!1)),I=e.computed((()=>void 0!==i.value?i.value:void 0!==v.value?v.value:["enter"])),R=()=>{"tags"===u.value&&!o.value&&E.value&&n.value&&!c.value&&y(T.value[T.value.map((e=>e[s.value])).indexOf(b.value)])};return{handleKeydown:e=>{let a,t;switch(l.emit("keydown",e,g),-1!==["ArrowLeft","ArrowRight","Enter"].indexOf(e.key)&&"tags"===u.value&&(a=[...L.value.querySelectorAll("[data-tags] > *")].filter((e=>e!==x.value)),t=a.findIndex((e=>e===document.activeElement))),e.key){case"Backspace":if("single"===u.value)return;if(n.value&&-1===[null,""].indexOf(b.value))return;if(0===m.value.length)return;h([...m.value].slice(0,-1));break;case"Enter":if(e.preventDefault(),229===e.keyCode)return;if(-1!==t&&void 0!==t)return h([...m.value].filter(((e,a)=>a!==t))),void(t===a.length-1&&(a.length-1?a[a.length-2].focus():n.value?x.value.querySelector("input").focus():w.value.focus()));if(-1===I.value.indexOf("enter")&&E.value)return;R(),_();break;case" ":if(!E.value&&!n.value)return e.preventDefault(),R(),void _();if(!E.value)return!1;if(-1===I.value.indexOf("space")&&E.value)return;e.preventDefault(),R(),_();break;case"Tab":case";":case",":if(-1===I.value.indexOf(e.key.toLowerCase())||!E.value)return;R(),_(),e.preventDefault();break;case"Escape":q();break;case"ArrowUp":if(e.preventDefault(),!o.value)return;P.value||k(),S();break;case"ArrowDown":if(e.preventDefault(),!o.value)return;P.value||k(),O();break;case"ArrowLeft":if(n.value&&x.value&&x.value.querySelector("input").selectionStart||e.shiftKey||"tags"!==u.value||!m.value||!m.value.length)return;e.preventDefault(),-1===t?a[a.length-1].focus():t>0&&a[t-1].focus();break;case"ArrowRight":if(-1===t||e.shiftKey||"tags"!==u.value||!m.value||!m.value.length)return;e.preventDefault(),a.length>t+1?a[t+1].focus():n.value?x.value.querySelector("input").focus():n.value||w.value.focus()}},handleKeyup:e=>{l.emit("keyup",e,g)},preparePointer:R}}function p(a,l,t){const{classes:u,disabled:i,openDirection:r,showOptions:n}=e.toRefs(a),o=t.isOpen,s=t.isPointed,c=t.isSelected,v=t.isDisabled,p=t.isActive,d=t.canPointGroups,f=t.resolving,g=t.fo,m=e.computed((()=>({container:"multiselect",containerDisabled:"is-disabled",containerOpen:"is-open",containerOpenTop:"is-open-top",containerActive:"is-active",wrapper:"multiselect-wrapper",singleLabel:"multiselect-single-label",singleLabelText:"multiselect-single-label-text",multipleLabel:"multiselect-multiple-label",search:"multiselect-search",tags:"multiselect-tags",tag:"multiselect-tag",tagDisabled:"is-disabled",tagRemove:"multiselect-tag-remove",tagRemoveIcon:"multiselect-tag-remove-icon",tagsSearchWrapper:"multiselect-tags-search-wrapper",tagsSearch:"multiselect-tags-search",tagsSearchCopy:"multiselect-tags-search-copy",placeholder:"multiselect-placeholder",caret:"multiselect-caret",caretOpen:"is-open",clear:"multiselect-clear",clearIcon:"multiselect-clear-icon",spinner:"multiselect-spinner",inifinite:"multiselect-inifite",inifiniteSpinner:"multiselect-inifite-spinner",dropdown:"multiselect-dropdown",dropdownTop:"is-top",dropdownHidden:"is-hidden",options:"multiselect-options",optionsTop:"is-top",group:"multiselect-group",groupLabel:"multiselect-group-label",groupLabelPointable:"is-pointable",groupLabelPointed:"is-pointed",groupLabelSelected:"is-selected",groupLabelDisabled:"is-disabled",groupLabelSelectedPointed:"is-selected is-pointed",groupLabelSelectedDisabled:"is-selected is-disabled",groupOptions:"multiselect-group-options",option:"multiselect-option",optionPointed:"is-pointed",optionSelected:"is-selected",optionDisabled:"is-disabled",optionSelectedPointed:"is-selected is-pointed",optionSelectedDisabled:"is-selected is-disabled",noOptions:"multiselect-no-options",noResults:"multiselect-no-results",fakeInput:"multiselect-fake-input",assist:"multiselect-assistive-text",spacer:"multiselect-spacer",...u.value}))),h=e.computed((()=>!!(o.value&&n.value&&(!f.value||f.value&&g.value.length))));return{classList:e.computed((()=>{const e=m.value;return{container:[e.container].concat(i.value?e.containerDisabled:[]).concat(h.value&&"top"===r.value?e.containerOpenTop:[]).concat(h.value&&"top"!==r.value?e.containerOpen:[]).concat(p.value?e.containerActive:[]),wrapper:e.wrapper,spacer:e.spacer,singleLabel:e.singleLabel,singleLabelText:e.singleLabelText,multipleLabel:e.multipleLabel,search:e.search,tags:e.tags,tag:[e.tag].concat(i.value?e.tagDisabled:[]),tagRemove:e.tagRemove,tagRemoveIcon:e.tagRemoveIcon,tagsSearchWrapper:e.tagsSearchWrapper,tagsSearch:e.tagsSearch,tagsSearchCopy:e.tagsSearchCopy,placeholder:e.placeholder,caret:[e.caret].concat(o.value?e.caretOpen:[]),clear:e.clear,clearIcon:e.clearIcon,spinner:e.spinner,inifinite:e.inifinite,inifiniteSpinner:e.inifiniteSpinner,dropdown:[e.dropdown].concat("top"===r.value?e.dropdownTop:[]).concat(o.value&&n.value&&h.value?[]:e.dropdownHidden),options:[e.options].concat("top"===r.value?e.optionsTop:[]),group:e.group,groupLabel:a=>{let l=[e.groupLabel];return s(a)?l.push(c(a)?e.groupLabelSelectedPointed:e.groupLabelPointed):c(a)&&d.value?l.push(v(a)?e.groupLabelSelectedDisabled:e.groupLabelSelected):v(a)&&l.push(e.groupLabelDisabled),d.value&&l.push(e.groupLabelPointable),l},groupOptions:e.groupOptions,option:(a,l)=>{let t=[e.option];return s(a)?t.push(c(a)?e.optionSelectedPointed:e.optionPointed):c(a)?t.push(v(a)?e.optionSelectedDisabled:e.optionSelected):(v(a)||l&&v(l))&&t.push(e.optionDisabled),t},noOptions:e.noOptions,noResults:e.noResults,assist:e.assist,fakeInput:e.fakeInput}})),showDropdown:h}}function d(a,l,t){const{limit:u,infinite:i}=e.toRefs(a),r=t.isOpen,n=t.offset,o=t.search,s=t.pfo,c=t.eo,v=e.ref(null),p=e.ref(null),d=e.computed((()=>n.value<s.value.length)),f=a=>{const{isIntersecting:l,target:t}=a[0];if(l){const a=t.offsetParent,l=a.scrollTop;n.value+=-1==u.value?10:u.value,e.nextTick((()=>{a.scrollTop=l}))}},g=()=>{r.value&&n.value<s.value.length?v.value.observe(p.value):!r.value&&v.value&&v.value.disconnect()};return e.watch(r,(()=>{i.value&&g()})),e.watch(o,(()=>{i.value&&(n.value=u.value,g())}),{flush:"post"}),e.watch(c,(()=>{i.value&&g()}),{immediate:!1,flush:"post"}),e.onMounted((()=>{window&&window.IntersectionObserver&&(v.value=new IntersectionObserver(f))})),{hasMore:d,infiniteLoader:p}}function f(a,l,t){const{placeholder:u,id:i,valueProp:r,label:n,mode:o,groupLabel:s,aria:c,searchable:v}=e.toRefs(a),p=t.pointer,d=t.iv,f=t.hasSelected,g=t.multipleLabelText,m=e.ref(null),h=e.computed((()=>{let e=[];return i&&i.value&&e.push(i.value),e.push("assist"),e.join("-")})),b=e.computed((()=>{let e=[];return i&&i.value&&e.push(i.value),e.push("multiselect-options"),e.join("-")})),y=e.computed((()=>{let e=[];if(i&&i.value&&e.push(i.value),p.value)return e.push(p.value.group?"multiselect-group":"multiselect-option"),e.push(p.value.group?p.value.index:p.value[r.value]),e.join("-")})),_=e.computed((()=>u.value)),S=e.computed((()=>"single"!==o.value)),O=e.computed((()=>{let e="";return"single"===o.value&&f.value&&(e+=d.value[n.value]),"multiple"===o.value&&f.value&&(e+=g.value),"tags"===o.value&&f.value&&(e+=d.value.map((e=>e[n.value])).join(", ")),e})),L=e.computed((()=>{let e={...c.value};return v.value&&(e["aria-labelledby"]=e["aria-labelledby"]?`${h.value} ${e["aria-labelledby"]}`:h.value,O.value&&e["aria-label"]&&(e["aria-label"]=`${O.value}, ${e["aria-label"]}`)),e}));return e.onMounted((()=>{if(i&&i.value&&document&&document.querySelector){let e=document.querySelector(`[for="${i.value}"]`);m.value=e?e.innerText:null}})),{arias:L,ariaLabel:O,ariaAssist:h,ariaControls:b,ariaPlaceholder:_,ariaMultiselectable:S,ariaActiveDescendant:y,ariaOptionId:e=>{let a=[];return i&&i.value&&a.push(i.value),a.push("multiselect-option"),a.push(e[r.value]),a.join("-")},ariaOptionLabel:e=>{let a=[];return a.push(e[n.value]),a.join(" ")},ariaGroupId:e=>{let a=[];return i&&i.value&&a.push(i.value),a.push("multiselect-group"),a.push(e.index),a.join("-")},ariaGroupLabel:e=>{let a=[];return a.push(e[s.value]),a.join(" ")},ariaTagLabel:e=>`${e} ❎`}}function g(e,a,l,t,u,i,r,n,o,s){"boolean"!=typeof r&&(o=n,n=r,r=!1);const c="function"==typeof l?l.options:l;let v;if(e&&e.render&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,u&&(c.functional=!0)),t&&(c._scopeId=t),i?(v=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),a&&a.call(this,o(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=v):a&&(v=r?function(e){a.call(this,s(e,this.$root.$options.shadowRoot))}:function(e){a.call(this,n(e))}),v)if(c.functional){const e=c.render;c.render=function(a,l){return v.call(l),e(a,l)}}else{const e=c.beforeCreate;c.beforeCreate=e?[].concat(e,v):[v]}return l}const m={name:"Multiselect",emits:["paste","open","close","select","deselect","input","search-change","tag","option","update:modelValue","change","clear","keydown","keyup","max"],props:{value:{required:!1},modelValue:{required:!1},options:{type:[Array,Object,Function],required:!1,default:()=>[]},id:{type:[String,Number],required:!1},name:{type:[String,Number],required:!1,default:"multiselect"},disabled:{type:Boolean,required:!1,default:!1},label:{type:String,required:!1,default:"label"},trackBy:{type:String,required:!1,default:void 0},valueProp:{type:String,required:!1,default:"value"},placeholder:{type:String,required:!1,default:null},mode:{type:String,required:!1,default:"single"},searchable:{type:Boolean,required:!1,default:!1},limit:{type:Number,required:!1,default:-1},hideSelected:{type:Boolean,required:!1,default:!0},createTag:{type:Boolean,required:!1,default:void 0},createOption:{type:Boolean,required:!1,default:void 0},appendNewTag:{type:Boolean,required:!1,default:void 0},appendNewOption:{type:Boolean,required:!1,default:void 0},addTagOn:{type:Array,required:!1,default:void 0},addOptionOn:{type:Array,required:!1,default:void 0},caret:{type:Boolean,required:!1,default:!0},loading:{type:Boolean,required:!1,default:!1},noOptionsText:{type:String,required:!1,default:"The list is empty"},noResultsText:{type:String,required:!1,default:"No results found"},multipleLabel:{type:Function,required:!1},object:{type:Boolean,required:!1,default:!1},delay:{type:Number,required:!1,default:-1},minChars:{type:Number,required:!1,default:0},resolveOnLoad:{type:Boolean,required:!1,default:!0},filterResults:{type:Boolean,required:!1,default:!0},clearOnSearch:{type:Boolean,required:!1,default:!1},clearOnSelect:{type:Boolean,required:!1,default:!0},canDeselect:{type:Boolean,required:!1,default:!0},canClear:{type:Boolean,required:!1,default:!0},max:{type:Number,required:!1,default:-1},showOptions:{type:Boolean,required:!1,default:!0},required:{type:Boolean,required:!1,default:!1},openDirection:{type:String,required:!1,default:"bottom"},nativeSupport:{type:Boolean,required:!1,default:!1},classes:{type:Object,required:!1,default:()=>({})},strict:{type:Boolean,required:!1,default:!0},closeOnSelect:{type:Boolean,required:!1,default:!0},autocomplete:{type:String,required:!1},groups:{type:Boolean,required:!1,default:!1},groupLabel:{type:String,required:!1,default:"label"},groupOptions:{type:String,required:!1,default:"options"},groupHideEmpty:{type:Boolean,required:!1,default:!1},groupSelect:{type:Boolean,required:!1,default:!0},inputType:{type:String,required:!1,default:"text"},attrs:{required:!1,type:Object,default:()=>({})},onCreate:{required:!1,type:Function},disabledProp:{type:String,required:!1,default:"disabled"},searchStart:{type:Boolean,required:!1,default:!1},reverse:{type:Boolean,required:!1,default:!1},regex:{type:[Object,String,RegExp],required:!1,default:void 0},rtl:{type:Boolean,required:!1,default:!1},infinite:{type:Boolean,required:!1,default:!1},aria:{required:!1,type:Object,default:()=>({})},clearOnBlur:{required:!1,type:Boolean,default:!0}},setup:(e,a)=>function(e,a,l,t={}){return l.forEach((l=>{l&&(t={...t,...l(e,a,t)})})),t}(e,a,[t,i,s,u,l,c,n,d,o,v,p,f])};var h=function(){var e=this,a=e.$createElement,l=e._self._c||a;return l("div",{ref:"multiselect",class:e.classList.container,attrs:{id:e.searchable?void 0:e.id,dir:e.rtl?"rtl":void 0},on:{focusin:e.handleFocusIn,focusout:e.handleFocusOut,keyup:e.handleKeyup,keydown:e.handleKeydown}},[l("div",e._b({ref:"wrapper",class:e.classList.wrapper,attrs:{tabindex:e.tabindex,"aria-controls":e.searchable?void 0:e.ariaControls,"aria-placeholder":e.searchable?void 0:e.ariaPlaceholder,"aria-expanded":e.searchable?void 0:e.isOpen,"aria-activedescendant":e.searchable?void 0:e.ariaActiveDescendant,"aria-multiselectable":e.searchable?void 0:e.ariaMultiselectable,role:e.searchable?void 0:"combobox"},on:{mousedown:e.handleMousedown}},"div",e.searchable?{}:e.arias,!1),["tags"!==e.mode&&e.searchable&&!e.disabled?[l("input",e._b({ref:"input",class:e.classList.search,attrs:{type:e.inputType,modelValue:e.search,autocomplete:e.autocomplete,id:e.searchable?e.id:void 0,"aria-controls":e.ariaControls,"aria-placeholder":e.ariaPlaceholder,"aria-expanded":e.isOpen,"aria-activedescendant":e.ariaActiveDescendant,"aria-multiselectable":e.ariaMultiselectable,role:"combobox"},domProps:{value:e.search},on:{input:e.handleSearchInput,keypress:e.handleKeypress,paste:function(a){return a.stopPropagation(),e.handlePaste.apply(null,arguments)}}},"input",Object.assign({},e.attrs,e.arias),!1))]:e._e(),e._v(" "),"tags"==e.mode?[l("div",{class:e.classList.tags,attrs:{"data-tags":""}},[e._l(e.iv,(function(a,t,u){return e._t("tag",(function(){return[l("span",{key:u,class:e.classList.tag,attrs:{tabindex:"-1","aria-label":e.ariaTagLabel(a[e.label])},on:{keyup:function(l){return!l.type.indexOf("key")&&e._k(l.keyCode,"enter",13,l.key,"Enter")?null:e.handleTagRemove(a,l)}}},[e._v("\n            "+e._s(a[e.label])+"\n            "),e.disabled?e._e():l("span",{class:e.classList.tagRemove,on:{click:function(l){return l.stopPropagation(),e.handleTagRemove(a,l)}}},[l("span",{class:e.classList.tagRemoveIcon})])])]}),{option:a,handleTagRemove:e.handleTagRemove,disabled:e.disabled})})),e._v(" "),l("div",{ref:"tags",class:e.classList.tagsSearchWrapper},[l("span",{class:e.classList.tagsSearchCopy},[e._v(e._s(e.search))]),e._v(" "),e.searchable&&!e.disabled?l("input",e._b({ref:"input",class:e.classList.tagsSearch,attrs:{type:e.inputType,modelValue:e.search,id:e.searchable?e.id:void 0,autocomplete:e.autocomplete,"aria-controls":e.ariaControls,"aria-placeholder":e.ariaPlaceholder,"aria-expanded":e.isOpen,"aria-activedescendant":e.ariaActiveDescendant,"aria-multiselectable":e.ariaMultiselectable,role:"combobox"},domProps:{value:e.search},on:{input:e.handleSearchInput,keypress:e.handleKeypress,paste:function(a){return a.stopPropagation(),e.handlePaste.apply(null,arguments)}}},"input",Object.assign({},e.attrs,e.arias),!1)):e._e()])],2)]:e._e(),e._v(" "),"single"==e.mode&&e.hasSelected&&!e.search&&e.iv?[e._t("singlelabel",(function(){return[l("div",{class:e.classList.singleLabel},[l("span",{class:e.classList.singleLabelText},[e._v(e._s(e.iv[e.label]))])])]}),{value:e.iv})]:e._e(),e._v(" "),"multiple"==e.mode&&e.hasSelected&&!e.search?[e._t("multiplelabel",(function(){return[l("div",{class:e.classList.multipleLabel,domProps:{innerHTML:e._s(e.multipleLabelText)}})]}),{values:e.iv})]:e._e(),e._v(" "),!e.placeholder||e.hasSelected||e.search?e._e():[e._t("placeholder",(function(){return[l("div",{class:e.classList.placeholder,attrs:{"aria-hidden":"true"}},[e._v("\n          "+e._s(e.placeholder)+"\n        ")])]}))],e._v(" "),e.loading||e.resolving?e._t("spinner",(function(){return[l("span",{class:e.classList.spinner,attrs:{"aria-hidden":"true"}})]})):e._e(),e._v(" "),e.hasSelected&&!e.disabled&&e.canClear&&!e.busy?e._t("clear",(function(){return[l("span",{class:e.classList.clear,attrs:{"aria-hidden":"true",tabindex:"0",role:"button","data-clear":"","aria-roledescription":"❎"},on:{click:e.clear,keyup:function(a){return!a.type.indexOf("key")&&e._k(a.keyCode,"enter",13,a.key,"Enter")?null:e.clear.apply(null,arguments)}}},[l("span",{class:e.classList.clearIcon})])]}),{clear:e.clear}):e._e(),e._v(" "),e.caret&&e.showOptions?e._t("caret",(function(){return[l("span",{class:e.classList.caret,attrs:{"aria-hidden":"true"},on:{click:e.handleCaretClick}})]})):e._e()],2),e._v(" "),l("div",{class:e.classList.dropdown,attrs:{tabindex:"-1"}},[e._t("beforelist",null,{options:e.fo}),e._v(" "),l("ul",{class:e.classList.options,attrs:{id:e.ariaControls,role:"listbox"}},[e.groups?e._l(e.fg,(function(a,t,u){return l("li",{key:u,class:e.classList.group,attrs:{id:e.ariaGroupId(a),"aria-label":e.ariaGroupLabel(a),"aria-selected":e.isSelected(a),role:"option"}},[l("div",{class:e.classList.groupLabel(a),attrs:{"data-pointed":e.isPointed(a)},on:{mouseenter:function(l){return e.setPointer(a,t)},click:function(l){return e.handleGroupClick(a)}}},[e._t("grouplabel",(function(){return[l("span",{domProps:{innerHTML:e._s(a[e.groupLabel])}})]}),{group:a,isSelected:e.isSelected,isPointed:e.isPointed})],2),e._v(" "),l("ul",{class:e.classList.groupOptions,attrs:{"aria-label":e.ariaGroupLabel(a),role:"group"}},e._l(a.__VISIBLE__,(function(t,u,i){return l("li",{key:i,class:e.classList.option(t,a),attrs:{"data-pointed":e.isPointed(t),"data-selected":e.isSelected(t)||void 0,id:e.ariaOptionId(t),"aria-selected":e.isSelected(t),"aria-label":e.ariaOptionLabel(t),role:"option"},on:{mouseenter:function(a){return e.setPointer(t)},click:function(a){return e.handleOptionClick(t)}}},[e._t("option",(function(){return[l("span",[e._v(e._s(t[e.label]))])]}),{option:t,isSelected:e.isSelected,isPointed:e.isPointed,search:e.search})],2)})),0)])})):e._l(e.fo,(function(a,t,u){return l("li",{key:u,class:e.classList.option(a),attrs:{"data-pointed":e.isPointed(a),"data-selected":e.isSelected(a)||void 0,id:e.ariaOptionId(a),"aria-selected":e.isSelected(a),"aria-label":e.ariaOptionLabel(a),role:"option"},on:{mouseenter:function(l){return e.setPointer(a)},click:function(l){return e.handleOptionClick(a)}}},[e._t("option",(function(){return[l("span",[e._v(e._s(a[e.label]))])]}),{option:a,isSelected:e.isSelected,isPointed:e.isPointed,search:e.search})],2)}))],2),e._v(" "),e.noOptions?e._t("nooptions",(function(){return[l("div",{class:e.classList.noOptions,domProps:{innerHTML:e._s(e.noOptionsText)}})]})):e._e(),e._v(" "),e.noResults?e._t("noresults",(function(){return[l("div",{class:e.classList.noResults,domProps:{innerHTML:e._s(e.noResultsText)}})]})):e._e(),e._v(" "),e.infinite&&e.hasMore?l("div",{ref:"infiniteLoader",class:e.classList.inifinite},[e._t("infinite",(function(){return[l("span",{class:e.classList.inifiniteSpinner})]}))],2):e._e(),e._v(" "),e._t("afterlist",null,{options:e.fo})],2),e._v(" "),e.required?l("input",{class:e.classList.fakeInput,attrs:{tabindex:"-1",required:""},domProps:{value:e.textValue}}):e._e(),e._v(" "),e.nativeSupport?["single"==e.mode?l("input",{attrs:{type:"hidden",name:e.name},domProps:{value:void 0!==e.plainValue?e.plainValue:""}}):e._l(e.plainValue,(function(a,t){return l("input",{key:t,attrs:{type:"hidden",name:e.name+"[]"},domProps:{value:a}})}))]:e._e(),e._v(" "),e.searchable&&e.hasSelected?l("div",{class:e.classList.assist,attrs:{id:e.ariaAssist,"aria-hidden":"true"}},[e._v("\n    "+e._s(e.ariaLabel)+"\n  ")]):e._e(),e._v(" "),l("div",{class:e.classList.spacer})],2)};h._withStripped=!0;return g({render:h,staticRenderFns:[]},undefined,m,undefined,false,undefined,!1,void 0,void 0,void 0)}(Vue);
