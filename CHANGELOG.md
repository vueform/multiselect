## v2.6.1

> `2023-03-14`

### 🐞 Bug Fixes
  - Use `.mjs` for `import`.

## v2.6.0

> `2023-03-11`

### 🎉 Feature
  - All texts including, option & group labels can now be provided in multiple languages. Added `locale` and `fallbackLocale` props.
  - Added `searchFilter` prop that allow to provide a custom search algorithm #313.
  - Added `allowAbsent` option to allow adding values that are not among the options.
  - Added `closeOnDeselect` prop.
  - Deprecated `option` event, added `create` instead (`option` still works).
  - Tags that added can also be disabled, which will prevent their removal.

### 🐞 Bug Fixes
  - Fix for new option display when using `groups`, `createOption` and `tags` #254 #291.
  - String pointer equality #316.
  - Disabled tags will not be removed on backspace #318.
  - Added `.mjs` extension build and referenced `module` to that #290 #258.
  - The `selectAll()` now does not select disabled options and does not duplicate already selected options.

## v2.5.8

> `2022-12-21`

### 🎉 Feature
  - Added `--ms-border-width-active` and `--ms-border-color-active` CSS vars #213.
  - Added `@max` event #269.
  - Added `clearOnBlur` option #251.

### 🐞 Bug Fixes
  - Removed `max-height` duplicate from default theme #240.
  - Norwegian chars fix #243.
  - Trigger `@change` event on updating external value #259.
  - Docs fix for 2.7 installation instructions #294.
  - Docs fix fiddle url.
  - Tags dropdown focus fix #286 #300.
  - Stop propagation on tag remove click #295.

## v2.5.7

> `2022-11-21`

### 🎉 Feature
  - **BREAKING**: added a wrapper `div` and related classes inside the main container next to the dropdown container.
  - Accessibility improvements.

### 🐞 Bug Fixes
  - Don't select new tag on IME enter #226.
  - Removed `v-html` from option & single label for XSS security #278.
  - Arrow left should not throw error when not using tags #271.

## v2.5.6

> `2022-09-28`

