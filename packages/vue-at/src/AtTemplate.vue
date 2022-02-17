<template>
  <div ref="wrap"
       class="atwho-wrap"
       @compositionstart="handleCompositionStart"
       @compositionend="handleCompositionEnd"
       @input="handleInput()"
       @keydown.capture="handleKeyDown"
  >
    <div v-if="atwho"
         class="atwho-panel"
         :style="style"
    >
      <div class="atwho-inner">
        <div class="atwho-view">
          <ul class="atwho-ul">
            <li v-for="(item, index) in atwho.list"
                class="atwho-li"
                :key="index"
                :class="isCur(index) && 'atwho-cur'"
                :ref="isCur(index) && 'cur'"
                :data-index="index"
                @mouseenter="handleItemHover"
                @click="handleItemClick"
            >
              <slot name="item" :item="item">
                <span v-text="itemName(item)"></span>
              </slot>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <span v-show="false" ref="embeddedItem">
      <slot name="embeddedItem" :current="currentItem"></slot>
    </span>
    <slot></slot>
  </div>
</template>


<style scoped>
.atwho-wrap {
  position: relative;
}

.atwho-panel {
  position: absolute;
}

.atwho-inner {
  position: relative;
}

.atwho-view {
  position: absolute;
  bottom: 0;
  left: -0.8em;
  cursor: default;
  background-color: hsla(0, 0%, 100%, .94);
  min-width: 140px;
  max-width: 180px;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 6px;
  box-shadow: 0 0 10px 0 hsl(211deg 9% 44% / 50%);
  color: #000;
  z-index: 11110 !important;
}

.atwho-ul {
  max-height: 135px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.atwho-li {
  box-sizing: border-box;
  height: 27px;
  padding: 0 12px;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.atwho-cur {
  background: #5bb8ff;
  color: #fff;
}
</style>
