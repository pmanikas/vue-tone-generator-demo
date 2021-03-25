<script>
export default {
  name: "FrequencySlider",
  props: {
    value: {
      type: [Number, String],
      default: "1385",
    },
  },
};
</script>

<template>
  <div class="frequencySlider">
    <input
      @input="$emit('updateValue', $event.target.value)"
      class="input"
      type="range"
      min="0"
      max="2770"
      :value="value"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

/*Chrome*/
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"] {
    overflow: hidden;
    // width: 80px;
    -webkit-appearance: none;
    background-color: #9a905d;
    border-radius: $base-radius;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 20px;
    -webkit-appearance: none;
    margin-top: -1px;
  }

  input[type="range"]::-webkit-slider-thumb {
    position: relative;
    width: 20px;
    -webkit-appearance: none;
    height: 20px;
    cursor: ew-resize;
    background: #434343;
    box-shadow: -101vw 0 0 100vw #43e5f7;
    border-radius: 50%;
  }
}
/** FF*/
input[type="range"]::-moz-range-progress {
  background-color: #43e5f7;
}
input[type="range"]::-moz-range-track {
  background-color: #9a905d;
}
/* IE*/
input[type="range"]::-ms-fill-lower {
  background-color: #43e5f7;
}
input[type="range"]::-ms-fill-upper {
  background-color: #9a905d;
}

.frequencySlider {
  margin: $s-m 0;
}

.input {
  width: 100%;
  cursor: pointer;
  &::focus {
    outline: none;
  }
  // &::-webkit-slider-thumb {
  //   height: 16px;
  //   width: 16px;
  // }
}
</style>
