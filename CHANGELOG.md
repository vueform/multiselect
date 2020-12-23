## v1.2.0

> `2020-12-23`

### 🎉 Feature
  - Options now can be disabled using an array of objects as value, with `disabled` property being set to `true`
  - The `value` property of an object option now can be customized with `:valueProp`

## v1.1.3

> `2020-12-18`

### 🐞 Bug Fixes
  - **Breaking**: Renamed slots to lowercase instead of camel case because of [DOM issue](https://github.com/vuejs/vue/issues/9449#issuecomment-461170017)

### 🎉 Feature
  - Added `change` event
  - **Breaking**: renamed `hideSelectedTag` to `hideSelected` 

## v1.1.2

> `2020-12-18`

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
