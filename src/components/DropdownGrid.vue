<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "DropdownGrid",
  directives: {
    ClickOutside,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedItem: {
      type: [String, Number],
      default: null,
    },
    isIndexBased: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: "right", // "left" or "right"
    },
    caretPosition: {
      type: [Boolean, String],
      default: "right", // "left", "right" or false
    },
    numberOfColumns: {
      type: Number,
      default: 12,
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    close() {
      this.isOpened = false;
    },
    toggle() {
      this.isOpened = !this.isOpened;
    },
  },
  computed: {
    currentValue() {
      if (!this.isIndexBased) return this.selectedItem;
      return this.selectedItem < 0
        ? `below ${this.items[0]}`
        : this.selectedItem > this.items.length - 1
        ? `above ${this.items[this.items.length - 1]}`
        : this.items[this.selectedItem];
    },
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(${this.numberOfColumns}, 1fr)`,
      };
    },
  },
};
</script>

<template>
  <div class="dropdown" v-click-outside="close">
    <div @click="toggle" :class="['selector', `caret${caretPosition}`]">
      {{ currentValue }}
    </div>
    <ul :class="['grid', { active: isOpened }, position]" :style="gridStyle">
      <li
        v-for="(item, i) of items"
        :key="`list-item-${item}-${i}`"
        @click="$emit('setItem', isIndexBased ? i : item)"
        :class="[
          'gridItem',
          { active: selectedItem === (isIndexBased ? i : item) },
        ]"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

.dropdown {
  position: relative;
}

.selector {
  position: relative;
  padding: $s-s $s-xl;
  color: $c-brink-pink;
  border: 1px solid $c-brink-pink;
  border-radius: $base-radius;
  text-align: center;
  cursor: pointer;
  &::after {
    position: absolute;
    top: 50%;
    right: $s-m;
    content: "";
    width: 0;
    height: 0;
    border-left: $s-xs solid transparent;
    border-right: $s-xs solid transparent;
    border-top: $s-s solid $c-brink-pink;
    transform: translateY(-50%);
    opacity: 0;
  }
  &.caretleft::after {
    right: unset;
    left: $s-m;
    opacity: 1;
  }
  &.caretright::after {
    right: $s-m;
    left: unset;
    opacity: 1;
  }
}

.grid {
  position: absolute;
  top: $s-xl;
  right: 0;
  z-index: $z-dropdown;
  display: grid;
  grid-gap: $s-s;
  align-items: center;
  min-width: 80vw;
  max-width: calc(100vw - #{$s-xxxl - $s-l});
  padding: $s-l;
  background: transparentize(darken($c-persian-indigo, 15%), 0.2);
  text-align: center;
  list-style: none;
  border-radius: $base-radius;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-out;
  overflow-x: auto;
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
  &.left {
    right: unset;
    left: 0;
  }
  &.right {
    right: 0;
    left: unset;
  }
}

.gridItem {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
  padding: $s-s;
  border: 1px solid $c-persian-indigo;
  border-radius: $base-radius;
  color: $c-silver;
  cursor: pointer;
  &:hover {
    border: 1px solid $c-brink-pink;
  }
  &.active {
    background: $c-brink-pink;
  }
}

@include desktop {
  .grid {
    min-width: unset;
  }
  .gridItem {
    min-width: unset;
    min-height: unset;
  }
}
</style>
