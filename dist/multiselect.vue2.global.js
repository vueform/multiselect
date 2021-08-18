var VueformMultiselect=function(e){"use strict";function t(e){return-1!==[null,void 0,!1].indexOf(e)}function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function a(e,t,u){return t in e?Object.defineProperty(e,t,{value:u,enumerable:!0,configurable:!0,writable:!0}):e[t]=u,e}function n(e,t){var u=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),u.push.apply(u,a)}return u}function l(e){return function(e){if(Array.isArray(e))return r(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return r(e,t);var u=Object.prototype.toString.call(e).slice(8,-1);"Object"===u&&e.constructor&&(u=e.constructor.name);if("Map"===u||"Set"===u)return Array.from(e);if("Arguments"===u||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(u))return r(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var u=0,a=new Array(t);u<t;u++)a[u]=e[u];return a}function i(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return t?String(e).toLowerCase().trim():String(e).normalize("NFD").replace(/(?:[\^`\xA8\xAF\xB4\xB7\xB8\u02B0-\u034E\u0350-\u0357\u035D-\u0362\u0374\u0375\u037A\u0384\u0385\u0483-\u0487\u0559\u0591-\u05A1\u05A3-\u05BD\u05BF\u05C1\u05C2\u05C4\u064B-\u0652\u0657\u0658\u06DF\u06E0\u06E5\u06E6\u06EA-\u06EC\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F5\u0818\u0819\u08E3-\u08FE\u093C\u094D\u0951-\u0954\u0971\u09BC\u09CD\u0A3C\u0A4D\u0ABC\u0ACD\u0AFD-\u0AFF\u0B3C\u0B4D\u0B55\u0BCD\u0C4D\u0CBC\u0CCD\u0D3B\u0D3C\u0D4D\u0DCA\u0E47-\u0E4C\u0E4E\u0EBA\u0EC8-\u0ECC\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F82-\u0F84\u0F86\u0F87\u0FC6\u1037\u1039\u103A\u1063\u1064\u1069-\u106D\u1087-\u108D\u108F\u109A\u109B\u135D-\u135F\u17C9-\u17D3\u17DD\u1939-\u193B\u1A75-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B34\u1B44\u1B6B-\u1B73\u1BAA\u1BAB\u1C36\u1C37\u1C78-\u1C7D\u1CD0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1D2C-\u1D6A\u1DC4-\u1DCF\u1DF5-\u1DF9\u1DFD-\u1DFF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2CEF-\u2CF1\u2E2F\u302A-\u302F\u3099-\u309C\u30FC\uA66F\uA67C\uA67D\uA67F\uA69C\uA69D\uA6F0\uA6F1\uA700-\uA721\uA788-\uA78A\uA7F8\uA7F9\uA8C4\uA8E0-\uA8F1\uA92B-\uA92E\uA953\uA9B3\uA9C0\uA9E5\uAA7B-\uAA7D\uAABF-\uAAC2\uAAF6\uAB5B-\uAB5F\uAB69-\uAB6B\uABEC\uABED\uFB1E\uFE20-\uFE2F\uFF3E\uFF40\uFF70\uFF9E\uFF9F\uFFE3]|\uD800\uDEE0|\uD802[\uDEE5\uDEE6]|\uD803[\uDD22-\uDD27\uDF46-\uDF50]|\uD804[\uDCB9\uDCBA\uDD33\uDD34\uDD73\uDDC0\uDDCA-\uDDCC\uDE35\uDE36\uDEE9\uDEEA\uDF3C\uDF4D\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC42\uDC46\uDCC2\uDCC3\uDDBF\uDDC0\uDE3F\uDEB6\uDEB7\uDF2B]|\uD806[\uDC39\uDC3A\uDD3D\uDD3E\uDD43\uDDE0\uDE34\uDE47\uDE99]|\uD807[\uDC3F\uDD42\uDD44\uDD45\uDD97]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF9F\uDFF0\uDFF1]|\uD834[\uDD67-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uD838[\uDD30-\uDD36\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD46\uDD48-\uDD4A])/g,"").toLowerCase().trim()}function o(n,l,r){var o=e.toRefs(n),s=o.options,c=o.mode,v=o.trackBy,d=o.limit,p=o.hideSelected,f=o.createTag,D=o.label,m=o.appendNewTag,h=o.multipleLabel,g=o.object,b=o.loading,y=o.delay,F=o.resolveOnLoad,C=o.minChars,A=o.filterResults,O=o.clearOnSearch,S=o.clearOnSelect,_=o.valueProp,B=o.canDeselect,E=o.max,w=o.strict,P=o.closeOnSelect,q=r.iv,T=r.ev,k=r.search,L=r.clearSearch,x=r.update,R=r.pointer,j=r.blur,I=r.deactivate,V=e.ref([]),N=e.ref([]),H=e.ref(!1),$=e.computed((function(){var e,t=N.value||[];return e=t,"[object Object]"===Object.prototype.toString.call(e)&&(t=Object.keys(t).map((function(e){var u,n=t[e];return a(u={},_.value,e),a(u,v.value,n),a(u,D.value,n),u}))),t=t.map((function(e,t){var n;return"object"===u(e)?e:(a(n={},_.value,e),a(n,v.value,e),a(n,D.value,e),n)})),V.value.length&&(t=t.concat(V.value)),t})),M=e.computed((function(){var e=$.value;return z.value.length&&(e=z.value.concat(e)),k.value&&A.value&&(e=e.filter((function(e){return-1!==i(e[v.value],w.value).indexOf(i(k.value,w.value))}))),p.value&&(e=e.filter((function(e){return!ie(e)}))),d.value>0&&(e=e.slice(0,d.value)),e})),W=e.computed((function(){switch(c.value){case"single":return!t(q.value[_.value]);case"multiple":case"tags":return!t(q.value)&&q.value.length>0}})),U=e.computed((function(){return void 0!==h&&void 0!==h.value?h.value(q.value):q.value&&q.value.length>1?"".concat(q.value.length," options selected"):"1 option selected"})),K=e.computed((function(){return!$.value.length&&!H.value})),X=e.computed((function(){return $.value.length>0&&0==M.value.length})),z=e.computed((function(){var e;return!1!==f.value&&k.value?-1!==re(k.value)?[]:[(e={},a(e,_.value,k.value),a(e,D.value,k.value),a(e,v.value,k.value),e)]:[]})),G=e.computed((function(){switch(c.value){case"single":return null;case"multiple":case"tags":return[]}})),J=e.computed((function(){return b.value||H.value})),Q=function(e){switch("object"!==u(e)&&(e=le(e)),c.value){case"single":x(e);break;case"multiple":case"tags":x(q.value.concat(e))}l.emit("select",Z(e),e)},Y=function(e){switch("object"!==u(e)&&(e=le(e)),c.value){case"single":te();break;case"tags":case"multiple":x(q.value.filter((function(t){return t[_.value]!=e[_.value]})))}l.emit("deselect",Z(e),e)},Z=function(e){return g.value?e:e[_.value]},ee=function(e){Y(e)},te=function(){l.emit("clear"),x(G.value)},ue=function(e){switch(c.value){case"single":return!t(q.value)&&q.value[_.value]==e[_.value];case"tags":case"multiple":return!t(q.value)&&-1!==q.value.map((function(e){return e[_.value]})).indexOf(e[_.value])}},ae=function(e){return!0===e.disabled},ne=function(){return!(void 0===E||-1===E.value||!W.value&&E.value>0)&&q.value.length>=E.value},le=function(e){return $.value[$.value.map((function(e){return String(e[_.value])})).indexOf(String(e))]},re=function(e){return $.value.map((function(e){return i(e[v.value])})).indexOf(i(e))},ie=function(e){return p.value&&ue(e)},oe=function(e){V.value.push(e)},se=function(){t(T.value)||(q.value=ve(T.value))},ce=function(e){H.value=!0,s.value(k.value).then((function(t){N.value=t,"function"==typeof e&&e(t),H.value=!1}))},ve=function(e){return t(e)?"single"===c.value?{}:[]:g.value?e:"single"===c.value?le(e)||{}:e.filter((function(e){return!!le(e)})).map((function(e){return le(e)}))};if("single"!==c.value&&!t(T.value)&&!Array.isArray(T.value))throw new Error('v-model must be an array when using "'.concat(c.value,'" mode'));return s&&"function"==typeof s.value?F.value?ce(se):1==g.value&&se():(N.value=s.value,se()),y.value>-1&&e.watch(k,(function(e){e.length<C.value||(H.value=!0,O.value&&(N.value=[]),setTimeout((function(){e==k.value&&s.value(k.value).then((function(t){e==k.value&&(N.value=t,R.value=M.value.filter((function(e){return!0!==e.disabled}))[0]||null,H.value=!1)}))}),y.value))}),{flush:"sync"}),e.watch(T,(function(e){var u,a,n;if(t(e))q.value=ve(e);else switch(c.value){case"single":(g.value?e[_.value]!=q.value[_.value]:e!=q.value[_.value])&&(q.value=ve(e));break;case"multiple":case"tags":u=g.value?e.map((function(e){return e[_.value]})):e,a=q.value.map((function(e){return e[_.value]})),n=a.slice().sort(),u.length===a.length&&u.slice().sort().every((function(e,t){return e===n[t]}))||(q.value=ve(e))}}),{deep:!0}),"function"!=typeof n.options&&e.watch(s,(function(e,t){N.value=n.options,Object.keys(q.value).length||se(),function(){if(W.value)if("single"===c.value){var e=le(q.value[_.value])[D.value];q.value[D.value]=e,g.value&&(T.value[D.value]=e)}else q.value.forEach((function(e,t){var u=le(q.value[t][_.value])[D.value];q.value[t][D.value]=u,g.value&&(T.value[t][D.value]=u)}))}()})),{fo:M,filteredOptions:M,hasSelected:W,multipleLabelText:U,eo:$,extendedOptions:$,noOptions:K,noResults:X,resolving:H,busy:J,select:Q,deselect:Y,remove:ee,clear:te,isSelected:ue,isDisabled:ae,isMax:ne,getOption:le,handleOptionClick:function(e){if(!ae(e)){switch(c.value){case"single":if(ue(e))return void(B.value&&Y(e));j(),Q(e);break;case"multiple":if(ue(e))return void Y(e);if(ne())return;Q(e),S.value&&L();break;case"tags":if(ue(e))return void Y(e);if(ne())return;void 0===le(e[_.value])&&f.value&&(l.emit("tag",e[_.value]),m.value&&oe(e),L()),S.value&&L(),Q(e)}P.value&&I()}},handleTagRemove:function(e,t){0===t.button?ee(e):t.preventDefault()},refreshOptions:function(e){ce(e)},resolveOptions:ce}}function s(t,u,l){var r=e.toRefs(t),i=r.disabled,o=r.openDirection,s=r.showOptions,c=l.isOpen,v=l.isPointed,d=l.isSelected,p=l.isDisabled,f=l.isActive,D=function(e){for(var t=1;t<arguments.length;t++){var u=null!=arguments[t]?arguments[t]:{};t%2?n(Object(u),!0).forEach((function(t){a(e,t,u[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(u)):n(Object(u)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(u,t))}))}return e}({container:"multiselect",containerDisabled:"is-disabled",containerOpen:"is-open",containerOpenTop:"is-open-top",containerActive:"is-active",singleLabel:"multiselect-single-label",multipleLabel:"multiselect-multiple-label",search:"multiselect-search",tags:"multiselect-tags",tag:"multiselect-tag",tagDisabled:"is-disabled",tagRemove:"multiselect-tag-remove",tagRemoveIcon:"multiselect-tag-remove-icon",tagsSearchWrapper:"multiselect-tags-search-wrapper",tagsSearch:"multiselect-tags-search",tagsSearchCopy:"multiselect-tags-search-copy",placeholder:"multiselect-placeholder",caret:"multiselect-caret",caretOpen:"is-open",clear:"multiselect-clear",clearIcon:"multiselect-clear-icon",spinner:"multiselect-spinner",dropdown:"multiselect-dropdown",dropdownTop:"is-top",dropdownHidden:"is-hidden",options:"multiselect-options",optionsTop:"is-top",option:"multiselect-option",optionPointed:"is-pointed",optionSelected:"is-selected",optionDisabled:"is-disabled",optionSelectedPointed:"is-selected is-pointed",optionSelectedDisabled:"is-selected is-disabled",noOptions:"multiselect-no-options",noResults:"multiselect-no-results",fakeInput:"multiselect-fake-input",spacer:"multiselect-spacer"},r.classes.value);return{classList:e.computed((function(){return{container:[D.container].concat(i.value?D.containerDisabled:[]).concat(c.value&&"top"===o.value&&s.value?D.containerOpenTop:[]).concat(c.value&&"top"!==o.value&&s.value?D.containerOpen:[]).concat(f.value?D.containerActive:[]),spacer:D.spacer,singleLabel:D.singleLabel,multipleLabel:D.multipleLabel,search:D.search,tags:D.tags,tag:[D.tag].concat(i.value?D.tagDisabled:[]),tagRemove:D.tagRemove,tagRemoveIcon:D.tagRemoveIcon,tagsSearchWrapper:D.tagsSearchWrapper,tagsSearch:D.tagsSearch,tagsSearchCopy:D.tagsSearchCopy,placeholder:D.placeholder,caret:[D.caret].concat(c.value?D.caretOpen:[]),clear:D.clear,clearIcon:D.clearIcon,spinner:D.spinner,dropdown:[D.dropdown].concat("top"===o.value?D.dropdownTop:[]).concat(c.value&&s.value?[]:D.dropdownHidden),options:[D.options].concat("top"===o.value?D.optionsTop:[]),option:function(e){var t=[D.option];return v(e)?t.push(d(e)?D.optionSelectedPointed:D.optionPointed):d(e)?t.push(p(e)?D.optionSelectedDisabled:D.optionSelected):p(e)&&t.push(D.optionDisabled),t},noOptions:D.noOptions,noResults:D.noResults,fakeInput:D.fakeInput}}))}}function c(e,t,u,a,n,l,r,i,o,s){"boolean"!=typeof r&&(o=i,i=r,r=!1);var c,v="function"==typeof u?u.options:u;if(e&&e.render&&(v.render=e.render,v.staticRenderFns=e.staticRenderFns,v._compiled=!0,n&&(v.functional=!0)),a&&(v._scopeId=a),l?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,o(e)),e&&e._registeredComponents&&e._registeredComponents.add(l)},v._ssrRegister=c):t&&(c=r?function(e){t.call(this,s(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,i(e))}),c)if(v.functional){var d=v.render;v.render=function(e,t){return c.call(t),d(e,t)}}else{var p=v.beforeCreate;v.beforeCreate=p?[].concat(p,c):[c]}return u}const v={name:"Multiselect",emits:["open","close","select","deselect","input","search-change","tag","update:modelValue","change","clear"],props:{value:{required:!1},modelValue:{required:!1},options:{type:[Array,Object,Function],required:!1,default:()=>[]},id:{type:[String,Number],required:!1},name:{type:[String,Number],required:!1,default:"multiselect"},disabled:{type:Boolean,required:!1,default:!1},label:{type:String,required:!1,default:"label"},trackBy:{type:String,required:!1,default:"label"},valueProp:{type:String,required:!1,default:"value"},placeholder:{type:String,required:!1,default:null},mode:{type:String,required:!1,default:"single"},searchable:{type:Boolean,required:!1,default:!1},limit:{type:Number,required:!1,default:-1},hideSelected:{type:Boolean,required:!1,default:!0},createTag:{type:Boolean,required:!1,default:!1},appendNewTag:{type:Boolean,required:!1,default:!0},caret:{type:Boolean,required:!1,default:!0},loading:{type:Boolean,required:!1,default:!1},noOptionsText:{type:String,required:!1,default:"The list is empty"},noResultsText:{type:String,required:!1,default:"No results found"},multipleLabel:{type:Function,required:!1},object:{type:Boolean,required:!1,default:!1},delay:{type:Number,required:!1,default:-1},minChars:{type:Number,required:!1,default:0},resolveOnLoad:{type:Boolean,required:!1,default:!0},filterResults:{type:Boolean,required:!1,default:!0},clearOnSearch:{type:Boolean,required:!1,default:!1},clearOnSelect:{type:Boolean,required:!1,default:!0},canDeselect:{type:Boolean,required:!1,default:!0},canClear:{type:Boolean,required:!1,default:!0},max:{type:Number,required:!1,default:-1},showOptions:{type:Boolean,required:!1,default:!0},addTagOn:{type:Array,required:!1,default:()=>["enter"]},required:{type:Boolean,required:!1,default:!1},openDirection:{type:String,required:!1,default:"bottom"},nativeSupport:{type:Boolean,required:!1,default:!1},classes:{type:Object,required:!1,default:()=>({})},strict:{type:Boolean,required:!1,default:!0},closeOnSelect:{type:Boolean,required:!1,default:!0}},setup(u,a){const n=function(t,u){var a=e.toRefs(t),n=a.value,l=a.modelValue,r=a.mode,i=a.valueProp,o=e.ref("single"!==r.value?[]:{}),s=void 0!==u.expose?l:n,c=e.computed((function(){return"single"===r.value?o.value[i.value]:o.value.map((function(e){return e[i.value]}))})),v=e.computed((function(){return"single"!==r.value?o.value.map((function(e){return e[i.value]})).join(","):o.value[i.value]}));return{iv:o,internalValue:o,ev:s,externalValue:s,textValue:v,plainValue:c}}(u,a),r={pointer:e.ref(null)},i=function(t,u,a){var n=e.toRefs(t).disabled,l=e.ref(!1);return{isOpen:l,open:function(){l.value||n.value||(l.value=!0,u.emit("open"))},close:function(){l.value&&(l.value=!1,u.emit("close"))}}}(u,a),c=function(t,u,a){var n=e.ref(null),l=e.ref(null);return e.watch(n,(function(e){u.emit("search-change",e)})),{search:n,input:l,clearSearch:function(){n.value=""},handleSearchInput:function(e){n.value=e.target.value}}}(0,a),v=function(u,a,n){var l=e.toRefs(u),r=l.object,i=l.valueProp,o=l.mode,s=n.iv,c=function(e){return r.value||t(e)?e:Array.isArray(e)?e.map((function(e){return e[i.value]})):e[i.value]},v=function(e){return t(e)?"single"===o.value?{}:[]:e};return{update:function(e){s.value=v(e);var t=c(e);a.emit("change",t),a.emit("input",t),a.emit("update:modelValue",t)}}}(u,a,{iv:n.iv}),d=function(t,u,a){var n=e.toRefs(t),l=n.searchable,r=n.disabled,i=a.input,o=a.open,s=a.close,c=a.clearSearch,v=e.ref(null),d=e.ref(!1),p=e.computed((function(){return l.value||r.value?-1:0})),f=function(){l.value&&i.value.blur(),v.value.blur()},D=function(){d.value=!1,setTimeout((function(){d.value||(s(),c())}),1)};return{multiselect:v,tabindex:p,isActive:d,blur:f,handleFocus:function(){l.value&&!r.value&&i.value.focus()},activate:function(){r.value||(d.value=!0,o())},deactivate:D,handleCaretClick:function(){D(),f()}}}(u,0,{input:c.input,open:i.open,close:i.close,clearSearch:c.clearSearch}),p=o(u,a,{ev:n.ev,iv:n.iv,search:c.search,clearSearch:c.clearSearch,update:v.update,pointer:r.pointer,blur:d.blur,deactivate:d.deactivate}),f=function(t,u,a){var n=e.toRefs(t),l=n.valueProp,r=n.showOptions,i=n.searchable,o=a.fo,s=a.handleOptionClick,c=a.search,v=a.pointer,d=a.multiselect,p=e.computed((function(){return o.value.filter((function(e){return!0!==e.disabled}))})),f=function(e){void 0===e||null!==e&&e.disabled||(v.value=e)},D=function(){f(p.value[0]||null)},m=function(){f(null)},h=function(){var e=d.value.querySelector("[data-pointed]");if(e){var t=e.parentElement.parentElement;e.offsetTop+e.offsetHeight>t.clientHeight+t.scrollTop&&(t.scrollTop=e.offsetTop+e.offsetHeight-t.clientHeight),e.offsetTop<t.scrollTop&&(t.scrollTop=e.offsetTop)}};return e.watch(c,(function(e){i.value&&(e.length&&r.value?D():m())})),{pointer:v,isPointed:function(e){return!!v.value&&v.value[l.value]==e[l.value]},setPointer:f,setPointerFirst:D,clearPointer:m,selectPointer:function(){v.value&&!0!==v.value.disabled&&s(v.value)},forwardPointer:function(){if(null===v.value)f(p.value[0]||null);else{var t=p.value.map((function(e){return e[l.value]})).indexOf(v.value[l.value])+1;p.value.length<=t&&(t=0),f(p.value[t]||null)}e.nextTick((function(){h()}))},backwardPointer:function(){if(null===v.value)f(p.value[p.value.length-1]||null);else{var t=p.value.map((function(e){return e[l.value]})).indexOf(v.value[l.value])-1;t<0&&(t=p.value.length-1),f(p.value[t]||null)}e.nextTick((function(){h()}))}}}(u,0,{fo:p.fo,handleOptionClick:p.handleOptionClick,search:c.search,pointer:r.pointer,multiselect:d.multiselect}),D=function(t,u,a){var n=e.toRefs(t),r=n.mode,i=n.addTagOn,o=n.createTag,s=n.openDirection,c=n.searchable,v=n.showOptions,d=n.valueProp,p=a.iv,f=a.update,D=a.search,m=a.setPointer,h=a.selectPointer,g=a.backwardPointer,b=a.forwardPointer,y=a.blur,F=a.fo,C=function(){"tags"===r.value&&!v.value&&o.value&&c.value&&m(F.value[F.value.map((function(e){return e[d.value]})).indexOf(D.value)]),h()};return{handleKeydown:function(e){switch(e.keyCode){case 8:if("single"===r.value)return;if(c.value&&-1===[null,""].indexOf(D.value))return;if(0===p.value.length)return;f(l(p.value).slice(0,-1));break;case 13:if(e.preventDefault(),"tags"===r.value&&-1===i.value.indexOf("enter"))return;C();break;case 27:y();break;case 32:if("tags"!==r.value&&c.value)return;if("tags"===r.value&&-1===i.value.indexOf("space"))return;e.preventDefault(),C();break;case 38:if(e.preventDefault(),!v.value)return;"top"===s.value?b():g();break;case 40:if(e.preventDefault(),!v.value)return;"top"===s.value?g():b();break;case 186:if("tags"!==r.value)return;if(-1===i.value.indexOf(";")||!o.value)return;C(),e.preventDefault();break;case 188:if("tags"!==r.value)return;if(-1===i.value.indexOf(",")||!o.value)return;C(),e.preventDefault()}}}}(u,0,{iv:n.iv,update:v.update,search:c.search,setPointer:f.setPointer,selectPointer:f.selectPointer,backwardPointer:f.backwardPointer,forwardPointer:f.forwardPointer,blur:d.blur,fo:p.fo}),m=s(u,0,{isOpen:i.isOpen,isPointed:f.isPointed,isSelected:p.isSelected,isDisabled:p.isDisabled,isActive:d.isActive});return{...n,...i,...d,...r,...v,...c,...p,...f,...D,...m}}};var d=function(){var e=this,t=e.$createElement,u=e._self._c||t;return u("div",{ref:"multiselect",class:e.classList.container,attrs:{tabindex:e.tabindex,id:e.id},on:{focusin:e.activate,focusout:e.deactivate,keydown:e.handleKeydown,focus:e.handleFocus}},["tags"!==e.mode&&e.searchable&&!e.disabled?[u("input",{ref:"input",class:e.classList.search,attrs:{modelValue:e.search},domProps:{value:e.search},on:{input:e.handleSearchInput}})]:e._e(),e._v(" "),"tags"==e.mode?[u("div",{class:e.classList.tags},[e._l(e.iv,(function(t,a,n){return e._t("tag",[u("span",{key:n,class:e.classList.tag},[e._v("\n          "+e._s(t[e.label])+"\n          "),e.disabled?e._e():u("span",{class:e.classList.tagRemove,on:{mousedown:function(u){return u.preventDefault(),e.handleTagRemove(t,u)}}},[u("span",{class:e.classList.tagRemoveIcon})])])],{option:t,handleTagRemove:e.handleTagRemove,disabled:e.disabled})})),e._v(" "),u("div",{class:e.classList.tagsSearchWrapper},[u("span",{class:e.classList.tagsSearchCopy},[e._v(e._s(e.search))]),e._v(" "),e.searchable&&!e.disabled?u("input",{ref:"input",class:e.classList.tagsSearch,attrs:{modelValue:e.search},domProps:{value:e.search},on:{input:e.handleSearchInput}}):e._e()])],2)]:e._e(),e._v(" "),"single"==e.mode&&e.hasSelected&&!e.search&&e.iv?[e._t("singlelabel",[u("div",{class:e.classList.singleLabel},[e._v("\n        "+e._s(e.iv[e.label])+"\n      ")])],{value:e.iv})]:e._e(),e._v(" "),"multiple"==e.mode&&e.hasSelected&&!e.search?[e._t("multiplelabel",[u("div",{class:e.classList.multipleLabel},[e._v("\n        "+e._s(e.multipleLabelText)+"\n      ")])],{values:e.iv})]:e._e(),e._v(" "),!e.placeholder||e.hasSelected||e.search?e._e():[e._t("placeholder",[u("div",{class:e.classList.placeholder},[e._v("\n        "+e._s(e.placeholder)+"\n      ")])])],e._v(" "),e.busy?e._t("spinner",[u("span",{class:e.classList.spinner})]):e._e(),e._v(" "),e.hasSelected&&!e.disabled&&e.canClear&&!e.busy?e._t("clear",[u("span",{class:e.classList.clear,on:{mousedown:e.clear}},[u("span",{class:e.classList.clearIcon})])],{clear:e.clear}):e._e(),e._v(" "),e.caret?e._t("caret",[u("span",{class:e.classList.caret,on:{click:e.handleCaretClick}})]):e._e(),e._v(" "),u("div",{class:e.classList.dropdown,attrs:{tabindex:"-1"}},[e._t("beforelist",null,{options:e.fo}),e._v(" "),u("ul",{class:e.classList.options},e._l(e.fo,(function(t,a,n){return u("li",{key:n,class:e.classList.option(t),attrs:{"data-pointed":e.isPointed(t)},on:{mouseenter:function(u){return e.setPointer(t)},click:function(u){return e.handleOptionClick(t)}}},[e._t("option",[u("span",[e._v(e._s(t[e.label]))])],{option:t,search:e.search})],2)})),0),e._v(" "),e.noOptions?e._t("nooptions",[u("div",{class:e.classList.noOptions,domProps:{innerHTML:e._s(e.noOptionsText)}})]):e._e(),e._v(" "),e.noResults?e._t("noresults",[u("div",{class:e.classList.noResults,domProps:{innerHTML:e._s(e.noResultsText)}})]):e._e(),e._v(" "),e._t("afterlist",null,{options:e.fo})],2),e._v(" "),e.required?u("input",{class:e.classList.fakeInput,attrs:{tabindex:"-1",required:""},domProps:{value:e.textValue}}):e._e(),e._v(" "),e.nativeSupport?["single"==e.mode?u("input",{attrs:{type:"hidden",name:e.name},domProps:{value:void 0!==e.plainValue?e.plainValue:""}}):e._l(e.plainValue,(function(t,a){return u("input",{key:a,attrs:{type:"hidden",name:e.name+"[]"},domProps:{value:t}})}))]:e._e(),e._v(" "),u("div",{class:e.classList.spacer})],2)};d._withStripped=!0;return c({render:d,staticRenderFns:[]},undefined,v,undefined,false,undefined,!1,void 0,void 0,void 0)}(VueCompositionAPI);
