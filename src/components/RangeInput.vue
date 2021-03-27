<script>
export default {
  name: "FrequencySlider",
  props: {
    value: {
      type: [Number, String],
      default: "1385",
    },
    min: {
      type: [Number, String],
      default: "0",
    },
    max: {
      type: [Number, String],
      default: "100",
    },
    uiSize: {
      type: String,
      default: "large", // 'small', 'large'
    },
    theme: {
      type: String,
      default: "coral", // 'coral', 'marine', 'white'
    },
  },
};
</script>

<template>
  <div class="frequencySlider">
    <input
      @input="$emit('updateValue', $event.target.value)"
      :class="['input', uiSize, theme]"
      type="range"
      :min="min"
      :max="max"
      :value="value"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

.frequencySlider {
  margin: $s-xl 0;
}

.input {
  width: 100%;
  appearance: none;
  background: transparent;
  outline: none;
  cursor: pointer;
  &::focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    appearance: none;
    background: $c-brink-pink;
    border: none;
    border-radius: 50%;
    transition: opacity 0.3s ease-out;
    &:hover {
      box-shadow: 0px 0px $s-xl transparentize($c-brink-pink, 0.5);
    }
  }
  &::-moz-range-thumb {
    appearance: none;
    background: transparent;
    border: none;
    border-radius: 50%;
    opacity: 0.5;
    transition: opacity 0.3s ease-out;
    &:hover {
      opacity: 1;
      box-shadow: 0px 0px $s-xl transparentize($c-brink-pink, 0.5);
    }
  }
  &.small {
    height: $s-s;
    border-radius: 15px;
    &::-webkit-slider-thumb {
      height: $s-m;
      width: $s-m;
    }
    &::-moz-range-thumb {
      height: $s-m;
      width: $s-m;
    }
  }
  &.large {
    height: $s-l;
    border-radius: 10px;
    &::-webkit-slider-thumb {
      height: $s-xl;
      width: $s-xl;
    }
    &::-moz-range-thumb {
      height: $s-xl;
      width: $s-xl;
    }
  }
  &.coral {
    border: 1px solid $c-brink-pink;
    &::-webkit-slider-thumb {
      background: transparentize($c-brink-pink, 0.1);
    }
    &::-moz-range-thumb {
      background: transparentize($c-brink-pink, 0.1);
    }
  }
  &.marine {
    border: 1px solid $c-aqua-marine;
    &::-webkit-slider-thumb {
      background: transparentize($c-aqua-marine, 0.1);
    }
    &::-moz-range-thumb {
      background: transparentize($c-aqua-marine, 0.1);
    }
  }
}
</style>
