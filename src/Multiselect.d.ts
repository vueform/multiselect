import Vue,{ VNode } from 'vue';

declare class Multiselect extends Vue {
    modelValue?: any;
    value?: any;
    mode: 'single'|'multiple'|'tags';
    options?: any[];
    searchable?: boolean;
    valueProp?: string;
    trackBy?: string;
    label?: string;
    placeholder?: string|null;
    multipleLabel?: any; // Function
    disabled?: boolean;
    max?: number;
    limit?: number;
    loading?: boolean;
    id?: string;
    caret?: boolean;
    maxHeight?: number;
    noOptionsText?: string;
    noResultsText?: string;
    canDeselect?: boolean;
    clearOnSearch?: boolean;
    clearOnSelect?: boolean;
    delay?: number;
    filterResults?: boolean;
    minChars?: number;
    resolveOnLoad?: boolean;
    appendNewTag?: boolean;
    createTag?: boolean;
    addTagOn?: string[];
    hideSelected?: boolean;
    showOptions?: boolean;
    object: boolean;
    required: boolean;

    $emit(eventName: 'change', e: {originalEvent: Event, value: any}): this;
    $emit(eventName: 'select', e: {originalEvent: Event, option: any}): this;
    $emit(eventName: 'deselect', e: {originalEvent: Event, option: any}): this;
    $emit(eventName: 'search-change', e: {originalEvent: Event, query: string}): this;
    $emit(eventName: 'tag', e: {originalEvent: Event, query: string}): this;
    $emit(eventName: 'open'): this;
    $emit(eventName: 'close'): this;

    $slots: {
      placeholder: VNode[];
      afterlist: VNode[];
      beforelist: VNode[];
      list: VNode[];
      multiplelabel: VNode[];
      singlelabel: VNode[];
      option: VNode[];
      tag: VNode[];
    };
}

export default Multiselect;