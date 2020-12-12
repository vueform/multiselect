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
      @focus="open"
      @blur="close"
      @keyup.esc="handleEsc"
      @keyup.enter="selectPointer"
      @keydown.prevent.delete="handleBackspace"
      @keydown.prevent.up="backwardPointer"
      @keydown.prevent.down="forwardPointer"
    >

      <template v-if="mode == 'single' && hasSelected && !search && valueObject">
        <slot name="singleLabel" :value="valueObject">
          <div class="multiselect-single-label">
            {{ valueObject[label] }}
          </div>
        </slot>
      </template>

      <template v-if="mode == 'multiple' && hasSelected && !search">
        <slot name="multipleLabel" :values="valueObject">
          <div class="multiselect-multiple-label">
            {{ multipleLabelText }}
          </div>
        </slot>
      </template>

      <template v-if="mode == 'tags'">
        <div class="multiselect-tags">

          <span v-for="(option, i, key) in valueObject" :key="key">
            <slot name="tag" :option="option" :remove="remove" :disabled="disabled">
              <div class="multiselect-tag">
                {{ option[label] }}
                <i
                  v-if="!disabled"
                  @click.prevent
                  @mousedown.prevent="remove(option)"
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
              @focus.stop="open"
              @blur.stop="close"
              @keyup.stop.esc="handleEsc"
              @keyup.stop.enter="selectPointer"
              @keydown.delete="handleTagsSearchBackspace"
              @keydown.stop.up="backwardPointer"
              @keydown.stop.down="forwardPointer"
              :style="{ width: tagsSearchWidth }"
              ref="input"
            />
          </div>
        </div>
      </template>
    
      <template v-if="mode !== 'tags' && searchable && !disabled">
        <div class="multiselect-search">
          <input    
            v-model="search"
            @focus.stop="open"
            @blur.stop="close"
            @keyup.stop.esc="handleEsc"
            @keyup.stop.enter="selectPointer"
            @keydown.stop.delete
            @keydown.stop.up="backwardPointer"
            @keydown.stop.down="forwardPointer"
            ref="input"
          />
        </div>
      </template>

      <div
        v-show="placeholder && !hasSelected && !search"
        class="multiselect-placeholder"
      >
        {{ placeholder }}
      </div>

      <transition name="multiselect-loading">
        <div v-show="loading" class="multiselect-spinner" />
      </transition>

    </div>

    <transition name="multiselect" @after-leave="clearSearch">
      <div
        v-show="isOpen"
        class="multiselect-options"
        :style="{ maxHeight: contentMaxHeight }"
      >
        <slot name="beforeList"></slot>

        <a
          v-for="(option, i, key) in filteredOptions"
          href=""
          class="multiselect-option"
          :class="{
            'is-pointed': isPointed(option),
            'is-selected': isSelected(option),
          }"
          :key="key"
          @mousedown.prevent
          @mouseenter="setPointer(option)"
          @click.stop.prevent="handleOptionClick(option)"
        >
          <slot name="option" :option="option" :search="search">
            <span>{{ option[label] }}</span>
          </slot>
        </a>

        <span v-show="noOptions">
          <slot name="noOptions">
            <div class="multiselect-no-options">{{ noOptionsText }}</div>
          </slot>
        </span>

        <span v-show="noResults">
          <slot name="noResults">
            <div class="multiselect-no-results">{{ noResultsText }}</div>
          </slot>
        </span>

        <slot name="afterList"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
  import normalize from './utils/normalize'
  import useData from './composables/useData'
  import useValue from './composables/useValue'
  import useSearch from './composables/useSearch'
  import useOptions from './composables/useOptions'
  import usePointer from './composables/usePointer'
  import useDropdown from './composables/useDropdown'
  import useMultiselect from './composables/useMultiselect'
  import useKeyboard from './composables/useKeyboard' 

  export default {
    name: 'Multiselect',
    emits: [
      'open', 'close', 'select', 'deselect', 
      'input', 'search-change', 'tag', 'update:modelValue',
    ],
    props: {
      value: {
        required: false,
      },
      modelValue: {
        required: false,
      },
      options: {
        type: [Array, Object],
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
      hideSelectedTag: {
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
    },
    setup(props, context)
    { 
      const data = useData(props, context)
      const value = useValue(props, context)
      const search = useSearch(props, context, {
        value: value.externalValue,
      })
      const dropdown = useDropdown(props, context)
      const multiselect = useMultiselect(props, context)

      const options = useOptions(props, context, {
        value: value.externalValue,
        search: search.search,
        blurSearch: search.blurSearch,
        clearSearch: search.clearSearch,
        update: data.update,
        blurInput: multiselect.blurInput,
      })

      const pointer = usePointer(props, context, {
        filteredOptions: options.filteredOptions,
        handleOptionClick: options.handleOptionClick,
        search: search.search,
      })

      const keyboard = useKeyboard(props, context, {
        value: value.externalValue,
        update: data.update,
        close: dropdown.close,
        clearPointer: pointer.clearPointer,
      })

      return {
        ...data,
        ...search,
        ...dropdown,
        ...multiselect,
        ...options,
        ...pointer,
        ...keyboard,
        ...value,
      }
    }
  }
</script>