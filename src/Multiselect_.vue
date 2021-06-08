<template>
  <div
    class="multiselect"
    :class="[`is-${mode}`, {
      'is-open': isOpen,
      'is-searchable': searchable,
      'is-disabled': disabled,
      'no-caret': !caret,
      'open-top': openDirection === 'top',
    }]"
    :id="id"
    @keydown.prevent.enter
    ref="multiselect"
  >
    <div
      class="multiselect-input"
      :tabindex="tabindex"
      @mousedown="handleInputMousedown"
      @focus="openDropdown"
      @blur="closeDropdown"
      @keyup.esc="handleEsc"
      @keyup.enter="selectPointer"
      @keydown.prevent.delete="handleBackspace"
      @keydown.prevent.up="openDirection === 'top' ? forwardPointer() : backwardPointer()"
      @keydown.prevent.down="openDirection === 'top' ? backwardPointer() : forwardPointer()"
    >
      <!-- Single label -->
      <template v-if="mode == 'single' && hasSelected && !search && iv">
        <slot name="singlelabel" :value="iv">
          <div class="multiselect-single-label">
            {{ iv[label] }}
          </div>
        </slot>
      </template>

      <!-- Multiple label -->
      <template v-if="mode == 'multiple' && hasSelected && !search">
        <slot name="multiplelabel" :values="iv">
          <div class="multiselect-multiple-label">
            {{ multipleLabelText }}
          </div>
        </slot>
      </template>
    
      <!-- Search -->
      <template v-if="mode !== 'tags' && searchable && !disabled">
        <div class="multiselect-search">
          <input    
            :modelValue="search"
            :value="search"
            @focus.stop="openDropdown"
            @blur.stop="closeDropdown"
            @keyup.stop.esc="handleEsc"
            @keyup.stop.enter="selectPointer"
            @keydown.delete="handleSearchBackspace"
            @keydown.stop.up="openDirection === 'top' ? forwardPointer() : backwardPointer()"
            @keydown.stop.down="openDirection === 'top' ? backwardPointer() : forwardPointer()"
            @input="handleSearchInput"
            ref="input"
          />
        </div>
      </template>

      <!-- Tags (with search) -->
      <template v-if="mode == 'tags'">
        <div class="multiselect-tags">

          <span v-for="(option, i, key) in iv" :key="key">
            <slot name="tag" :option="option" :handleTagRemove="handleTagRemove" :disabled="disabled">
              <div class="multiselect-tag">
                {{ option[label] }}
                <i
                  v-if="!disabled"
                  @click.prevent
                  @mousedown.prevent.stop="handleTagRemove(option, $event)"
                ></i>
              </div>
            </slot>
          </span>
      
          <div
            v-if="searchable && !disabled"
            class="multiselect-search"
            :style="{ width: tagsSearchWidth }"
          >
            <input    
              :modelValue="search"
              :value="search"
              @focus.stop="openDropdown"
              @blur.stop="closeDropdown"
              @keyup.stop.esc="handleEsc"
              @keyup.stop.enter="handleAddTag"
              @keyup.stop.space="handleAddTag"
              @keydown.delete="handleSearchBackspace"
              @keydown.stop.up="openDirection === 'top' ? forwardPointer() : backwardPointer()"
              @keydown.stop.down="openDirection === 'top' ? backwardPointer() : forwardPointer()"
              @input="handleSearchInput"
              :style="{ width: tagsSearchWidth }"
              ref="input"
            />
          </div>
        </div>
      </template>

      <!-- Placeholder -->
      <template v-if="placeholder && !hasSelected && !search">
        <slot name="placeholder">
          <div class="multiselect-placeholder">
            {{ placeholder }}
          </div>
        </slot>
      </template>

      <slot v-if="!hasSelected && caret && !busy" name="caret">
        <span class="multiselect-caret"></span>
      </slot>

      <slot v-if="hasSelected && !disabled && !busy && canDeselect" name="clear" :clear="clear">
        <a class="multiselect-clear" @click.prevent="clear"></a>
      </slot>

      <transition name="multiselect-loading">
        <span v-if="busy">
          <slot name="spinner">
            <span class="multiselect-spinner"></span>
          </slot>
        </span>
      </transition>
    </div>

    <!-- Options -->
    <transition v-if="!resolving || !clearOnSearch" name="multiselect" @after-leave="clearSearch">
      <div
        v-show="isOpen && showOptions"
        class="multiselect-options"
        :style="{ maxHeight: contentMaxHeight }"
      >
        <slot name="beforelist"></slot>

        <span
          v-for="(option, i, key) in fo"
          :tabindex="-1"
          class="multiselect-option"
          :class="{
            'is-pointed': isPointed(option),
            'is-selected': isSelected(option),
            'is-disabled': isDisabled(option),
          }"
          :key="key"
          @mousedown.prevent
          @mouseenter="setPointer(option)"
          @click.stop.prevent="handleOptionClick(option)"
        >
          <slot name="option" :option="option" :search="search">
            <span>{{ option[label] }}</span>
          </slot>
        </span>

        <span v-show="noOptions">
          <slot name="nooptions">
            <div class="multiselect-no-options">{{ noOptionsText }}</div>
          </slot>
        </span>

        <span v-show="noResults">
          <slot name="noresults">
            <div class="multiselect-no-results">{{ noResultsText }}</div>
          </slot>
        </span>

        <slot name="afterlist"></slot>
      </div>
    </transition>

    <!-- Hacky input element to show HTML5 required warning -->
    <input v-if="required" class="multiselect-fake-input" tabindex="-1" :value="textValue" required/>
    
    <template v-if="nativeSupport">
      <input v-if="mode == 'single'" type="hidden" :name="name" :value="plainValue !== undefined ? plainValue : ''" />
      <template v-else>
        <input v-for="(v, i) in plainValue" type="hidden" :name="`${name}[]`" :value="v" :key="i" />
      </template>
    </template>
  </div>
