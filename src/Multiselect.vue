<template>
  <div
    ref="multiselect"
    :class="classList.container"
    :id="searchable ? undefined : id"
    :dir="rtl ? 'rtl' : undefined"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
    @keyup="handleKeyup"
    @keydown="handleKeydown"
  >
    <div
      :class="classList.wrapper"
      @mousedown="handleMousedown"
      ref="wrapper"

      :tabindex="tabindex"
      :aria-controls="!searchable ? ariaControls : undefined"
      :aria-placeholder="!searchable ? ariaPlaceholder : undefined"
      :aria-expanded="!searchable ? isOpen : undefined"
      :aria-activedescendant="!searchable ? ariaActiveDescendant : undefined"
      :aria-multiselectable="!searchable ? ariaMultiselectable : undefined"
      :role="!searchable ? 'combobox' : undefined"
      v-bind="!searchable ? arias : {}"
    >
      <!-- Search -->
      <template v-if="mode !== 'tags' && searchable && !disabled">
        <input
          :type="inputType"
          :modelValue="search"
          :value="search"
          :class="classList.search"
          :autocomplete="autocomplete"
          :id="searchable ? id : undefined"
          @input="handleSearchInput"
          @keypress="handleKeypress"
          @paste.stop="handlePaste"
          ref="input"

          :aria-controls="ariaControls"
          :aria-placeholder="ariaPlaceholder"
          :aria-expanded="isOpen"
          :aria-activedescendant="ariaActiveDescendant"
          :aria-multiselectable="ariaMultiselectable"
          role="combobox"

          v-bind="{
            ...attrs,
            ...arias,
          }"
        />
      </template>

      <!-- Tags (with search) -->
      <template v-if="mode == 'tags'">
        <div :class="classList.tags" data-tags>
          <slot
            v-for="(option, i, key) in iv"
            name="tag"
            :option="option"
            :handleTagRemove="handleTagRemove"
            :disabled="disabled"
          >
            <span
              :class="[
                classList.tag,
                option.disabled ? classList.tagDisabled : null,
              ]"
              tabindex="-1"
              @keyup.enter="handleTagRemove(option, $event)"
              :key="key"

              :aria-label="ariaTagLabel(localize(option[label]))"
            >
              <span :class="classList.tagWrapper">{{ localize(option[label]) }}</span>
              <span
                v-if="!disabled && !option.disabled"
                :class="classList.tagRemove"
                @click.stop="handleTagRemove(option, $event)"
              >
                <span :class="classList.tagRemoveIcon"></span>
              </span>
            </span>
          </slot>
      
          <div :class="classList.tagsSearchWrapper" ref="tags">
            <!-- Used for measuring search width -->
            <span :class="classList.tagsSearchCopy">{{ search }}</span>

            <!-- Actual search input -->
            <input    
              v-if="searchable && !disabled"
              :type="inputType"
              :modelValue="search"
              :value="search"
              :class="classList.tagsSearch"
              :id="searchable ? id : undefined"
              :autocomplete="autocomplete"
              @input="handleSearchInput"
              @keypress="handleKeypress"
              @paste.stop="handlePaste"
              ref="input"
              
              :aria-controls="ariaControls"
              :aria-placeholder="ariaPlaceholder"
              :aria-expanded="isOpen"
              :aria-activedescendant="ariaActiveDescendant"
              :aria-multiselectable="ariaMultiselectable"
              role="combobox"

              v-bind="{
                ...attrs,
                ...arias,
              }"
            />
          </div>
        </div>
      </template>

      <!-- Single label -->
      <template v-if="mode == 'single' && hasSelected && !search && iv">
        <slot name="singlelabel" :value="iv">
          <div :class="classList.singleLabel">
            <span :class="classList.singleLabelText">{{ localize(iv[label]) }}</span>
          </div>
        </slot>
      </template>

      <!-- Multiple label -->
      <template v-if="mode == 'multiple' && hasSelected && !search">
        <slot name="multiplelabel" :values="iv">
          <div :class="classList.multipleLabel" v-html="multipleLabelText"></div>
        </slot>
      </template>

      <!-- Placeholder -->
      <template v-if="placeholder && !hasSelected && !search">
        <slot name="placeholder">
          <div :class="classList.placeholder" aria-hidden="true">
            {{ placeholder }}
          </div>
        </slot>
      </template>

      <!-- Spinner -->
      <slot v-if="loading || resolving" name="spinner">
        <span :class="classList.spinner" aria-hidden="true"></span>
      </slot>

      <!-- Clear -->
      <slot v-if="hasSelected && !disabled && canClear && !busy" name="clear" :clear="clear">
        <span
          aria-hidden="true"
          tabindex="0"
          role="button"
          data-clear
          aria-roledescription="❎"
          :class="classList.clear"
          @click="clear"
          @keyup.enter="clear"
        ><span :class="classList.clearIcon"></span></span>
      </slot>

      <!-- Caret -->
      <slot v-if="caret && showOptions" name="caret" :handle-caret-click="handleCaretClick" :is-open="isOpen">
        <span :class="classList.caret" @click="handleCaretClick" aria-hidden="true"></span>
      </slot>
    </div>

    <!-- Options -->
    <Teleport :to="appendTo || 'body'" :disabled="!appendToBody && !appendTo">
      <div
        :id="id ? `${id}-dropdown` : undefined"
        :class="classList.dropdown"
        tabindex="-1"
        ref="dropdown"
        @focusin="handleFocusIn"
        @focusout="handleFocusOut"
      >
        <slot name="beforelist" :options="fo"></slot>

        <ul :class="classList.options" :id="ariaControls" role="listbox">
          <template v-if="groups">
            <li
              v-for="(group, i, key) in fg"
              :class="classList.group"
              :key="key"

              :id="ariaGroupId(group)"
              :aria-label="ariaGroupLabel(localize(group[groupLabel]))"
              :aria-selected="isSelected(group)"
              role="option"
            >
              <div
                v-if="!group.__CREATE__"
                :class="classList.groupLabel(group)"
                :data-pointed="isPointed(group)"
                @mouseenter="setPointer(group, i)"
                @click="handleGroupClick(group)"
              >
                <slot name="grouplabel" :group="group" :is-selected="isSelected" :is-pointed="isPointed">
                  <span v-html="localize(group[groupLabel])"></span>
                </slot>
              </div>

              <ul
                :class="classList.groupOptions"
                
                :aria-label="ariaGroupLabel(localize(group[groupLabel]))"
                role="group"
              >
                <li
                  v-for="(option, i, key) in group.__VISIBLE__"
                  :class="classList.option(option, group)"
                  :data-pointed="isPointed(option)"
                  :data-selected="isSelected(option) || undefined"
                  :key="key"
                  @mouseenter="setPointer(option)"
                  @click="handleOptionClick(option)"

                  :id="ariaOptionId(option)"
                  :aria-selected="isSelected(option)"
                  :aria-label="ariaOptionLabel(localize(option[label]))"
                  role="option"
                >
                  <slot name="option" :option="option" :is-selected="isSelected" :is-pointed="isPointed" :search="search">
                    <span>{{ localize(option[label]) }}</span>
                  </slot>
                </li>
              </ul>
            </li>
          </template>
          <template v-else>
            <li
              v-for="(option, i, key) in fo"
              :class="classList.option(option)"
              :data-pointed="isPointed(option)"
              :data-selected="isSelected(option) || undefined"
              :key="key"
              @mouseenter="setPointer(option)"
              @click="handleOptionClick(option)"

              :id="ariaOptionId(option)"
              :aria-selected="isSelected(option)"
              :aria-label="ariaOptionLabel(localize(option[label]))"
              role="option"
            >
              <slot name="option" :option="option" :isSelected="isSelected" :is-pointed="isPointed" :search="search">
                <span>{{ localize(option[label]) }}</span>
              </slot>
            </li>
          </template>
        </ul>

        <slot v-if="noOptions" name="nooptions">
          <div :class="classList.noOptions" v-html="localize(noOptionsText)"></div>
        </slot>

        <slot v-if="noResults" name="noresults">
          <div :class="classList.noResults" v-html="localize(noResultsText)"></div>
        </slot>

        <div v-if="infinite && hasMore" :class="classList.inifinite" ref="infiniteLoader">
          <slot name="infinite">
            <span :class="classList.inifiniteSpinner"></span>
          </slot>
        </div>

        <slot name="afterlist" :options="fo"></slot>
      </div>
    </Teleport>

    <!-- Hacky input element to show HTML5 required warning -->
    <input v-if="required" :class="classList.fakeInput" tabindex="-1" :value="textValue" required/>
    
    <!-- Native input support -->
    <template v-if="nativeSupport">
      <input v-if="mode == 'single'" type="hidden" :name="name" :value="plainValue !== undefined ? plainValue : ''" />
      <template v-else>
        <input v-for="(v, i) in plainValue" type="hidden" :name="`${name}[]`" :value="v" :key="i" />
      </template>
    </template>

    <!-- Screen reader assistive text -->
    <div v-if="searchable && hasSelected" :class="classList.assist" :id="ariaAssist" aria-hidden="true">
      {{ ariaLabel }}
    </div>

    <!-- Create height for empty input -->
    <div :class="classList.spacer"></div>

  </div>
