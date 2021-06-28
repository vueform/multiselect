<div align="center">

  <a href="https://www.npmjs.com/package/@vueform/multiselect" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/dm/@vueform/multiselect?color=%2353ca2f">
  </a>

  <img alt="CircleCI" src="https://img.shields.io/circleci/build/github/vueform/multiselect">

  <a href="https://codecov.io/gh/vueform/multiselect" target="_blank">
    <img src="https://img.shields.io/codecov/c/github/vueform/multiselect"/>
  </a>

  <a href="https://www.npmjs.com/package/@vueform/multiselect" target="_blank">
    <img alt="npm bundle size (scoped version)" src="https://img.shields.io/bundlephobia/minzip/@vueform/multiselect?color=53ca2f">
  </a>

  <a href="https://discord.gg/WhX2nG6GTQ" target="_blank">
    <img alt="Discord" src="https://img.shields.io/discord/787237947635793940">
  </a>

  <a href="https://www.npmjs.com/package/@vueform/multiselect" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/v/@vueform/multiselect">
  </a>

  <h1>Vue 3 Multiselect</h1>
  
  <a href="https://vueform.com?ref=github" target="_blank">
    <br>
    <img align="center" src="https://github.com/vueform/multiselect/raw/main/assets/logo.svg" width="110">
    <br>
  </a>

  <br>
  <br>

  <a href="https://www.npmjs.com/package/@vueform/multiselect" target="_blank">
    <img align="center" src="https://github.com/vueform/multiselect/raw/main/assets/screenshot-1.png">
  </a>
  <br>

</div>

## Sponsors

<div align="center"><br>
  <a href="https://vueform.com?ref=github"><img src="https://github.com/vueform/multiselect/raw/main/assets/logo-horizontal.svg" width="200"></a>
</div>

## Other libraries

