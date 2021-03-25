<script>
export default {
  name: "DropdownGrid",
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
  },
  data() {
    return {
      isOpened: false,
    };
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
  },
};
</script>

<template>
  <div class="dropdownGrid">
    <div
      @click="isOpened = !isOpened"
      :class="['selector', `caret${caretPosition}`]"
    >
      {{ currentValue }}
    </div>
    <ul :class="['grid', { active: isOpened }, position]">
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

.dropdownGrid {
  position: relative;
}

.selector {
  position: relative;
  width: 130px;
  height: $s-xl;
  line-height: $s-xl;
  background: $c-san-juan-blue;
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
    border-top: $s-s solid $c-silver;
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
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap: $s-s;
  align-items: center;
  padding: $s-m;
  background: $c-mine-shaft;
  text-align: center;
  list-style: none;
  border-radius: $base-radius;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-out;
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
  padding: $s-s;
  background: $c-san-juan-blue;
  border-radius: $base-radius;
  cursor: pointer;
  &.active {
    background: $c-eastern-blue;
  }
}
</style>