</template>

<script>
  /* istanbul ignore file */

  import useData from './composables/useData'
  import useValue from './composables/useValue'
  import useSearch from './composables/useSearch'
  import usePointer from './composables/usePointer'
  import useOptions from './composables/useOptions'
  import usePointerAction from './composables/usePointerAction'
  import useDropdown from './composables/useDropdown'
  import useMultiselect from './composables/useMultiselect'
  import useKeyboard from './composables/useKeyboard' 
  import useClasses from './composables/useClasses' 
  import useScroll from './composables/useScroll' 
  import useA11y from './composables/useA11y' 
  import useI18n from './composables/useI18n'
  import useRefs from './composables/useRefs'

  import resolveDeps from './utils/resolveDeps'

  export default {
    name: 'Multiselect',
    emits: [
      'paste', 'open', 'close', 'select', 'deselect', 
      'input', 'search-change', 'tag', 'option', 'update:modelValue',
      'change', 'clear', 'keydown', 'keyup', 'max', 'create',
    ],
    props: {
      value: {
        required: false,
      },
      modelValue: {
        required: false,
      },
      options: {
        type: [Array, Object, Function],
        required: false,
        default: () => ([])
      },
      id: {
        type: [String, Number],
        required: false,
        default: undefined,
      },
      name: {
        type: [String, Number],
        required: false,
        default: 'multiselect',
      },
      disabled: {
        type: Boolean,
        required: false,
        default: false,
      },
      label: {
        type: String,
        required: false,
        default: 'label',
      },
      trackBy: {
        type: [String, Array],
        required: false,
        default: undefined,
      },
      valueProp: {
        type: String,
        required: false,
        default: 'value',
      },
      placeholder: {
        type: String,
        required: false,
        default: null,
      },
      mode: {
        type: String,
        required: false,
        default: 'single', // single|multiple|tags
      },
      searchable: {
        type: Boolean,
        required: false,
        default: false,
      },
      limit: {
        type: Number,
        required: false,
        default: -1,
      },
      hideSelected: {
        type: Boolean,
        required: false,
        default: true,
      },
      createTag: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      createOption: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      appendNewTag: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      appendNewOption: {
        type: Boolean,
        required: false,
        default: undefined,
      },
      addTagOn: {
        type: Array,
        required: false,
        default: undefined,
      },
      addOptionOn: {
        type: Array,
        required: false,
        default: undefined,
      },
      caret: {
        type: Boolean,
        required: false,
        default: true,
      },
      loading: {
        type: Boolean,
        required: false,
        default: false,
      },
      noOptionsText: {
        type: [String, Object],
        required: false,
        default: 'The list is empty',
      },
      noResultsText: {
        type: [String, Object],
        required: false,
        default: 'No results found',
      },
      multipleLabel: {
        type: Function,
        required: false,
        default: undefined,
      },
      object: {
        type: Boolean,
        required: false,
        default: false,
      },
      delay: {
        type: Number,
        required: false,
        default: -1,
      },
      minChars: {
        type: Number,
        required: false,
        default: 0,
      },
      resolveOnLoad: {
        type: Boolean,
        required: false,
        default: true,
      },
      filterResults: {
        type: Boolean,
        required: false,
        default: true,
      },
      clearOnSearch: {
        type: Boolean,
        required: false,
        default: false,
      },
      clearOnSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      canDeselect: {
        type: Boolean,
        required: false,
        default: true,
      },
      canClear: {
        type: Boolean,
        required: false,
        default: true,
      },
      max: {
        type: Number,
        required: false,
        default: -1,
      },
      showOptions: {
        type: Boolean,
        required: false,
        default: true,
      },
      required: {
        type: Boolean,
        required: false,
        default: false,
      },
      openDirection: {
        type: String,
        required: false,
        default: 'bottom',
      },
      nativeSupport: {
        type: Boolean,
        required: false,
        default: false,
      },
      classes: {
        type: Object,
        required: false,
        default: () => ({})
      },
      strict: {
        type: Boolean,
        required: false,
        default: true,
      },
      closeOnSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      closeOnDeselect: {
        type: Boolean,
        required: false,
        default: false,
      },
      autocomplete: {
        type: String,
        required: false,
        default: undefined,
      },
      groups: {
        type: Boolean,
        required: false,
        default: false,
      },
      groupLabel: {
        type: String,
        required: false,
        default: 'label',
      },
      groupOptions: {
        type: String,
        required: false,
        default: 'options',
      },
      groupHideEmpty: {
        type: Boolean,
        required: false,
        default: false,
      },
      groupSelect: {
        type: Boolean,
        required: false,
        default: true,
      },
      inputType: {
        type: String,
        required: false,
        default: 'text',
      },
      attrs: {
        required: false,
        type: Object,
        default: () => ({}),
      },
      onCreate: {
        required: false,
        type: Function,
        default: undefined,
      },
      disabledProp: {
        type: String,
        required: false,
        default: 'disabled',
      },
      searchStart: {
        type: Boolean,
        required: false,
        default: false,
      },
      reverse: {
        type: Boolean,
        required: false,
        default: false,
      },
      regex: {
        type: [Object, String, RegExp],
        required: false,
        default: undefined,
      },
      rtl: {
        type: Boolean,
        required: false,
        default: false,
      },
      infinite: {
        type: Boolean,
        required: false,
        default: false,
      },
      aria: {
        required: false,
        type: Object,
        default: () => ({}),
      },
      clearOnBlur: {
        required: false,
        type: Boolean,
        default: true,
      },
      locale: {
        required: false,
        type: String,
        default: null,
      },
      fallbackLocale: {
        required: false,
        type: String,
        default: 'en',
      },
      searchFilter: {
        required: false,
        type: Function,
        default: null,
      },
      allowAbsent: {
        required: false,
        type: Boolean,
        default: false,
      },
      appendToBody: {
        required: false,
        type: Boolean,
        default: false,
      },
      closeOnScroll: {
        required: false,
        type: Boolean,
        default: false,
      },
      breakTags: {
        required: false,
        type: Boolean,
        default: false,
      },
      appendTo: {
        required: false,
        type: String,
        default: undefined,
      },
    },
    setup(props, context)
    { 
      return resolveDeps(props, context, [
        useRefs,
        useI18n,
        useValue,
        usePointer,
        useDropdown,
        useSearch,
        useData,
        useMultiselect,
        useOptions,
        useScroll,
        usePointerAction,
        useKeyboard,
        useClasses,
        useA11y,
      ])
    },
    beforeMount() {
      if ((this.$root.constructor && this.$root.constructor.version && this.$root.constructor.version.match(/^2\./)) || this.vueVersionMs === 2) {
        if (!this.$options.components.Teleport) {
          this.$options.components.Teleport = {
            render() {
              return this.$slots.default ? this.$slots.default[0] : null
            }
          }
        }
      }
    }
  }
</script>