* [@vueform/slider](https://github.com/vueform/slider) - Vue 3 slider component with multihandles, tooltips merging and formatting.
* [@vueform/toggle](https://github.com/vueform/toggle) - Vue 3 toggle component with labels, custom slots and styling options.

## Multiselect features

* Vue 2 & 3 support
* No dependencies
* 100% coverage
* TypeScript support
* ESM support
* Single select options
* Multiple select options
* Tags
* Async options
* Search & filtering
* Custom slots
* Events
* CSS vars support
* Tailwind & utility class support
* Fully configurable

## Demo

Check out our <a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">demo</a>.

## Installation

```
npm install @vueform/multiselect
```

## Using with Vue 3

``` vue
<template>
  <div>
    <Multiselect
      v-model="value"
      :options="options"
    />
  </div>
</template>

<script>
  import Multiselect from '@vueform/multiselect'

  export default {
    components: {
      Multiselect,
    },
    data() {
      return {
        value: null,
        options: [
          'Batman',
          'Robin',
          'Joker',
        ]
      }
    }
  }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
```

## Using with Vue 2

When using Vue 2 install [@vue/composition-api](https://github.com/vuejs/composition-api#npm) via npm/yarn first:

``` bash
npm i @vue/composition-api --save-dev
```

Then install the plugin for Vue:

``` js
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)
```

After that make sure to change the imported Multiselect module to:

``` js
import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js'
```

## Using with Nuxt.js

First you need install [@nuxtjs/composition-api](https://composition-api.nuxtjs.org/getting-started/setup):

``` bash
npm i @nuxtjs/composition-api --save-dev
```

Then you need to enable it as a module in `nuxt.config.js`:

``` js
{
  buildModules: [
    '@nuxtjs/composition-api'
  ]
}
```

After that make sure to change the imported module to Vue 2 version of Multiselect, as Nuxt.js still depends on that:

``` js
import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js'
```

## Styling with CSS vars

The following CSS variables can be used to customize multiselect when using `default.css`:

``` css
--ms-font-size: 1rem;
--ms-line-height: 1.375;
--ms-bg: #FFFFFF;
--ms-bg-disabled: #F3F4F6;
--ms-border-color: #D1D5DB;
--ms-border-width: 1px;
--ms-radius: 4px;
--ms-py: 0.5rem;
--ms-px: 0.875rem;
--ms-ring-width: 3px;
--ms-ring-color: #10B98130;
--ms-placeholder-color: #9CA3AF;
  
--ms-tag-font-size: 0.875rem;
--ms-tag-line-height: 1.25rem;
--ms-tag-font-weight: 600;
--ms-tag-bg: #10B981;
--ms-tag-bg-disabled: #9CA3AF;
--ms-tag-color: #FFFFFF;
--ms-tag-color-disabled: #FFFFFF;
--ms-tag-radius: 4px;
--ms-tag-py: 0.125rem;
--ms-tag-px: 0.5rem;
--ms-tag-my: 0.25rem;
--ms-tag-mx: 0.25rem;

--ms-tag-remove-radius: 4px;
--ms-tag-remove-py: 0.25rem;
--ms-tag-remove-px: 0.25rem;
--ms-tag-remove-my: 0rem;
--ms-tag-remove-mx: 0.125rem;

--ms-dropdown-bg: #FFFFFF;
--ms-dropdown-border-color: #D1D5DB;
--ms-dropdown-border-width: 1px;
--ms-dropdown-radius: 4px;

--ms-option-font-size: 1rem;
--ms-option-line-height: 1.375;
--ms-option-bg-pointed: #FFFFFF;
--ms-option-bg-selected: #10B981;
--ms-option-bg-disabled: #FFFFFF;
--ms-option-bg-selected-pointed: #26C08E;
--ms-option-bg-selected-disabled: #FFFFFF;
--ms-option-color-pointed: #1F2937;
--ms-option-color-selected: #FFFFFF;
--ms-option-color-disabled: #D1D5DB;
--ms-option-color-selected-pointed: #FFFFFF;
--ms-option-color-selected-disabled: #D1FAE5;
--ms-option-py: 0.5rem;
--ms-option-px: 0.75rem;

--ms-empty-color: #4B5563;
```

Override them globally:

``` css
:root {
  --ms-tag-bg: #059669;
  --ms-tag-color: #D1FAE5;
  --ms-tag-radius: 9999px;
  --ms-tag-font-weight: 400;
}
```

Or on an instance level:

``` vue
<Multiselect
  v-model="value"
  :options="options"
  class="multiselect-green"
/>

<Multiselect
  v-model="value"
  :options="options"
  class="multiselect-blue"
/>
```

``` css
.multiselect-green {
  --ms-tag-bg: #D1FAE5;
  --ms-tag-color: #059669;
}

.multiselect-blue {
  --ms-tag-bg: #DBEAFE;
  --ms-tag-color: #2563EB;
}
```

## Styling with Tailwind CSS

The `Multiselect` component accepts a `classes` property which allows to override default class names. When using utility classes you don't need to import `default.css`. Here's a default styling for Tailwind CSS:

``` vue
<Multiselect v-model="value" :options="options" :classes="{
  container: 'relative mx-auto w-full flex items-center justify-end box-border cursor-pointer border border-gray-300 rounded bg-white text-base leading-snug outline-none',
  containerDisabled: 'cursor-default bg-gray-100',
  containerOpen: 'rounded-b-none',
  containerOpenTop: 'rounded-t-none',
  containerActive: 'ring ring-green-500 ring-opacity-30',
  singleLabel: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5',
  multipleLabel: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5',
  search: 'w-full absolute inset-0 outline-none appearance-none box-border border-0 text-base font-sans bg-white rounded pl-3.5',
  tags: 'flex-grow flex-shrink flex flex-wrap mt-1 pl-2',
  tag: 'bg-green-500 text-white text-sm font-semibold py-0.5 pl-2 rounded mr-1 mb-1 flex items-center whitespace-nowrap',
  tagDisabled: 'pr-2 !bg-gray-400 text-white',
  tagRemove: 'flex items-center justify-center p-1 mx-0.5 rounded-sm hover:bg-black hover:bg-opacity-10 group',
  tagRemoveIcon: 'bg-multiselect-remove bg-center bg-no-repeat opacity-30 inline-block w-3 h-3 group-hover:opacity-60',
  tagsSearch: 'h-full border-0 outline-none appearance-none p-0 text-base font-sans mx-1 mb-1 box-border flex-grow flex-shrink',
  placeholder: 'flex items-center h-full absolute left-0 top-0 pointer-events-none bg-transparent leading-snug pl-3.5 text-gray-400',
  caret: 'bg-multiselect-caret bg-center bg-no-repeat w-2.5 h-4 py-px box-content mr-3.5 relative z-10 opacity-40 flex-shrink-0 flex-grow-0 transition-transform transform',
  caretOpen: 'rotate-180',
  clear: 'pr-3.5 relative z-10 opacity-40 transition duration-300 flex-shrink-0 flex-grow-0 flex hover:opacity-80',
  clearIcon: 'bg-multiselect-remove bg-center bg-no-repeat w-2.5 h-4 py-px box-content inline-block',
  spinner: 'bg-multiselect-spinner bg-center bg-no-repeat w-4 h-4 z-10 mr-3.5 animate-spin flex-shrink-0 flex-grow-0',
  dropdown: 'absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b',
  dropdownTop: '-translate-y-full top-px bottom-auto flex-col-reverse rounded-b-none rounded-t',
  options: 'flex flex-col p-0 m-0 list-none',
  optionsTop: 'flex-col-reverse',
  option: 'flex items-center justify-start box-border text-left cursor-pointer text-base leading-snug py-2 px-3',
  optionPointed: 'text-gray-800 bg-gray-100',
  optionSelected: 'text-white bg-green-500',
  optionDisabled: 'text-gray-300 cursor-not-allowed',
  optionSelectedPointed: 'text-white bg-green-500 opacity-90',
  optionSelectedDisabled: 'text-green-100 bg-green-500 bg-opacity-50 cursor-not-allowed',
  noOptions: 'py-2 px-3 text-gray-600 bg-white',
  noResults: 'py-2 px-3 text-gray-600 bg-white',
  fakeInput: 'bg-transparent absolute left-0 right-0 -bottom-px w-full h-px border-0 p-0 appearance-none outline-none text-transparent',
  spacer: 'h-9 py-px box-content',
}" />
```

Certain classes has different states which are merged to the base class when the state is active. For exmple `dropdown` will be merged with `dropdownTop` when `open-direction: 'top'` resulting in the following classes:
```absolute -left-px -right-px bottom-0 transform translate-y-full border border-gray-300 -mt-px overflow-y-scroll z-50 bg-white flex flex-col rounded-b -translate-y-full top-px bottom-auto flex-col-reverse rounded-b-none rounded-t```

The same is true for `container`, `tag`, `options` and `option` classes.

In case you need to override the same type of utility you might use [@neojp/tailwind-important-variant](https://www.npmjs.com/package/@neojp/tailwindcss-important-variant) and use eg. `bg-green-500!`.

You also need to add custom background images to your `tailwind.config.js`:

``` js
const svgToDataUri = require('mini-svg-data-uri')

module.exports = {
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'multiselect-caret': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>`,
        )}")`,
        'multiselect-spinner': `url("${svgToDataUri(
          `<svg viewBox="0 0 512 512" fill="${theme('colors.green.500')}" xmlns="http://www.w3.org/2000/svg"><path d="M456.433 371.72l-27.79-16.045c-7.192-4.152-10.052-13.136-6.487-20.636 25.82-54.328 23.566-118.602-6.768-171.03-30.265-52.529-84.802-86.621-144.76-91.424C262.35 71.922 256 64.953 256 56.649V24.56c0-9.31 7.916-16.609 17.204-15.96 81.795 5.717 156.412 51.902 197.611 123.408 41.301 71.385 43.99 159.096 8.042 232.792-4.082 8.369-14.361 11.575-22.424 6.92z"></path></svg>`,
        )}")`,
        'multiselect-remove': `url("${svgToDataUri(
          `<svg viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>`,
        )}")`,
      })
    },
  }
}

