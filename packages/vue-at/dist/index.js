import { openBlock, createElementBlock, normalizeStyle, createElementVNode, Fragment, renderList, normalizeClass, renderSlot, toDisplayString, createCommentVNode, withDirectives, vShow } from 'vue';

// bug report: https://github.com/vuejs/awesome-vue/pull/1028
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded
function scrollIntoView(el, scrollParent) {
  if (el.scrollIntoViewIfNeeded) {
    el.scrollIntoViewIfNeeded(false); // alignToCenter=false
  } else {
    // should not use `el.scrollIntoView(false)` // alignToTop=false
    // bug report: https://stackoverflow.com/questions/11039885/scrollintoview-causing-the-whole-page-to-move
    const diff = el.offsetTop - scrollParent.scrollTop;
    if (diff < 0 || diff > scrollParent.offsetHeight - el.offsetHeight) {
      scrollParent = scrollParent || el.parentElement;
      scrollParent.scrollTop = el.offsetTop;
    }
  }
}

function applyRange(range) {
  const selection = window.getSelection();
  if (selection) { // 容错
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
function getRange() {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    return selection.getRangeAt(0)
  }
}

function getAtAndIndex(text, ats) {
  return ats.map((at) => {
    return { at, index: text.lastIndexOf(at) }
  }).reduce((a, b) => {
    return a.index > b.index ? a : b
  })
}

/* eslint-disable */
// http://stackoverflow.com/questions/26747240/plain-javascript-replication-to-offset-and-position
function getOffset(element, target) {
    // var element = document.getElementById(element),
    //     target  = target ? document.getElementById(target) : window;
    target = target || window;
    var offset = {top: element.offsetTop, left: element.offsetLeft},
        parent = element.offsetParent;
    while (parent != null && parent != target) {
       offset.left += parent.offsetLeft;
       offset.top  += parent.offsetTop;
       parent = parent.offsetParent;
    }
    return offset;
}
// http://stackoverflow.com/questions/3972014/get-caret-position-in-contenteditable-div
function closest (el, predicate) {
  /* eslint-disable */
  do if (predicate(el)) return el;
  while (el = el && el.parentNode);
}
// http://stackoverflow.com/questions/15157435/get-last-character-before-caret-position-in-javascript
// 修复 "空格+表情+空格+@" range报错 应设(endContainer, 0)
// stackoverflow上的这段代码有bug
function getPrecedingRange() {
  const r = getRange();
  if (r) {
    const range = r.cloneRange();
    range.collapse(true);
    // var el = closest(range.endContainer, d => d.contentEditable)
    // range.setStart(el, 0)
    range.setStart(range.endContainer, 0);
    return range
  }
}
/* eslint-enable */

const _hoisted_1 = { class: "atwho-inner" };
const _hoisted_2 = { class: "atwho-view" };
const _hoisted_3 = { class: "atwho-ul" };
const _hoisted_4 = ["data-index"];
const _hoisted_5 = ["textContent"];
const _hoisted_6 = { ref: "embeddedItem" };

function render(_ctx, _cache) {
  return (openBlock(), createElementBlock("div", {
    ref: "wrap",
    class: "atwho-wrap",
    onCompositionstart: _cache[2] || (_cache[2] = (...args) => (_ctx.handleCompositionStart && _ctx.handleCompositionStart(...args))),
    onCompositionend: _cache[3] || (_cache[3] = (...args) => (_ctx.handleCompositionEnd && _ctx.handleCompositionEnd(...args))),
    onInput: _cache[4] || (_cache[4] = $event => (_ctx.handleInput())),
    onKeydownCapture: _cache[5] || (_cache[5] = (...args) => (_ctx.handleKeyDown && _ctx.handleKeyDown(...args)))
  }, [
    (_ctx.atwho)
      ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "atwho-panel",
          style: normalizeStyle(_ctx.style)
        }, [
          createElementVNode("div", _hoisted_1, [
            createElementVNode("div", _hoisted_2, [
              createElementVNode("ul", _hoisted_3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.atwho.list, (item, index) => {
                  return (openBlock(), createElementBlock("li", {
                    class: normalizeClass(["atwho-li", _ctx.isCur(index) && 'atwho-cur']),
                    key: index,
                    ref_for: true,
                    ref: _ctx.isCur(index) && 'cur',
                    "data-index": index,
                    onMouseenter: _cache[0] || (_cache[0] = (...args) => (_ctx.handleItemHover && _ctx.handleItemHover(...args))),
                    onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleItemClick && _ctx.handleItemClick(...args)))
                  }, [
                    renderSlot(_ctx.$slots, "item", { item: item }, () => [
                      createElementVNode("span", {
                        textContent: toDisplayString(_ctx.itemName(item))
                      }, null, 8 /* PROPS */, _hoisted_5)
                    ])
                  ], 42 /* CLASS, PROPS, HYDRATE_EVENTS */, _hoisted_4))
                }), 128 /* KEYED_FRAGMENT */))
              ])
            ])
          ])
        ], 4 /* STYLE */))
      : createCommentVNode("v-if", true),
    withDirectives(createElementVNode("span", _hoisted_6, [
      renderSlot(_ctx.$slots, "embeddedItem", { current: _ctx.currentItem })
    ], 512 /* NEED_PATCH */), [
      [vShow, false]
    ]),
    renderSlot(_ctx.$slots, "default")
  ], 544 /* HYDRATE_EVENTS, NEED_PATCH */))
}

