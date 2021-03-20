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