```

## Support

Join our [Discord channel](https://discord.gg/WhX2nG6GTQ) or [open an issue](https://github.com/vueform/multiselect/issues).

## Basic props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **mode** | `string` | `single` | Possible values: `single\|multiple\|tags`. |
| **options** | `array\|object\|function` | `[]` | List of options. Can be:<br>- an array (eg. `[1,2,3]`)<br>- an object (eg. `{a:1,b:2,c:3}`)<br>- an array of objects `[{value:1,label:'v1'},{value:2,label:'v2'},{value:3,label:'v3',disabled:true}]`<br>- a function returning a Promise (async function) with `query` input param. The promise should return options as an **object** or as an **array of objects**.<br>When an array of objects is provided it **must** have properties that equal to `:valueProp`'s, `:trackBy`'s and `:label`'s value. |
| **required** | `boolean` | `false` | Whether the HTML5 required attribute should be used for multiselect (using an invisible fake input). |
| **searchable** | `boolean` | `false` | Whether the options should be searchable. |
| **valueProp** | `string` | `'value'` | If you provide an array of objects as options this property should be used as the value of the option. |
| **trackBy** | `string` | `'label'` | The name of the property that should be searched when `searchable` is `true` and an array of objects are provided as `:options`. |
| **label** | `string` | `'label'` | If you provide an array of objects as options the value this property will be displayed as selected option. |
| **placeholder** | `string` | `null` | The text that should be displayed before any option is selected. |
| **multipleLabel** | `function` |  | A function that returns the label to be displayed for selected options when using `multiple` mode. It receives `value` as an argument. By default it renders `1 option selected` and `[n] options selected` based on `value` length. |
| **disabled** | `boolean` | `false` | Whether the input should be disabled for the user (API can still be used programmatically). |
| **max** | `number` | `-1` | The maximum number of options that **can be selected** when using `multiple` or `tags` mode. If `-1` the number of options won't be limited. |
| **limit** | `number` | `-1` | The maximum number of options that **should be displayed**. If `-1` the number of options won't be limited. |
| **loading** | `boolean` | `false` | Whether a loading spinner should be shown. |
| **id** | `string` | `'multiselect'` | The `id` of the multiselect container DOM. |
| **caret** | `boolean` | `true` | Whether should display the caret symbol on the right. |
| **maxHeight** | `string` | `10rem` | The maximum height of options list. |
| **noOptionsText** | `string` | `'The list is empty'` | The text that should be displayed when options list is empty. |
| **noResultsText** | `string` | `'No results found'` | The text that should be displayed when there are no search results. |
| **openDirection** | `string` | `bottom` | Whether the option list should be displayed above or below the multiselect. Possible values: `top\|bottom` |
| **classes** | `object` | | An object of class names that gets merged with the default values. Default: `{`<br>&nbsp;&nbsp;`container: 'multiselect',`<br>&nbsp;&nbsp;`containerDisabled: 'is-disabled',`<br>&nbsp;&nbsp;`containerOpen: 'is-open',`<br>&nbsp;&nbsp;`containerOpenTop: 'is-open-top',`<br>&nbsp;&nbsp;`containerActive: 'is-active',`<br>&nbsp;&nbsp;`singleLabel: 'multiselect-single-label',`<br>&nbsp;&nbsp;`multipleLabel: 'multiselect-multiple-label',`<br>&nbsp;&nbsp;`search: 'multiselect-search',`<br>&nbsp;&nbsp;`tags: 'multiselect-tags',`<br>&nbsp;&nbsp;`tag: 'multiselect-tag',`<br>&nbsp;&nbsp;`tagDisabled: 'is-disabled',`<br>&nbsp;&nbsp;`tagRemove: 'multiselect-tag-remove',`<br>&nbsp;&nbsp;`tagRemoveIcon: 'multiselect-tag-remove-icon',`<br>&nbsp;&nbsp;`tagsSearch: 'multiselect-tags-search',`<br>&nbsp;&nbsp;`placeholder: 'multiselect-placeholder',`<br>&nbsp;&nbsp;`caret: 'multiselect-caret',`<br>&nbsp;&nbsp;`caretOpen: 'is-open',`<br>&nbsp;&nbsp;`clear: 'multiselect-clear',`<br>&nbsp;&nbsp;`clearIcon: 'multiselect-clear-icon',`<br>&nbsp;&nbsp;`spinner: 'multiselect-spinner',`<br>&nbsp;&nbsp;`dropdown: 'multiselect-dropdown',`<br>&nbsp;&nbsp;`dropdownTop: 'is-top',`<br>&nbsp;&nbsp;`options: 'multiselect-options',`<br>&nbsp;&nbsp;`optionsTop: 'is-top',`<br>&nbsp;&nbsp;`option: 'multiselect-option',`<br>&nbsp;&nbsp;`optionPointed: 'is-pointed',`<br>&nbsp;&nbsp;`optionSelected: 'is-selected',`<br>&nbsp;&nbsp;`optionDisabled: 'is-disabled',`<br>&nbsp;&nbsp;`optionSelectedPointed: 'is-selected is-pointed',`<br>&nbsp;&nbsp;`optionSelectedDisabled: 'is-selected is-disabled',`<br>&nbsp;&nbsp;`noOptions: 'multiselect-no-options',`<br>&nbsp;&nbsp;`noResults: 'multiselect-no-results',`<br>&nbsp;&nbsp;`fakeInput: 'multiselect-fake-input',`<br>&nbsp;&nbsp;`spacer: 'multiselect-spacer'`<br>`}` |

### Advanced Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **canDeselect** | `boolean` | `true` | Whether a selected option can be deselected when using `single` mode. |
| **canClear** | `boolean` | `true` | Whether option(s) can be cleared. |
| **clearOnSearch** | `boolean` | `false` | Whether the option list should be cleared when a new character is typed before loading new options list, when using async options. |
| **clearOnSelect** | `boolean` | `true` | Whether the option list should be cleared upon selecting an option when using async options. |
| **delay** | `number` | `-1` | The delay in milliseconds that should occur between the last typed character and refreshing an async option list. If `-1` the option list will not refresh when the search query changes. If `0` it will refresh without delay. |
| **filterResults** | `boolean` | `true` | Whether option list should be filtered by search query. This may be set to `false` if you are handling filtering manually when returning async options. |
| **minChars** | `number` | `0` | The minimum number of characters that should be typed to refresh async option list. If `0` it will refresh even when the search field becomes empty. |
| **resolveOnLoad** | `boolean` | `true` | Whether async options should be loaded initially (with an empty query). This should be `true` if you are planning to load non-object value(s) initially while using async options (to fetch matching objects for values). |
| **appendNewTag** | `boolean` | `true` | Whether it should append new tag automatically to option list when using `tags` mode with `createTag`. If set to `false` you need to take care of appending a new tag to the provided `:options` list upon `@tag` event. |
| **createTag** | `boolean` | `false` | Whether it should allow creating new tag based on search query when using `tags` mode. |
| **addTagOn** | `array` | `['enter']` | The list of keys that creates a new tag while typing in the search field when having `createTag` enabled. Possible values: `enter\|space\|;\|,`. |
| **hideSelected** | `boolean` | `true` | Whether selected options should be excluded from the option list when using `multiple` or `tags` mode. |
| **showOptions** | `boolean` | `true` | Whether option list should be displayed. Can be used to create free-typed tags. |
| **object** | `boolean` | `false` | Whether the value should be stored as an object.<br>If **false**:<br>`value: ['js','jsx','ts']`<br>If **true**:<br> `value: [`<br>&nbsp;&nbsp;`{value:'js',label:'Javascript'},`<br>&nbsp;&nbsp;`{value:'jsx',label:'JSX'},`<br>&nbsp;&nbsp;`{value:'ts',label:'Typescript'}`<br>`]` |
| **nativeSupport** | `boolean` | `false` | Whether hidden input fields should be appended to achieve native data handling. |

## API

| Name | Params | Description |
| --- | --- | --- |
| **open** |  | Opens the options list and focuses the multiselect. |
| **close** |  | Closes the options list and blurs the multiselect. |
| **select** | `value`, `option` | Selects an option based on its value. |
| **deselect** | `value`, `option` | Deselects an option based on its value. |
| **remove** | `value`, `option` | Alias for `deselect`. |
| **clear** |  | Deselects all selected options. |
| **refreshOptions** | `callback` | Refreshes async options list. |


To access API use `ref` on `Multiselect` component:
``` html
<Multiselect
  v-model="value"
  :options="options"
  ref="multiselect"