</template>

<script>
  import useData from './composables/useData'
  import useValue from './composables/useValue'
  import useSearch from './composables/useSearch'
  import usePointer from './composables/usePointer'
  import useOptions from './composables/useOptions'
  import usePointerAction from './composables/usePointerAction'
  import useDropdown from './composables/useDropdown'
  import useMultiselect from './composables/useMultiselect'
  import useKeyboard from './composables/useKeyboard' 

  export default {
    name: 'Multiselect',
    emits: [
      'open', 'close', 'select', 'deselect', 
      'input', 'search-change', 'tag', 'update:modelValue',
      'change', 'clear'
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
        default: 'multiselect',
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
        type: String,
        required: false,
        default: 'label',
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
      maxHeight: {
        type: Number,
        required: false,
        default: 160,
      },
      hideSelected: {
        type: Boolean,
        required: false,
        default: true,
      },
      createTag: {
        type: Boolean,
        required: false,
        default: false,
      },
      appendNewTag: {
        type: Boolean,
        required: false,
        default: true,
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
        type: String,
        required: false,
        default: 'The list is empty',
      },
      noResultsText: {
        type: String,
        required: false,
        default: 'No results found',
      },
      multipleLabel: {
        type: Function,
        required: false,
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
      addTagOn: {
        type: Array,
        required: false,
        default: () => (['enter']),
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
    },
    setup(props, context)
    { 
      const value = useValue(props, context)
      const multiselect = useMultiselect(props, context)
      const pointer = usePointer(props, context)

      const data = useData(props, context, {
        iv: value.iv,
      })

      const search = useSearch(props, context, {
        iv: value.iv,
      })

      const dropdown = useDropdown(props, context, {
        multiselect: multiselect.multiselect,
        blurInput: multiselect.blurInput,
        blurSearch: search.blurSearch,
        focusInput: multiselect.focusInput,
        focusSearch: search.focusSearch,
      })

      const options = useOptions(props, context, {
        ev: value.ev,
        iv: value.iv,
        search: search.search,
        blurSearch: search.blurSearch,
        clearSearch: search.clearSearch,
        update: data.update,
        blurInput: multiselect.blurInput,
        pointer: pointer.pointer,
      })

      const pointerAction = usePointerAction(props, context, {
        fo: options.fo,
        handleOptionClick: options.handleOptionClick,
        search: search.search,
        pointer: pointer.pointer,
      })

      const keyboard = useKeyboard(props, context, {
        iv: value.iv,
        update: data.update,
        closeDropdown: dropdown.closeDropdown,
        clearPointer: pointerAction.clearPointer,
        search: search.search,
        selectPointer: pointerAction.selectPointer,
      })

      return {
        ...value,
        ...dropdown,
        ...multiselect,
        ...pointer,
        ...data,
        ...search,
        ...options,
        ...pointerAction,
        ...keyboard,
      }
    }
  }
</script>