const script$2 = {};

script$2.render = render;
script$2.__scopeId = "data-v-99e0b7f4";
script$2.__file = "src/AtTemplate.vue";

var script$1 = {
  name: 'At',
  mixins: [script$2],
  props: {
    value: {
      type: String, // value not required
      default: null
    },
    at: {
      type: String,
      default: null
    },
    ats: {
      type: Array,
      default: () => ['@']
    },
    suffix: {
      type: String,
      default: ' '
    },
    loop: {
      type: Boolean,
      default: true
    },
    allowSpaces: {
      type: Boolean,
      default: true
    },
    tabSelect: {
      type: Boolean,
      default: false
    },
    avoidEmail: {
      type: Boolean,
      default: true
    },
    showUnique: {
      type: Boolean,
      default: true
    },
    hoverSelect: {
      type: Boolean,
      default: true
    },
    members: {
      type: Array,
      default: () => []
    },
    nameKey: {
      type: String,
      default: ''
    },
    filterMatch: {
      type: Function,
      default: (name, chunk, at) => {
        // match at lower-case
        return name.toLowerCase()
          .indexOf(chunk.toLowerCase()) > -1
      }
    },
    deleteMatch: {
      type: Function,
      default: (name, chunk, suffix) => {
        return chunk === name + suffix
      }
    },
    scrollRef: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      // at[v-model] mode should be on only when
      // initial :value/v-model is present (not nil)
      bindsValue: this.value != null,
      customsEmbedded: false,
      hasComposition: false,
      atwho: null
    }
  },
  computed: {
    atItems () {
      return this.at ? [this.at] : this.ats
    },

    currentItem () {
      if (this.atwho) {
        return this.atwho.list[this.atwho.cur];
      }
      return '';
    },

    style () {
      if (this.atwho) {
        const { list, cur, x, y } = this.atwho;
        const { wrap } = this.$refs;
        if (wrap) {
          const offset = getOffset(wrap);
          const scrollLeft = this.scrollRef ? document.querySelector(this.scrollRef).scrollLeft : 0;
          const scrollTop = this.scrollRef ? document.querySelector(this.scrollRef).scrollTop : 0;
          const left = x + scrollLeft + window.pageXOffset - offset.left + 'px';
          const top = y + scrollTop + window.pageYOffset - offset.top + 'px';
          return { left, top }
        }
      }
      return null
    }
  },
  watch: {
    'atwho.cur' (index) {
      if (index != null) { // cur index exists
        this.$nextTick(() => {
          this.scrollToCur();
        });
      }
    },
    members () {
      this.handleInput(true);
    },
    value (value, oldValue) {
      if (this.bindsValue) {
        this.handleValueUpdate(value);
      }
    }
  },
  mounted () {
    if (this.$slots.embeddedItem) {
      this.customsEmbedded = true;
    }
    if (this.bindsValue) {
      this.handleValueUpdate(this.value);
    }
  },

  methods: {
    itemName (v) {
      const { nameKey } = this;
      return nameKey ? v[nameKey] : v
    },
    isCur (index) {
      return index === this.atwho.cur
    },
    handleValueUpdate (value) {
      const el = this.$el.querySelector('[contenteditable]');
      if (value !== el.innerHTML) { // avoid range reset
        el.innerHTML = value;
        this.dispatchInput();
      }
    },
    dispatchInput () {
      let el = this.$el.querySelector('[contenteditable]');
      let ev = new Event('input', { bubbles: true });
      el.dispatchEvent(ev);
    },

    handleItemHover (e) {
      if (this.hoverSelect) {
        this.selectByMouse(e);
      }
    },
    handleItemClick (e) {
      this.selectByMouse(e);
      this.insertItem();
    },
    handleDelete (e) {
      const range = getPrecedingRange();
      if (range) {
        // fixme: Very bad code from me
        if (this.customsEmbedded && range.endOffset >= 1) {
          let a = range.endContainer.childNodes[range.endOffset]
            || range.endContainer.childNodes[range.endOffset - 1];
          if (!a || a.nodeType === Node.TEXT_NODE && !/^\s?$/.test(a.data)) {
            return
          } else if (a.nodeType === Node.TEXT_NODE) {
            if (a.previousSibling) a = a.previousSibling;
          } else {
            if (a.previousElementSibling) a = a.previousElementSibling;
          }
          let ch = [].slice.call(a.childNodes);
          ch = [].reverse.call(ch);
          ch.unshift(a);
          let last
          ;[].some.call(ch, c => {
            if (c.getAttribute && c.getAttribute('data-at-embedded') != null) {
              last = c;
              return true
            }
          });
          if (last) {
            e.preventDefault();
            e.stopPropagation();
            const r = getRange();
            if (r) {
              r.setStartBefore(last);
              r.deleteContents();
              applyRange(r);
              this.handleInput();
            }
          }
          return
        }

        const { atItems, members, suffix, deleteMatch, itemName } = this;
        const text = range.toString();
        const { at, index } = getAtAndIndex(text, atItems);

        if (index > -1) {
          const chunk = text.slice(index + at.length);
          const has = members.some(v => {
            const name = itemName(v);
            return deleteMatch(name, chunk, suffix)
          });
          if (has) {
            e.preventDefault();
            e.stopPropagation();
            const r = getRange();
            if (r) {
              r.setStart(r.endContainer, index);
              r.deleteContents();
              applyRange(r);
              this.handleInput();
            }
          }
        }
      }
    },
    handleKeyDown (e) {
      const { atwho } = this;
      if (atwho) {
        if (e.keyCode === 38 || e.keyCode === 40) { // ↑/↓
          if (!(e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            e.stopPropagation();
            this.selectByKeyboard(e);
          }
          return
        }
        if (e.keyCode === 13 || (this.tabSelect && e.keyCode === 9)) { // enter or tab
          this.insertItem();
          e.preventDefault();
          e.stopPropagation();
          return
        }
        if (e.keyCode === 27) { // esc
          this.closePanel();
          return
        }
      }

      // 为了兼容ie ie9~11 editable无input事件 只能靠keydown触发 textarea正常
      // 另 ie9 textarea的delete不触发input
      const isValid = e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode === 8;
      if (isValid) {
        setTimeout(() => {
          this.handleInput();
        }, 50);
      }

      if (e.keyCode === 8) {
        this.handleDelete(e);
      }
    },

    // compositionStart -> input -> compositionEnd
    handleCompositionStart () {
      this.hasComposition = true;
    },
    handleCompositionEnd () {
      this.hasComposition = false;
      this.handleInput();
    },
    handleInput (keep) {
      if (this.hasComposition) return
      const el = this.$el.querySelector('[contenteditable]');
      this.$emit('input', el.innerHTML);

      const range = getPrecedingRange();
      if (range) {
        const { atItems, avoidEmail, allowSpaces, showUnique } = this;

        let show = true;
        const text = range.toString();

        const { at, index } = getAtAndIndex(text, atItems);

        if (index < 0) show = false;
        const prev = text[index - 1];

        const chunk = text.slice(index + at.length, text.length);

        if (avoidEmail) {
          // 上一个字符不能为字母数字 避免与邮箱冲突
          // 微信则是避免 所有字母数字及半角符号
          if (/^[a-z0-9]$/i.test(prev)) show = false;
        }

        if (!allowSpaces && /\s/.test(chunk)) {
          show = false;
        }

        // chunk以空白字符开头不匹配 避免`@ `也匹配
        if (/^\s/.test(chunk)) show = false;

        if (!show) {
          this.closePanel();
        } else {
          const { members, filterMatch, itemName } = this;
          if (!keep && chunk) { // fixme: should be consistent with AtTextarea.vue
            this.$emit('at', chunk);
          }
          const matched = members.filter(v => {
            const name = itemName(v);
            return filterMatch(name, chunk, at)
          });

          show = false;
          if (matched.length) {
            show = true;
            if (!showUnique) {
              let item = matched[0];
              if (chunk === itemName(item)) {
                show = false;
              }
            }
          }

          if (show) {
            this.openPanel(matched, range, index, at);
          } else {
            this.closePanel();
          }
        }
      }
    },

    closePanel () {
      if (this.atwho) {
        this.atwho = null;
      }
    },
    openPanel (list, range, offset, at) {
      const fn = () => {
        const r = range.cloneRange();
        r.setStart(r.endContainer, offset + at.length); // 从@后第一位开始
        // todo: 根据窗口空间 判断向上或是向下展开
        const rect = r.getClientRects()[0];
        this.atwho = {
          range,
          offset,
          list,
          x: rect.left,
          y: rect.top - 4,
          cur: 0 // todo: 尽可能记录
        };
      };
      if (this.atwho) {
        fn();
      } else { // 焦点超出了显示区域 需要提供延时以移动指针 再计算位置
        setTimeout(fn, 10);
      }
    },

    scrollToCur () {
      const curEl = this.$refs.cur[0];
      const scrollParent = curEl.parentElement.parentElement; // .atwho-view
      scrollIntoView(curEl, scrollParent);
    },
    selectByMouse (e) {
      const el = closest(e.target, d => {
        return d.getAttribute('data-index')
      });
      const cur = +el.getAttribute('data-index');
      this.atwho = {
        ...this.atwho,
        cur
      };
    },
    selectByKeyboard (e) {
      const offset = e.keyCode === 38 ? -1 : 1;
      const { cur, list } = this.atwho;
      const nextCur = this.loop
        ? (cur + offset + list.length) % list.length
        : Math.max(0, Math.min(cur + offset, list.length - 1));
      this.atwho = {
        ...this.atwho,
        cur: nextCur
      };
    },

    // todo: 抽离成库并测试
    insertText (text, r) {
      r.deleteContents();
      const node = r.endContainer;
      if (node.nodeType === Node.TEXT_NODE) {
        const cut = r.endOffset;
        node.data = node.data.slice(0, cut) +
          text + node.data.slice(cut);
        r.setEnd(node, cut + text.length);
      } else {
        const t = document.createTextNode(text);
        r.insertNode(t);
        r.setEndAfter(t);
      }
      r.collapse(false); // 参数在IE下必传
      applyRange(r);
      this.dispatchInput();
    },

    insertHtml (html, r) {
      r.deleteContents();
      const node = r.endContainer;
      var newElement = document.createElement('span');

      // Seems `contentediable=false` should includes spaces,
      // otherwise, caret can't be placed well across them
      newElement.appendChild(document.createTextNode(' '));
      newElement.appendChild(this.htmlToElement(html));
      newElement.appendChild(document.createTextNode(' '));
      newElement.setAttribute('data-at-embedded', '');
      newElement.setAttribute("contenteditable", false);

      if (node.nodeType === Node.TEXT_NODE) {
        const cut = r.endOffset;
        var secondPart = node.splitText(cut);
        node.parentNode.insertBefore(newElement, secondPart);
        r.setEndBefore(secondPart);
      } else {
        const t = document.createTextNode(suffix);
        r.insertNode(newElement);
        r.setEndAfter(newElement);
        r.insertNode(t);
        r.setEndAfter(t);
      }
      r.collapse(false); // 参数在IE下必传
      applyRange(r);
    },

    insertItem () {
      const { range, offset, list, cur } = this.atwho;
      const { suffix, atItems, itemName, customsEmbedded } = this;
      const r = range.cloneRange();
      const text = range.toString();
      const { at, index } = getAtAndIndex(text, atItems);

      // Leading `@` is automatically dropped as `customsEmbedded=true`
      // You can fully custom the output inside the embedded slot
      const start = customsEmbedded ? index : index + at.length;
      r.setStart(r.endContainer, start);

      // hack: 连续两次 可以确保click后 focus回来 range真正生效
      applyRange(r);
      applyRange(r);
      const curItem = list[cur];

      if (customsEmbedded) {
        // `suffix` is ignored as `customsEmbedded=true` has to be
        // wrapped around by spaces
        const html = this.$refs.embeddedItem.firstChild.innerHTML;
        this.insertHtml(html, r);
      } else {
        const t = itemName(curItem) + suffix;
        this.insertText(t, r);
      }

      this.$emit('insert', curItem);
      this.handleInput();
    },
    htmlToElement (html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }
  }
};