/>
```

``` js
// eg:
mounted() {
  this.$refs.multiselect.open()
}
```


## Events

| Event | Attributes | Description |
| --- | --- | --- |
| **@change** | `value` | Emitted after the value is changed. |
| **@close** |  | Emitted after closing the option list. |
| **@deselect** | `option` | Emitted after an option is deselected or a tag is removed. |
| **@open** | | Emitted after opening the option list. |
| **@search-change** | `query` | Emitted after a character is typed. |
| **@select** | `option` | Emitted after an option or tag is selected. |
| **@tag** | `query` | Emitted after enter is hit when a new tag is being created. |
| **@clear** |  | Emitted when the options are cleared. |

## Slots

| Slot | Attributes | Description |
| --- | --- | --- |
| **placeholder** | | Rendered as placeholder when the multiselect does not have value and `placeholder` prop is defined. |
| **afterlist** | | Rendered after the options list. |
| **beforelist** | | Rendered before the options list. |
| **multiplelabel** | `values` | Rendered when using `multiple` mode and options are selected. By default it renders the return value of `multipleLabel` function. |
| **nooptions** |  | Rendered when the options list is empty. By default renders `noOptionsText`. |
| **noresults** |  | Rendered when there are no search results. By default renders `noResultsText`. |
| **option** | `option, search` | Renders an option in options list. |
| **singlelabel** | `value` | Rendered when using `single` mode and an option is selected. By default it renders the `:label` if the selected option. |
| **tag** | `option, handleTagRemove, disabled` | Renders a tag when using `tags` mode. When `disabled` the remove icon should not be displayed. The `handleTagRemove` prop should be used to trigger the removal of the tag. |
| **caret** | | Renders a small triangle on the right side of the multiselect. |
| **clear** | | Renders a remove icon if the multiselect has any value. |
| **spinner** | | Renders a loader icon when async options are being fetched. |

> Note: we don't use camelCase because they are [normalized back to lowercase](https://github.com/vuejs/vue/issues/9449#issuecomment-461170017) when written in DOM.

## Examples

* [Single select](#single-select)
* [Multiselect with object options](#multiselect-with-object-options)
* [Multiselect with disabled options](#multiselect-with-disabled-options)
* [Tags with search, create and array of objects options](#tags-with-search-create-and-array-of-objects-options)
* [Autocomplete with async options](#autocomplete-with-async-options)
* [Tags with async options](#tags-with-async-options)
* [Select with custom options slot](#select-with-custom-options-slot)
* [Multiselect with custom label slot](#multiselect-with-custom-label-slot)
* [Tags with custom tags slot](#tags-with-custom-tags-slot)

### Single select

``` vue
<Multiselect
  v-model="value"
  :options="['Batman', 'Robin', 'Joker']"
