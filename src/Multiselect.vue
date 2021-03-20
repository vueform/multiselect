<template>
  <div
    class="multiselect"
    :class="[`is-${mode}`, {
      'is-open': isOpen,
      'is-searchable': searchable,
      'is-disabled': disabled,
      'no-caret': !caret,
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
      @keydown.prevent.up="backwardPointer"
      @keydown.prevent.down="forwardPointer"
    >
      <!-- Single label -->
      <template v-if="mode == 'single' && hasSelected && !search && internalValue">
        <slot name="singlelabel" :value="internalValue">
          <div class="multiselect-single-label">
            {{ internalValue[label] }}
          </div>
        </slot>
      </template>

      <!-- Multiple label -->
      <template v-if="mode == 'multiple' && hasSelected && !search">
        <slot name="multiplelabel" :values="internalValue">
          <div class="multiselect-multiple-label">
            {{ multipleLabelText }}
          </div>
        </slot>
      </template>
    
      <!-- Search -->
      <template v-if="mode !== 'tags' && searchable && !disabled">
        <div class="multiselect-search">
          <input    
            v-model="search"
            @focus.stop="openDropdown"
            @blur.stop="closeDropdown"
            @keyup.stop.esc="handleEsc"
            @keyup.stop.enter="selectPointer"
            @keydown.delete="handleSearchBackspace"
            @keydown.stop.up="backwardPointer"
            @keydown.stop.down="forwardPointer"
            ref="input"
          />
        </div>
      </template>

      <!-- Tags (with search) -->
      <template v-if="mode == 'tags'">
        <div class="multiselect-tags">

          <span v-for="(option, i, key) in internalValue" :key="key">
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
              v-model="search"
              @focus.stop="openDropdown"
              @blur.stop="closeDropdown"
              @keyup.stop.esc="handleEsc"
              @keyup.stop.enter="handleAddTag"
              @keyup.stop.space="handleAddTag"
              @keydown.delete="handleSearchBackspace"
              @keydown.stop.up="backwardPointer"
              @keydown.stop.down="forwardPointer"
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

      <transition name="multiselect-loading">
        <div v-show="busy" class="multiselect-spinner" />
      </transition>

      <a
        v-if="mode !== 'single' && hasSelected && !disabled"
        class="multiselect-clear"
        @click.prevent="clear"
      ></a>
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
          v-for="(option, i, key) in filteredOptions"
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
      'change',
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
    },
    setup(props, context)
    { 
      const value = useValue(props, context)
      const multiselect = useMultiselect(props, context)
      const pointer = usePointer(props, context)

      const data = useData(props, context, {
        internalValue: value.internalValue,
      })

      const search = useSearch(props, context, {
        internalValue: value.internalValue,
      })

      const dropdown = useDropdown(props, context, {
        multiselect: multiselect.multiselect,
        blurInput: multiselect.blurInput,
        blurSearch: search.blurSearch,
        focusInput: multiselect.focusInput,
        focusSearch: search.focusSearch,
      })

      const options = useOptions(props, context, {
        externalValue: value.externalValue,
        internalValue: value.internalValue,
        currentValue: value.currentValue,
        search: search.search,
        blurSearch: search.blurSearch,
        clearSearch: search.clearSearch,
        update: data.update,
        blurInput: multiselect.blurInput,
        pointer: pointer.pointer,
      })

      const pointerAction = usePointerAction(props, context, {
        filteredOptions: options.filteredOptions,
        handleOptionClick: options.handleOptionClick,
        search: search.search,
        pointer: pointer.pointer,
      })

      const keyboard = useKeyboard(props, context, {
        internalValue: value.internalValue,
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