script$1.__file = "src/At.vue";

var textareaCaret = {exports: {}};

/* jshint browser: true */

(function (module) {
(function () {

// We'll copy the properties below into the mirror div.
// Note that some browsers, such as Firefox, do not concatenate properties
// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
// so we have to list every single property explicitly.
var properties = [
  'direction',  // RTL support
  'boxSizing',
  'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflowX',
  'overflowY',  // copy the scrollbar for IE

  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',

  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',

  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',  // might not make a difference, but better be safe

  'letterSpacing',
  'wordSpacing',

  'tabSize',
  'MozTabSize'

];

var isBrowser = (typeof window !== 'undefined');
var isFirefox = (isBrowser && window.mozInnerScreenX != null);

function getCaretCoordinates(element, position, options) {
  if (!isBrowser) {
    throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
  }

  var debug = options && options.debug || false;
  if (debug) {
    var el = document.querySelector('#input-textarea-caret-position-mirror-div');
    if (el) el.parentNode.removeChild(el);
  }

  // The mirror div will replicate the textarea's style
  var div = document.createElement('div');
  div.id = 'input-textarea-caret-position-mirror-div';
  document.body.appendChild(div);

  var style = div.style;
  var computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;  // currentStyle for IE < 9
  var isInput = element.nodeName === 'INPUT';

  // Default textarea styles
  style.whiteSpace = 'pre-wrap';
  if (!isInput)
    style.wordWrap = 'break-word';  // only for textarea-s

  // Position off-screen
  style.position = 'absolute';  // required to return coordinates properly
  if (!debug)
    style.visibility = 'hidden';  // not 'display: none' because we want rendering

  // Transfer the element's properties to the div
  properties.forEach(function (prop) {
    if (isInput && prop === 'lineHeight') {
      // Special case for <input>s because text is rendered centered and line height may be != height
      style.lineHeight = computed.height;
    } else {
      style[prop] = computed[prop];
    }
  });

  if (isFirefox) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > parseInt(computed.height))
      style.overflowY = 'scroll';
  } else {
    style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  div.textContent = element.value.substring(0, position);
  // The second special handling for input type="text" vs textarea:
  // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
  if (isInput)
    div.textContent = div.textContent.replace(/\s/g, '\u00a0');

  var span = document.createElement('span');
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textarea's content into the <span> created at the caret position.
  // For inputs, just '.' would be enough, but no need to bother.
  span.textContent = element.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
  div.appendChild(span);

  var coordinates = {
    top: span.offsetTop + parseInt(computed['borderTopWidth']),
    left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
    height: parseInt(computed['lineHeight'])
  };

  if (debug) {
    span.style.backgroundColor = '#aaa';
  } else {
    document.body.removeChild(div);
  }

  return coordinates;
}

{
  module.exports = getCaretCoordinates;
}

}());
}(textareaCaret));