/>
```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #1</a>

### Multiselect with object options

``` vue
<Multiselect
  v-model="value"
  mode="multiple"
  :options="{
    batman: 'Batman',
    robin: 'Robin',
    joker: 'Joker'
  }"
/>
```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #2</a>

### Multiselect with disabled options

``` vue
<Multiselect
  v-model="value"
  mode="multiple"
  :options="[
    { value: 'batman', label: 'Batman' },
    { value: 'robin', label: 'Robin', disabled: true },
    { value: 'joker', label: 'Joker' },
  ]"
/>
```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #3</a>

### Tags with search, create and array of objects options

``` vue
<Multiselect
  v-model="value"
  mode="tags"
  :searchable="true"
  :createTag="true"
  :options="[
    { value: 'batman', label: 'Batman' },
    { value: 'robin', label: 'Robin' },
    { value: 'joker', label: 'Joker' },
  ]"
/>
```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #4</a>

### Autocomplete with async options

``` vue
<Multiselect
  v-model="value"
  placeholder="Choose a programming language"
  :filterResults="false"
  :minChars="1"
  :resolveOnLoad="false"
  :delay="0"
  :searchable="true"
  :options="async function(query) {
    return await fetchLanguages(query) // check JS block in JSFiddle for implementation
  }"
/>
```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #5</a>

### Tags with async options

``` vue
<Multiselect
  v-model="value"
  mode="tags"
  placeholder="Choose your stack"
  :filterResults="false"
  :minChars="1"
  :resolveOnLoad="false"
  :delay="0"
  :searchable="true"
  :options="async function(query) {
    return await fetchLanguages(query) // check JS block in JSFiddle for implementation
  }"
