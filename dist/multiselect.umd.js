(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("VueFormMultiselect", ["exports", "composition-api", "vue"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("composition-api"), require("vue"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Vue, global.Vue);
    global.VueFormMultiselect = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _compositionApi, _vue) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function e(e, t) {
    var n = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var r = Object.getOwnPropertySymbols(e);
      t && (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), n.push.apply(n, r);
    }

    return n;
  }

  function t(t) {
    for (var r = 1; r < arguments.length; r++) {
      var l = null != arguments[r] ? arguments[r] : {};
      r % 2 ? e(Object(l), !0).forEach(function (e) {
        n(t, e, l[e]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(l)) : e(Object(l)).forEach(function (e) {
        Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(l, e));
      });
    }

    return t;
  }

  function n(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function k(e) {
    return String(e).toLowerCase().trim();
  }

  function j(e) {
    return function (e) {
      if (Array.isArray(e)) return x(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
    }(e) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return x(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return x(e, t);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function x(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) {
      r[n] = e[n];
    }

    return r;
  }

  function T(e) {
    return (T = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    })(e);
  }

  function q(e, t, n) {
    return t in e ? Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[t] = n, e;
  }

  function B(e, t, n) {
    var a = (0, _compositionApi.toRefs)(e),
        o = a.options,
        i = a.mode,
        c = a.trackBy,
        s = a.limit,
        p = a.hideSelectedTag,
        f = a.createTag,
        d = a.label,
        v = a.appendNewTag,
        m = a.multipleLabel,
        b = a.object,
        h = n.value,
        y = n.search,
        g = n.blurSearch,
        O = n.clearSearch,
        S = n.update,
        w = n.blurInput,
        P = (0, _compositionApi.ref)([]),
        x = (0, _compositionApi.computed)(function () {
      var e,
          t = void 0 === o || void 0 === o.value ? [] : o.value;
      return e = t, "[object Object]" === Object.prototype.toString.call(e) && (t = Object.keys(t).map(function (e) {
        var n,
            r = t[e];
        return q(n = {
          value: e
        }, c.value, r), q(n, d.value, r), n;
      })), t = t.map(function (e, t) {
        var n;
        return "object" === T(e) ? e : (q(n = {
          value: t
        }, c.value, e), q(n, d.value, e), n);
      }), P.value.length && (t = t.concat(P.value)), t;
    }),
        B = (0, _compositionApi.computed)(function () {
      var e = x.value;
      return M.value.length && (e = M.value.concat(e)), y.value && (e = e.filter(function (e) {
        return -1 !== k(e[c.value]).indexOf(k(y.value));
      })), p.value && (e = e.filter(function (e) {
        return !_(e);
      })), s.value > 0 && (e = e.slice(0, s.value)), e;
    }),
        A = (0, _compositionApi.computed)(function () {
      return H.value || 0 === h.value.length || b.value ? h.value : "single" == i.value ? D(h.value) : h.value.map(function (e) {
        return D(e);
      });
    }),
        E = (0, _compositionApi.computed)(function () {
      switch (i.value) {
        case "single":
          return !H.value;

        case "multiple":
        case "tags":
          return !H.value && h.value.length > 0;
      }
    }),
        I = (0, _compositionApi.computed)(function () {
      return void 0 !== m && void 0 !== m.value ? m.value(h.value) : h.value && h.value.length > 1 ? "".concat(h.value.length, " options selected") : "1 option selected";
    }),
        C = (0, _compositionApi.computed)(function () {
      return !x.value.length;
    }),
        L = (0, _compositionApi.computed)(function () {
      return x.value.length > 0 && 0 == B.value.length;
    }),
        M = (0, _compositionApi.computed)(function () {
      var e;
      return !1 !== f.value && y.value ? -1 !== U(y.value) ? [] : [(e = {}, q(e, d.value, y.value), q(e, c.value, y.value), q(e, "value", y.value), e)] : [];
    }),
        $ = (0, _compositionApi.computed)(function () {
      switch (i.value) {
        case "single":
          return null;

        case "multiple":
        case "tags":
          return [];
      }
    }),
        H = (0, _compositionApi.computed)(function () {
      return -1 !== [null, void 0].indexOf(h.value);
    }),
        K = function K(e) {
      switch ("object" !== T(e) && (e = D(e)), i.value) {
        case "single":
          S(F(e));
          break;

        case "multiple":
        case "tags":
          S(j(h.value || []).concat(F(e)));
      }

      t.emit("select", F(e));
    },
        N = function N(e) {
      switch ("object" !== T(e) && (e = D(e)), i.value) {
        case "single":
          R();
          break;

        case "tags":
        case "multiple":
          S(h.value.filter(function (t) {
            return b.value && t.value != e.value || !b.value && t != e.value;
          }));
      }

      t.emit("deselect", F(e));
    },
        F = function F(e) {
      return b.value ? e : e.value;
    },
        R = function R(e) {
      S($.value);
    },
        V = function V(e) {
      switch (i.value) {
        case "single":
          return !H.value && A.value.value == e.value;

        case "tags":
        case "multiple":
          return !H.value && -1 !== A.value.map(function (e) {
            return e.value;
          }).indexOf(e.value);
      }
    },
        D = function D(e) {
      return x.value[x.value.map(function (e) {
        return e.value;
      }).indexOf(e)];
    },
        U = function U(e) {
      return x.value.map(function (e) {
        return k(e[c.value]);
      }).indexOf(k(e));
    },
        _ = function _(e) {
      return "tags" === i.value && p.value && V(e);
    },
        W = function W(e) {
      P.value.push(e);
    };

    return {
      filteredOptions: B,
      hasSelected: E,
      multipleLabelText: I,
      extendedOptions: x,
      noOptions: C,
      noResults: L,
      valueObject: A,
      select: K,
      deselect: N,
      remove: function remove(e) {
        N(e);
      },
      clear: R,
      isSelected: V,
      getOption: D,
      handleOptionClick: function handleOptionClick(e) {
        switch (i.value) {
          case "single":
            if (V(e)) return void N(e);
            R(), K(e), g(), w();
            break;

          case "multiple":
            if (V(e)) return void N(e);
            K(e), O();
            break;

          case "tags":
            if (V(e)) return void N(e);
            void 0 === D(e.value) && f.value && (t.emit("tag", e.value), v.value && W(e), O()), K(e);
        }
      }
    };
  }

  function A(e) {
    return function (e) {
      if (Array.isArray(e)) return E(e);
    }(e) || function (e) {
      if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
    }(e) || function (e, t) {
      if (!e) return;
      if ("string" == typeof e) return E(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      "Object" === n && e.constructor && (n = e.constructor.name);
      if ("Map" === n || "Set" === n) return Array.from(e);
      if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return E(e, t);
    }(e) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }();
  }

  function E(e, t) {
    (null == t || t > e.length) && (t = e.length);

    for (var n = 0, r = new Array(t); n < t; n++) {
      r[n] = e[n];
    }

    return r;
  }

  var I = {
    name: "Multiselect",
    emits: ["open", "close", "select", "deselect", "input", "search-change", "tag", "update"],
    props: {
      value: {
        required: !1
      },
      modelValue: {
        required: !1
      },
      options: {
        type: [Array, Object],
        required: !1
      },
      id: {
        type: [String, Number],
        required: !1,
        default: "multiselect"
      },
      name: {
        type: [String, Number],
        required: !1,
        default: "multiselect"
      },
      disabled: {
        type: Boolean,
        required: !1,
        default: !1
      },
      label: {
        type: String,
        required: !1,
        default: "label"
      },
      trackBy: {
        type: String,
        required: !1,
        default: "label"
      },
      placeholder: {
        type: String,
        required: !1,
        default: null
      },
      mode: {
        type: String,
        required: !1,
        default: "single"
      },
      searchable: {
        type: Boolean,
        required: !1,
        default: !1
      },
      limit: {
        type: Number,
        required: !1,
        default: -1
      },
      maxHeight: {
        type: Number,
        required: !1,
        default: 160
      },
      hideSelectedTag: {
        type: Boolean,
        required: !1,
        default: !0
      },
      createTag: {
        type: Boolean,
        required: !1,
        default: !1
      },
      appendNewTag: {
        type: Boolean,
        required: !1,
        default: !0
      },
      caret: {
        type: Boolean,
        required: !1,
        default: !0
      },
      loading: {
        type: Boolean,
        required: !1,
        default: !1
      },
      noOptionsText: {
        type: String,
        required: !1,
        default: "The list is empty"
      },
      noResultsText: {
        type: String,
        required: !1,
        default: "No results found"
      },
      multipleLabel: {
        type: Function,
        required: !1
      },
      object: {
        type: Boolean,
        required: !1,
        default: !1
      }
    },
    setup: function setup(e, n) {
      var i = function (e, t) {
        return {
          update: function update(e) {
            t.emit("input", e), t.emit("update:modelValue", e);
          }
        };
      }(0, n),
          c = function (e, t) {
        var n = (0, _compositionApi.toRefs)(e),
            u = n.value,
            a = n.modelValue;
        return {
          value: (0, _compositionApi.computed)(function () {
            return void 0 === u ? a.value : u.value;
          })
        };
      }(e),
          s = function (e, t, n) {
        var o = (0, _compositionApi.toRefs)(e),
            i = o.searchable,
            c = o.mode,
            s = n.value,
            p = (0, _compositionApi.ref)(null),
            f = (0, _compositionApi.ref)(null),
            d = (0, _compositionApi.computed)(function () {
          return p.value ? "".concat(p.value.length, "ch") : "tags" === c.value && -1 === [null, void 0].indexOf(s.value) && s.value.length ? "1ch" : "100%";
        });
        return (0, _compositionApi.watch)(p, function (e) {
          t.emit("search-change", e);
        }), {
          search: p,
          input: f,
          tagsSearchWidth: d,
          clearSearch: function clearSearch() {
            p.value = null;
          },
          blurSearch: function blurSearch() {
            i.value && f.value.blur();
          },
          handleTagsSearchBackspace: function handleTagsSearchBackspace(e) {
            null !== p.value && e.stopPropagation(), "" === p.value && (p.value = null);
          }
        };
      }(e, n, {
        value: c.value
      }),
          p = function (e, t, n) {
        var a = (0, _compositionApi.toRefs)(e),
            o = a.maxHeight,
            i = a.disabled,
            c = (0, _compositionApi.ref)(!1),
            s = (0, _compositionApi.computed)(function () {
          return "".concat(o.value, "px");
        });
        return {
          isOpen: c,
          contentMaxHeight: s,
          open: function open() {
            i.value || (c.value = !0, t.emit("open"));
          },
          close: function close() {
            c.value = !1, t.emit("close");
          }
        };
      }(e, n),
          f = function (e, t, n) {
        var a = (0, _compositionApi.toRefs)(e),
            o = a.searchable,
            i = a.id;
        return {
          multiselect: (0, _compositionApi.ref)(null),
          tabindex: (0, _compositionApi.computed)(function () {
            return o.value ? -1 : 0;
          }),
          blurInput: function blurInput() {
            document.getElementById(i.value).querySelector(".multiselect-input").blur();
          }
        };
      }(e),
          d = B(e, n, {
        value: c.value,
        search: s.search,
        blurSearch: s.blurSearch,
        clearSearch: s.clearSearch,
        update: i.update,
        blurInput: f.blurInput
      }),
          v = function (e, t, n) {
        var l = (0, _compositionApi.toRefs)(e).id,
            i = n.filteredOptions,
            c = n.handleOptionClick,
            s = n.search,
            p = (0, _compositionApi.ref)(null),
            f = function f(e) {
          p.value = e;
        },
            d = function d() {
          p.value = i.value[0] || null;
        },
            v = function v() {
          p.value = null;
        },
            m = function m() {
          var e = document.getElementById(l.value).querySelector(".is-pointed");

          if (e) {
            var t = e.parentElement;
            e.offsetTop + e.offsetHeight > t.clientHeight + t.scrollTop && (t.scrollTop = e.offsetTop + e.offsetHeight - t.clientHeight), e.offsetTop < t.scrollTop && (t.scrollTop = e.offsetTop);
          }
        };

        return (0, _compositionApi.watch)(s, function (e) {
          d();
        }), {
          pointer: p,
          isPointed: function isPointed(e) {
            return !!p.value && p.value.value == e.value;
          },
          setPointer: f,
          setPointerFirst: d,
          clearPointer: v,
          selectPointer: function selectPointer() {
            p.value && (c(p.value), v());
          },
          forwardPointer: function forwardPointer(e) {
            if (null === p.value) f(i.value[0]);else {
              var t = i.value.map(function (e) {
                return e.value;
              }).indexOf(p.value.value) + 1;
              i.value.length <= t && (t = 0), f(i.value[t]);
            }
            (0, _compositionApi.nextTick)(function () {
              m();
            });
          },
          backwardPointer: function backwardPointer() {
            if (null === p.value) f(i.value[i.value.length - 1]);else {
              var e = i.value.map(function (e) {
                return e.value;
              }).indexOf(p.value.value) - 1;
              e < 0 && (e = i.value.length - 1), f(i.value[e]);
            }
            (0, _compositionApi.nextTick)(function () {
              m();
            });
          }
        };
      }(e, 0, {
        filteredOptions: d.filteredOptions,
        handleOptionClick: d.handleOptionClick,
        search: s.search
      }),
          m = function (e, t, n) {
        var r = n.value,
            l = n.update,
            u = n.close,
            a = n.clearPointer;
        return {
          handleBackspace: function handleBackspace(e) {
            l(A(r.value).slice(0, -1));
          },
          handleEsc: function handleEsc(e) {
            u(), a(), e.target.blur();
          }
        };
      }(0, 0, {
        value: c.value,
        update: i.update,
        close: p.close,
        clearPointer: v.clearPointer
      });

      return t(t(t(t(t(t(t({}, i), s), p), f), d), v), m);
    }
  },
      C = {
    class: "multiselect-single-label"
  },
      L = {
    class: "multiselect-multiple-label"
  },
      M = {
    key: 2,
    class: "multiselect-tags"
  },
      $ = {
    class: "multiselect-tag"
  },
      H = {
    key: 3,
    class: "multiselect-search"
  },
      K = {
    class: "multiselect-spinner"
  },
      N = {
    class: "multiselect-no-options"
  },
      F = {
    class: "multiselect-no-results"
  };
  I.render = function (e, t, n, r, l, u) {
    return (0, _vue.openBlock)(), (0, _vue.createBlock)("div", {
      class: ["multiselect", ["is-".concat(n.mode), {
        "is-open": e.isOpen,
        "is-searchable": n.searchable,
        "is-disabled": n.disabled,
        "no-caret": !n.caret
      }]],
      id: n.id,
      onKeydown: t[26] || (t[26] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {}, ["prevent"]), ["enter"])),
      ref: "multiselect"
    }, [(0, _vue.createVNode)("div", {
      class: "multiselect-input",
      tabindex: e.tabindex,
      onFocus: t[18] || (t[18] = function () {
        return e.open && e.open.apply(e, arguments);
      }),
      onBlur: t[19] || (t[19] = function () {
        return e.close && e.close.apply(e, arguments);
      }),
      onKeyup: [t[20] || (t[20] = (0, _vue.withKeys)(function () {
        return e.handleEsc && e.handleEsc.apply(e, arguments);
      }, ["esc"])), t[21] || (t[21] = (0, _vue.withKeys)(function () {
        return e.selectPointer && e.selectPointer.apply(e, arguments);
      }, ["enter"]))],
      onKeydown: [t[22] || (t[22] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.handleBackspace && e.handleBackspace.apply(e, arguments);
      }, ["prevent"]), ["delete"])), t[23] || (t[23] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.backwardPointer && e.backwardPointer.apply(e, arguments);
      }, ["prevent"]), ["up"])), t[24] || (t[24] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.forwardPointer && e.forwardPointer.apply(e, arguments);
      }, ["prevent"]), ["down"]))]
    }, ["single" == n.mode && e.hasSelected && !e.search ? (0, _vue.renderSlot)(e.$slots, "singleLabel", {
      key: 0,
      value: e.valueObject
    }, function () {
      return [(0, _vue.createVNode)("div", C, (0, _vue.toDisplayString)(e.valueObject[n.label]), 1)];
    }) : (0, _vue.createCommentVNode)("v-if", !0), "multiple" == n.mode && e.hasSelected && !e.search ? (0, _vue.renderSlot)(e.$slots, "multipleLabel", {
      key: 1,
      values: e.valueObject
    }, function () {
      return [(0, _vue.createVNode)("div", L, (0, _vue.toDisplayString)(e.multipleLabelText), 1)];
    }) : (0, _vue.createCommentVNode)("v-if", !0), "tags" == n.mode ? ((0, _vue.openBlock)(), (0, _vue.createBlock)("div", M, [((0, _vue.openBlock)(!0), (0, _vue.createBlock)(_vue.Fragment, null, (0, _vue.renderList)(e.valueObject, function (r, l, u) {
      return (0, _vue.openBlock)(), (0, _vue.createBlock)("span", {
        key: u
      }, [(0, _vue.renderSlot)(e.$slots, "tag", {
        option: r,
        remove: e.remove,
        disabled: n.disabled
      }, function () {
        return [(0, _vue.createVNode)("div", $, [(0, _vue.createTextVNode)((0, _vue.toDisplayString)(r[n.label]) + " ", 1), n.disabled ? (0, _vue.createCommentVNode)("v-if", !0) : ((0, _vue.openBlock)(), (0, _vue.createBlock)("i", {
          key: 0,
          onClick: t[1] || (t[1] = (0, _vue.withModifiers)(function () {}, ["prevent"])),
          onMousedown: (0, _vue.withModifiers)(function (t) {
            return e.remove(r);
          }, ["prevent"])
        }, null, 40, ["onMousedown"]))])];
      })]);
    }), 128)), n.searchable && !n.disabled ? ((0, _vue.openBlock)(), (0, _vue.createBlock)("div", {
      key: 0,
      class: "multiselect-search",
      style: {
        width: e.tagsSearchWidth
      }
    }, [(0, _vue.withDirectives)((0, _vue.createVNode)("input", {
      "onUpdate:modelValue": t[2] || (t[2] = function (t) {
        return e.search = t;
      }),
      onFocus: t[3] || (t[3] = (0, _vue.withModifiers)(function () {
        return e.open && e.open.apply(e, arguments);
      }, ["stop"])),
      onBlur: t[4] || (t[4] = (0, _vue.withModifiers)(function () {
        return e.close && e.close.apply(e, arguments);
      }, ["stop"])),
      onKeyup: [t[5] || (t[5] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.handleEsc && e.handleEsc.apply(e, arguments);
      }, ["stop"]), ["esc"])), t[6] || (t[6] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.selectPointer && e.selectPointer.apply(e, arguments);
      }, ["stop"]), ["enter"]))],
      onKeydown: [t[7] || (t[7] = (0, _vue.withKeys)(function () {
        return e.handleTagsSearchBackspace && e.handleTagsSearchBackspace.apply(e, arguments);
      }, ["delete"])), t[8] || (t[8] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.backwardPointer && e.backwardPointer.apply(e, arguments);
      }, ["stop"]), ["up"])), t[9] || (t[9] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.forwardPointer && e.forwardPointer.apply(e, arguments);
      }, ["stop"]), ["down"]))],
      style: {
        width: e.tagsSearchWidth
      },
      ref: "input"
    }, null, 36), [[_vue.vModelText, e.search]])], 4)) : (0, _vue.createCommentVNode)("v-if", !0)])) : (0, _vue.createCommentVNode)("v-if", !0), "tags" !== n.mode && n.searchable && !n.disabled ? ((0, _vue.openBlock)(), (0, _vue.createBlock)("div", H, [(0, _vue.withDirectives)((0, _vue.createVNode)("input", {
      "onUpdate:modelValue": t[10] || (t[10] = function (t) {
        return e.search = t;
      }),
      onFocus: t[11] || (t[11] = (0, _vue.withModifiers)(function () {
        return e.open && e.open.apply(e, arguments);
      }, ["stop"])),
      onBlur: t[12] || (t[12] = (0, _vue.withModifiers)(function () {
        return e.close && e.close.apply(e, arguments);
      }, ["stop"])),
      onKeyup: [t[13] || (t[13] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.handleEsc && e.handleEsc.apply(e, arguments);
      }, ["stop"]), ["esc"])), t[14] || (t[14] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.selectPointer && e.selectPointer.apply(e, arguments);
      }, ["stop"]), ["enter"]))],
      onKeydown: [t[15] || (t[15] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {}, ["stop"]), ["delete"])), t[16] || (t[16] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.backwardPointer && e.backwardPointer.apply(e, arguments);
      }, ["stop"]), ["up"])), t[17] || (t[17] = (0, _vue.withKeys)((0, _vue.withModifiers)(function () {
        return e.forwardPointer && e.forwardPointer.apply(e, arguments);
      }, ["stop"]), ["down"]))],
      ref: "input"
    }, null, 544), [[_vue.vModelText, e.search]])])) : (0, _vue.createCommentVNode)("v-if", !0), (0, _vue.withDirectives)((0, _vue.createVNode)("div", {
      class: "multiselect-placeholder"
    }, (0, _vue.toDisplayString)(n.placeholder), 513), [[_vue.vShow, n.placeholder && !e.hasSelected && !e.search]]), (0, _vue.createVNode)(_vue.Transition, {
      name: "multiselect-loading"
    }, {
      default: (0, _vue.withCtx)(function () {
        return [(0, _vue.withDirectives)((0, _vue.createVNode)("div", K, null, 512), [[_vue.vShow, n.loading]])];
      }),
      _: 1
    })], 40, ["tabindex"]), (0, _vue.createVNode)(_vue.Transition, {
      name: "multiselect",
      onAfterLeave: e.clearSearch
    }, {
      default: (0, _vue.withCtx)(function () {
        return [(0, _vue.withDirectives)((0, _vue.createVNode)("div", {
          class: "multiselect-options",
          style: {
            maxHeight: e.contentMaxHeight
          }
        }, [(0, _vue.renderSlot)(e.$slots, "beforeList"), ((0, _vue.openBlock)(!0), (0, _vue.createBlock)(_vue.Fragment, null, (0, _vue.renderList)(e.filteredOptions, function (r, l, u) {
          return (0, _vue.openBlock)(), (0, _vue.createBlock)("a", {
            href: "",
            class: ["multiselect-option", {
              "is-pointed": e.isPointed(r),
              "is-selected": e.isSelected(r)
            }],
            key: u,
            onMousedown: t[25] || (t[25] = (0, _vue.withModifiers)(function () {}, ["prevent"])),
            onMouseenter: function onMouseenter(t) {
              return e.setPointer(r);
            },
            onClick: (0, _vue.withModifiers)(function (t) {
              return e.handleOptionClick(r);
            }, ["stop", "prevent"])
          }, [(0, _vue.renderSlot)(e.$slots, "option", {
            option: r,
            search: e.search
          }, function () {
            return [(0, _vue.createVNode)("span", null, (0, _vue.toDisplayString)(r[n.label]), 1)];
          })], 42, ["onMouseenter", "onClick"]);
        }), 128)), (0, _vue.withDirectives)((0, _vue.createVNode)("span", null, [(0, _vue.renderSlot)(e.$slots, "noOptions", {}, function () {
          return [(0, _vue.createVNode)("div", N, (0, _vue.toDisplayString)(n.noOptionsText), 1)];
        })], 512), [[_vue.vShow, e.noOptions]]), (0, _vue.withDirectives)((0, _vue.createVNode)("span", null, [(0, _vue.renderSlot)(e.$slots, "noResults", {}, function () {
          return [(0, _vue.createVNode)("div", F, (0, _vue.toDisplayString)(n.noResultsText), 1)];
        })], 512), [[_vue.vShow, e.noResults]]), (0, _vue.renderSlot)(e.$slots, "afterList")], 4), [[_vue.vShow, e.isOpen]])];
      }),
      _: 3
    }, 8, ["onAfterLeave"])], 42, ["id"]);
  }, I.__file = "src/Multiselect.vue";
  var _default = I;
  _exports.default = _default;
});