var getCaretCoordinates = textareaCaret.exports;

var script = {
  extends: script$1,
  name: 'AtTextarea',
  computed: {
    style () {
      if (this.atwho) {
        const { list, cur, x, y } = this.atwho;
        const { wrap } = this.$refs;
        const el = this.$el.querySelector('textarea');
        if (wrap) {
          const left = x + el.offsetLeft - el.scrollLeft + 'px';
          const top = y + el.offsetTop - el.scrollTop + 'px';
          return { left, top }
        }
      }
      return null
    }
  },
  methods: {
    handleValueUpdate (value) {
      const el = this.$el.querySelector('textarea');
      if (value !== el.value) { // avoid range reset
        el.value = value;
        this.dispatchInput();
      }
    },
    dispatchInput () {
      let el = this.$el.querySelector('textarea');
      let ev = new Event('input', { bubbles: true });
      el.dispatchEvent(ev);
    },

    handleDelete (e) {
      const el = this.$el.querySelector('textarea');
      const text = el.value.slice(0, el.selectionEnd);
      if (text) {
        const { atItems, members, suffix, deleteMatch, itemName } = this;
        const { at, index } = getAtAndIndex(text, atItems);
        if (index > -1) {
          const chunk = text.slice(index + at.length);
          const has = members.some(v => {
            const name = itemName(v);
            return deleteMatch(name, chunk, suffix)
          });
          if (has) {
            el.value = el.value.slice(0, index) +
              el.value.slice(el.selectionEnd - 1);
            el.selectionStart = index + 1;
            el.selectionEnd = index + 1;
            this.handleInput();
          }
        }
      }
    },

    handleInput (keep) {
      if (this.hasComposition) return
      const el = this.$el.querySelector('textarea');
      this.$emit('input', el.value);

      const text = el.value.slice(0, el.selectionEnd);
      if (text) {
        const { atItems, avoidEmail, allowSpaces } = this;
        let show = true;
        const { at, index } = getAtAndIndex(text, atItems);
        if (index < 0) show = false;
        const prev = text[index - 1];
        const chunk = text.slice(index + at.length, text.length);
        if (avoidEmail) {
          // 上一个字符不能为字母数字 避免与邮箱冲突
          // 微信则是避免 所有字母数字及半角符号
          if (/^[a-z0-9]$/i.test(prev)) show = false;
        }
        if (!allowSpaces && /\s/.test(chunk)) {
          show = false;
        }

        // chunk以空白字符开头不匹配 避免`@ `也匹配
        if (/^\s/.test(chunk)) show = false;
        if (!show) {
          this.closePanel();
        } else {
          const { members, filterMatch, itemName } = this;
          if (!keep) { // fixme: should be consistent with At.vue
            this.$emit('at', chunk);
          }
          const matched = members.filter(v => {
            const name = itemName(v);
            return filterMatch(name, chunk, at)
          });
          if (matched.length) {
            this.openPanel(matched, chunk, index, at, keep);
          } else {
            this.closePanel();
          }
        }
      } else {
        this.closePanel();
      }
    },

    openPanel (list, chunk, offset, at) {
      const fn = () => {
        const el = this.$el.querySelector('textarea');
        const atEnd = offset + at.length; // 从@后第一位开始
        const rect = getCaretCoordinates(el, atEnd);
        this.atwho = {
          chunk,
          offset,
          list,
          atEnd,
          x: rect.left,
          y: rect.top - 4,
          cur: 0, // todo: 尽可能记录
        };
      };
      if (this.atwho) {
        fn();
      } else { // 焦点超出了显示区域 需要提供延时以移动指针 再计算位置
        setTimeout(fn, 10);
      }
    },

    // todo: 抽离成库并测试
    insertText (text, ta) {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      ta.value = ta.value.slice(0, start) +
        text + ta.value.slice(end);
      const newEnd = start + text.length;
      ta.selectionStart = newEnd;
      ta.selectionEnd = newEnd;
      this.dispatchInput();
    },
    insertItem () {
      const { chunk, offset, list, cur, atEnd } = this.atwho;
      const { suffix, atItems, itemName } = this;
      const el = this.$el.querySelector('textarea');
      const text = el.value.slice(0, atEnd);
      const { at, index } = getAtAndIndex(text, atItems);
      const start = index + at.length; // 从@后第一位开始
      el.selectionStart = start;
      el.focus(); // textarea必须focus回来
      const curItem = list[cur];
      const t = itemName(curItem) + suffix;
      this.insertText(t, el);
      this.$emit('insert', curItem);
      this.handleInput();
    }
  }
};

script.__file = "src/AtTextarea.vue";

const vueAt = script$1;
const AtTextarea = script;

export { AtTextarea, vueAt };