### 🐞 Bug Fixes
  - Async options resolve fix [#266](https://github.com/vueform/multiselect/issues/266).

## v2.5.5

> `2022-09-26`

### 🎉 Feature
  - Unnecessary ES6 feature removed.

## v2.5.4

> `2022-09-26`

### 🎉 Feature
  - A11y improvements.

## v2.5.3

> `2022-09-22`

### 🎉 Feature
  - A11y improvements.

## v2.5.2

> `2022-07-22`

### 🐞 Bug Fixes
  - Fix for `tailwind.css`.

## v2.5.1

> `2022-07-11`

### 🎉 Feature
  - Vue `2.7` compatibility.

## v2.5.0

> `2022-07-11`

### 🎉 Feature
  - Vue `2.7` compatibility.

## v2.4.2

> `2022-05-31`

### 🐞 Bug Fixes
  - Hotfix for ES6 [#235](https://github.com/vueform/multiselect/issues/235)
  - 
## v2.4.1

> `2022-05-31`

### 🐞 Bug Fixes
  - Hotfix for SSR [#235](https://github.com/vueform/multiselect/issues/235)

## v2.4.0

> `2022-05-30`

### 🎉 Feature
  - 🎉 Added accessibility (a11y) support [#22](https://github.com/vueform/multiselect/issues/22), [#179](https://github.com/vueform/multiselect/issues/179).
  - 🎉 Added infinite scroll [#76](https://github.com/vueform/multiselect/issues/76), [#165](https://github.com/vueform/multiselect/issues/165), [#198](https://github.com/vueform/multiselect/issues/198).
  - 🎉 Added RTL support [#206](https://github.com/vueform/multiselect/issues/206).
  - 🎉 Close on click if opened [#162](https://github.com/vueform/multiselect/issues/162).
  - Added `id` to input when searchable.
  - Re-open input on arrows & search type if closed.
  - Close dropdown instead of blur on select.
  - Added `regex` option [#138](https://github.com/vueform/multiselect/issues/138).
  - Scroll to first selected on open [#168](https://github.com/vueform/multiselect/issues/168).
  - Options are not reversed when `openPosition: true`.
  - Added `reverse` option.
  - Added `searchStart` option [#169](https://github.com/vueform/multiselect/issues/169).
  - Added `disabledProp` option [#202](https://github.com/vueform/multiselect/issues/202).
  - Added `onCreate` option [#204](https://github.com/vueform/multiselect/issues/204).
  - Added `select$` as second param to events and async options.
  - Added `isSelected` & `isPointed` to `option` slot scope [#195](https://github.com/vueform/multiselect/issues/195).

### 🐞 Bug Fixes
  - Headless UI conflict resolved [#182](https://github.com/vueform/multiselect/issues/182).
  - Keep selected options when async [#228](https://github.com/vueform/multiselect/issues/228).
  - Show spinner even when not active [#223](https://github.com/vueform/multiselect/issues/223).
  - Allow `false` value [#222](https://github.com/vueform/multiselect/issues/222).
  - Resolve options on `minChars: 0` too [#230](https://github.com/vueform/multiselect/issues/230).
  - Added `keyup`, `keydown` events.
  - Resolved number tag creation duplicate bug.
  - Input height fix when `searchable` for FF.
  - CSS: moved max height to dropdown container from wrapper.
  - Vite & Nuxt 3 build warn fixes.).

## v2.3.4

> `2022-05-11`

### 🎉 Feature
  - Async options change detectiion.
  - Label prop change detection.
  - Option & label texts can contain HTML.

## v2.3.3

> `2022-02-26`

### 🎉 Feature
  - Added `attrs` prop.

## v2.3.2

> `2022-02-06`

### 🐞 Bug Fixes
  - Removed `@apply` from default theme.

## v2.3.1

> `2021-12-16`

### 🐞 Bug Fixes
  - Removed `exports` from `package.json` [#178](https://github.com/vueform/multiselect/issues/178).

## v2.3.0

> `2021-12-16`

### 🎉 Feature
  - **Deprecated:** `appendNewTag`, `createTag`, `addTagOn` props and `@tag` event.
  - Added `appendNewOption`, `createOption`, `addOptionOn` props and `@option` event [#150](https://github.com/vueform/multiselect/issues/150).
  - Added `selectAll` method [#172](https://github.com/vueform/multiselect/issues/172).
  - The `trackBy` prop now defaults to `label` [#175](https://github.com/vueform/multiselect/issues/175).
  - Replaces focus on search when an option is selected [#163](https://github.com/vueform/multiselect/issues/163).
  - Added `<span>` wrapper for single label with `singleLabelText` class key [#157](https://github.com/vueform/multiselect/issues/157).

### 🐞 Bug Fixes
  - Don't show spinner when not active [#156](https://github.com/vueform/multiselect/issues/156).
  - Tailwind CSS 3 compatibility issue fix [#176](https://github.com/vueform/multiselect/issues/176).
  - Don't show caret when `showOptions` are disabled [#173](https://github.com/vueform/multiselect/issues/173).
  - Resolved headless UI modal click issue [#148](https://github.com/vueform/multiselect/issues/148).
  - Resolved Tailwind CSS/form ring issue [#135](https://github.com/vueform/multiselect/issues/135).
  - Made classes reactive [#126](https://github.com/vueform/multiselect/issues/126).
  - The `addTagOn` prop uses `key` instead of `keyCode` internally [#125](https://github.com/vueform/multiselect/issues/125).

## v2.2.1

> `2021-11-23`

### 🐞 Bug Fixes
  - Added missing CSS vars.

## v2.2.0

> `2021-09-09`

### 🎉 Feature
  - 🎉🎉 Added `groups` and related props which allow groupping options. 🎉🎉
  - Added `tailwind.scss` theme to use instead of `classes` if needed.
  - Added support for case sensitive tags when `createTag` is `true` [#119](https://github.com/vueform/multiselect/issues/119).
  - Added `inputType` prop [#108](https://github.com/vueform/multiselect/issues/116), [#116](https://github.com/vueform/multiselect/issues/116).
  - Added `@paste` event [#105](https://github.com/vueform/multiselect/issues/105).
  - Added `tab` as option for `addTagOn` [#117](https://github.com/vueform/multiselect/issues/117).
  - Updated default `max-height` for dropdown (to `15rem`).

### 🐞 Bug Fixes
  - When `closeOnSelect` is `true` in `searchable` `tags` and `multiple` mode the input now blurs upon selecting an option.
  - Fix for empty dropdown when async options are loading [#115](https://github.com/vueform/multiselect/issues/115).
  - Fixed dropdown auto-scrolling when using arrows.

## v2.1.2

> `2021-08-09`

### 🐞 Bug Fixes
  - Removed async/await.

## v2.1.1

> `2021-08-09`

### 🎉 Feature
  - Added `closeOnSelect` prop.

### 🐞 Bug Fixes
  - Clear search on single option select [#99](https://github.com/vueform/multiselect/issues/99) and [#106](https://github.com/vueform/multiselect/issues/106).
  - No blur when tags are being removed.


## v2.1.0

> `2021-07-26`

### 🎉 Feature
  - **BREAKING**: `dropdown` class now has `dropdownHidden` when it is closed instead of using `v-show` (requires using 2.1.0's `themes/default.css`)
  - **BREAKING**: removed `:maxHeight` prop. Use `var(--ms-max-height)` instead.
  - **BREAKING**: tags search layout has changed -> added a wrapper div and an extra span to calculate input width.
  - Dropddown can be closed on caret click [#88](https://github.com/vueform/multiselect/issues/88).
  - Added `:strict` prop to achieve accent-free search [#82](https://github.com/vueform/multiselect/issues/82).
  - Removed inline styles, CSP compilance [#84](https://github.com/vueform/multiselect/issues/84).
  - Background images are now customizable via `background-color` [#85](https://github.com/vueform/multiselect/issues/85).
  
### 🐞 Bug Fixes
  - Free typed tags fix [#96](https://github.com/vueform/multiselect/issues/96).
  - Tabindex becomes `-1` when `:disabled`.

## v2.0.1

> `2021-06-27`

### 🎉 Feature
  - Classname fixes.
  - Readme update.

## v2.0.0

> `2021-06-20`

### 🎉 Feature
  - **BREAKING**: Completely rewritten `<template>` and `default.css`.
  - Caret is now always displayed when `caret: true` regardless if the multiselect has selected option(s).
  - Added `canDeselect` and `classes` prop.
  - Added `;` and `,` options to `addTagOn` prop.
  
## v1.5.0

> `2021-05-17`

### 🎉 Feature
  - Added native input support [#48](https://github.com/vueform/multiselect/issues/48).
  - Added `openDirection` prop [#52](https://github.com/vueform/multiselect/issues/52).
  - Added `option` as second param for `select` and `deselect` events.
  - Added `@clear` event [#68](https://github.com/vueform/multiselect/issues/68).

### 🐞 Bug Fixes
  - Clear icon CSS fix.
  - Fixed unintendeed clear button showing up when `canDeselect` is `false` [#61](https://github.com/vueform/multiselect/issues/61).

## v1.4.0

> `2021-04-06`

### 🎉 Feature
  - **BREAKING**: array `options` are no longer treated as objects, but both option value and label will equal to array item value. Eg. `option: ['v1','v2']` used to be equal to `{0: 'v1', 1: 'v2'}`, now they're equal to `{v1: 'v1', v2: 'v2'}`.
  - Optimized variable names for lower package size.

## v1.3.7

> `2021-04-06`

### 🐞 Bug Fixes
  - Async options fix for [#39](https://github.com/vueform/multiselect/issues/39). Refreshing non-async options now will only be reflected after a tick.

### 🎉 Feature
  - Added caret, remove and spinner slots.

## v1.3.6

> `2021-03-30`

### 🐞 Bug Fixes
  - Remove extra space when creating a tag with space ([#46](https://github.com/vueform/multiselect/issues/46)).
  - Fixed issues around refreshing async options ([#45](https://github.com/vueform/multiselect/issues/45)).
  - Android keyboard fix ([#49](https://github.com/vueform/multiselect/issues/49) & [#50](https://github.com/vueform/multiselect/issues/50)).

### 🎉 Feature
  - Added installation guide for Nuxt.js.

## v1.3.5

> `2021-03-20`

### 🐞 Bug Fixes
  - Fix for unintended side effect on space when using single mode ([#42](https://github.com/vueform/multiselect/issues/42)).

## v1.3.4

> `2021-03-13`

### 🐞 Bug Fixes
  - Recursion error when accessing `value` inside computed `options` ([#39](https://github.com/vueform/multiselect/issues/39)).
  - Set initial value when options are loaded later ([#40](https://github.com/vueform/multiselect/issues/40)).

## v1.3.3

> `2021-03-12`

### 🐞 Bug Fixes
  - Selected items' label update when options label change ([#39](https://github.com/vueform/multiselect/issues/39)).
  - Horizontal scroll fix ([#31](https://github.com/vueform/multiselect/issues/31)).

### 🎉 Feature
  - Added `addTagOn` that can enable `enter` and/or `space` key to create a tag.
  - Added `required` prop that renders a HTML5 required attribute on a fake input next to multiselect.
  - Added `showOptions` prop that hide options list if somebody wants to have only a free-type tag list.

## v1.3.2

> `2021-02-05`

### 🐞 Bug Fixes
  - Tags slots scope updated with `handleTagRemove` instead of `remove`.

## v1.3.1

> `2021-02-05`

### 🐞 Bug Fixes
  - Readme API fix.

## v1.3.0

> `2021-02-05`

### 🎉 Feature
  - Added Typescript definitions based on [#20](https://github.com/vueform/multiselect/pull/20).
  - Added Clear button for `multiple` and `tags` mode.
  - Added `placeholder` slot.
  - Added proper `open` and `close` methods.
  - Hide options when resolving with `clearOnSearch` `true`.
  - Added `refreshOptions` method to refresh async options.
  - Added API docs.

### 🐞 Bug Fixes
  - Added fix for #26. The value now can be set the same time that `options` change.
  - Added fix for #28. Right mouse click no longer removes tag.
  - Added fix for #29. Focus is no longer trapped to option list when using search.

## v1.2.5

> `2021-01-17`

### 🐞 Bug Fixes
  - Close open dropdown on input click
  - Select first option after async search fix #18
  - Update options when `:options` property changes #16 #17

## v1.2.4

> `2021-01-12`

### 🎉 Feature
  - Added `:max` property

### 🐞 Bug Fixes
  - Backspace issue fix #9
  - Custom label issue fix #13

## v1.2.3

> `2020-12-29`

### 🐞 Bug Fixes
  - `v-model` deep sync

## v1.2.2

> `2020-12-28`

### 🎉 Feature
  - Added `canDeselect` option

### 🐞 Bug Fixes
  - Set internalValue on init when using async options with `:object` `true` and `resolveOnLoad` `false`

## v1.2.1

> `2020-12-23`

### 🐞 Bug Fixes
  - Changes in `v-model` will sync with multiselect value

## v1.2.0

> `2020-12-23`

### 🎉 Feature
  - Options now can be disabled using an array of objects as options, with `disabled` property being set to `true`
  - The `value` property of an object option now can be customized with `:valueProp`

## v1.1.3

> `2020-12-19`

### 🐞 Bug Fixes
  - **Breaking**: Renamed slots to lowercase instead of camel case because of [DOM issue](https://github.com/vuejs/vue/issues/9449#issuecomment-461170017)

### 🎉 Feature
  - Added `change` event
  - **Breaking**: renamed `hideSelectedTag` to `hideSelected` 

## v1.1.2

> `2020-12-19`

### 🎉 Feature
  - Async/await eliminated from code thus reducing bundle size without runtimeRegenerator
  - UMD bundle replaced with global

## v1.1.1

> `2020-12-19`

### 🐞 Bug Fixes
  - RuntimeRegenerator added to esm builds

## v1.1.0

> `2020-12-18`

### 🎉 Feature
  - Options now can be defined as a sync or async function. This opens up the capabilities to load options from remote data source and/or to implement autocomplete behaviour.