/>
```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #6</a>

### Select with custom options slot

``` vue
<Multiselect
  v-model="value"
  placeholder="Select your character"
  label="name"
  :options="[
    { value: 'captainamerica', name: 'Captain America', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/03_-_Captain_America_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
    { value: 'spiderman', name: 'Spiderman', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/12_-_Spiderman_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
    { value: 'ironman', name: 'Iron Man', icon: 'https://cdn2.iconfinder.com/data/icons/avengers-filled/48/02_-_IRONMAN_-_infinity_war_-_end_game_-_marvel_-_avengers_-_super_hero-512.png' },
  ]"
>
  <template v-slot:singlelabel="{ value }">
    <div class="multiselect-single-label">
      <img class="character-label-icon" :src="value.icon"> {{ value.name }}
    </div>
  </template>

  <template v-slot:option="{ option }">
    <img class="character-option-icon" :src="option.icon"> {{ option.name }}
  </template>
</Multiselect>

```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #7</a>

### Multiselect with custom label slot

``` vue
<Multiselect
  v-model="value"
  mode="multiple"
  placeholder="Select your characters"
  :options="{
    batman: 'Batman',
    robin: 'Robin',
    joker: 'Joker'
  }"
>
  <template v-slot:multiplelabel="{ values }">
    <div class="multiselect-multiple-label">
      {{ values.length }} characters selected
    </div>
  </template>
