<div align="center">

  <a href="https://www.npmjs.com/package/@vueform/multiselect" target="_blank">
    <img alt="npm" src="https://img.shields.io/npm/dm/@vueform/multiselect?color=%2353ca2f">
  </a>

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
* Lightweight (<6 kB gzipped)
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
* Fully configurable

## Demo

Check out our <a href="https://jsfiddle.net/q6Lnpr7a/" target="_blank">demo</a>.

## Installation

```
npm install @vueform/multiselect
```

## Usage with Vue 3

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

## Usage with Vue 2

When using with Vue 2 make sure to install [@vue/composition-api](https://github.com/vuejs/composition-api#npm) first and change the imported module to:

``` js
import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js'
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
| **maxHeight** | `number` | `160` | The maximum height of options list (px). |
| **noOptionsText** | `string` | `'The list is empty'` | The text that should be displayed when options list is empty. |
| **noResultsText** | `string` | `'No results found'` | The text that should be displayed when there are no search results. |

### Advanced Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **canDeselect** | `boolean` | `true` | Whether a selected option can be deselected when using `single` mode. |
| **clearOnSearch** | `boolean` | `false` | Whether the option list should be cleared when a new character is typed before loading new options list, when using async options. |
| **clearOnSelect** | `boolean` | `true` | Whether the option list should be cleared upon selecting an option when using async options. |
| **delay** | `number` | `-1` | The delay in milliseconds that should occur between the last typed character and refreshing an async option list. If `-1` the option list will not refresh when the search query changes. If `0` it will refresh without delay. |
| **filterResults** | `boolean` | `true` | Whether option list should be filtered by search query. This may be set to `false` if you are handling filtering manually when returning async options. |
| **minChars** | `number` | `0` | The minimum number of characters that should be typed to refresh async option list. If `0` it will refresh even when the search field becomes empty. |
| **resolveOnLoad** | `boolean` | `true` | Whether async options should be loaded initially (with an empty query). This should be `true` if you are planning to load non-object value(s) initially while using async options (to fetch matching objects for values). |
| **appendNewTag** | `boolean` | `true` | Whether it should append new tag automatically to option list when using `tags` mode with `createTag`. If set to `false` you need to take care of appending a new tag to the provided `:options` list upon `@tag` event. |
| **createTag** | `boolean` | `false` | Whether it should allow creating new tag based on search query when using `tags` mode. |
| **addTagOn** | `array` | `['enter']` | The list of keys that creates a new tag while typing in the search field when having `createTag` enabled. Possible values: `enter\|space`. |
| **hideSelected** | `boolean` | `true` | Whether selected options should be excluded from the option list when using `multiple` or `tags` mode. |
| **showOptions** | `boolean` | `true` | Whether option list should be displayed. Can be used to create free-typed tags. |
| **object** | `boolean` | `false` | Whether the value should be stored as an object.<br>If **false**:<br>`value: ['js','jsx','ts']`<br>If **true**:<br> `value: [`<br>&nbsp;&nbsp;`{value:'js',label:'Javascript'},`<br>&nbsp;&nbsp;`{value:'jsx',label:'JSX'},`<br>&nbsp;&nbsp;`{value:'ts',label:'Typescript'}`<br>`]` |

## API

| Name | Params | Description |
| --- | --- | --- |
| **open** |  | Opens the options list and focuses the multiselect. |
| **close** |  | Closes the options list and blurs the multiselect. |
| **select** | `value` | Selects an option based on its value. |
| **deselect** | `value` | Deselects an option based on its value. |
| **remove** | `value` | Alias for `deselect`. |
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