</Multiselect>

```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #8</a>

### Tags with custom tags slot

``` vue
<template>
  <Multiselect
    v-model="value"
    mode="tags"
    placeholder="Select employees"
    trackBy="name"
    label="name"
    :search="true"
    :options="[
      { value: 'judy', name: 'Judy', image: 'https://randomuser.me/api/portraits/med/women/1.jpg' },
      { value: 'jane', name: 'Jane', image: 'https://randomuser.me/api/portraits/med/women/2.jpg' },
      { value: 'john', name: 'John', image: 'https://randomuser.me/api/portraits/med/men/1.jpg' },
      { value: 'joe', name: 'Joe', image: 'https://randomuser.me/api/portraits/med/men/2.jpg' }
    ]"
  >
      <template v-slot:tag="{ option, handleTagRemove, disabled }">
        <div class="multiselect-tag is-user">
          <img :src="option.image">
          {{ option.name }}
          <i
            v-if="!disabled"
            @click.prevent
            @mousedown.prevent.stop="handleTagRemove(option, $event)"
          />
        </div>
      </template>
  </Multiselect>
</template>

<style>
  .multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #35495e;
    margin: 3px 3px 8px;
  }

  .multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
  }

  .multiselect-tag.is-user i:before {
    color: #ffffff;
    border-radius: 50%;;
  }

  .user-image {
    margin: 0 6px 0 0;
    border-radius: 50%;
    height: 22px;
  }
</style>
```

<a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">JSFiddle - Example #9</a>

## About Vueform

[Vueform](https://vueform.com?ref=github) streamlines the entire form building process in Vue 2 & 3. It comes with 30+ elements, file uploads, element nesting, 50+ validators, conditions, form steps, i18n including reactive configuration, API access, ESM modules and many more. Check out our [live demos](https://vueform.com?ref=github#demo) or see [all the features](https://vueform.com?ref=github#features) and [sign up for beta](https://vueform.com?ref=github#beta) to get early access.


## License

[MIT](https://github.com/vueform/multiselect/blob/main/LICENSE.md)