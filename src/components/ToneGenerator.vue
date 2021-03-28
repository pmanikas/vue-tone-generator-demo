<script>
import soundServiceCreator from "./../services/sound.service";
import RangeInput from "./RangeInput";
import soundConfig from "./../config/sound.config";
import DropdownGrid from "./DropdownGrid";
import Button from "./Button";

const soundService = soundServiceCreator();

const { DEFAULT_VOLUME } = soundConfig;

export default {
  name: "ToneGenerator",
  components: { RangeInput, DropdownGrid, Button },
  data() {
    return {
      soundService,
      isPlaying: null,
      volume: DEFAULT_VOLUME * 100,
      frequency: null,
      types: [],
      type: "",
      notes: [],
      noteIndex: null,
      sliderValue: "1385",
    };
  },
  mounted() {
    this.getInitialData();
    soundService.on("statusUpdate", (status) => {
      this.isPlaying = status;
    });
    soundService.on("dataUpdate", ({ frequency, noteIndex }) => {
      this.frequency = frequency;
      this.noteIndex = noteIndex;
      this.sliderValue = this.updateFrequencySlider(frequency);
    });
    soundService.on("typeUpdate", (type) => {
      this.type = type;
    });
  },
  destroyed() {
    soundService.off("statusUpdate");
    soundService.off("dataUpdate");
    soundService.off("typeUpdate");
  },
  methods: {
    getInitialData() {
      const {
        frequency,
        types,
        type,
        noteIndex,
        notes,
      } = soundService.getInitialData();
      this.frequency = frequency;
      this.types = types;
      this.type = type;
      this.noteIndex = noteIndex;
      this.notes = notes;
    },
    changeVolumeHandler(value) {
      this.volume = value;
      this.soundService.setVolume(Number(this.volume) / 100);
    },
    changeFrequencyHandler(value) {
      const frequency = Math.round(20 * Math.pow(1.0025, value) - 19);
      this.soundService.setFrequency(frequency);
    },
    updateFrequencySlider(frequency) {
      return Math.log((frequency + 19) / 20) / Math.log(1.0025);
    },
    changeNoteIndexHandler(i) {
      this.soundService.setNoteIndex(i);
    },
    togglePlayButtonHandler() {
      this.soundService.togglePlayer({
        frequency: this.frequency,
        type: this.type,
        volume: Number(this.volume) / 100,
      });
    },
    changeTypeButtonHandler(type) {
      this.soundService.setType(type);
    },
  },
};
</script>

<template>
  <div class="toneGenerator">
    <div class="adjustments">
      <div class="waveTypes">
        <DropdownGrid
          @setItem="changeTypeButtonHandler"
          :items="types"
          :selectedItem="type"
          :is-index-based="false"
          position="left"
          caret-position="left"
          :number-of-columns="types.length"
        />
      </div>
      <h2 class="frequency">
        <span class="frequencyValue">{{ frequency }} </span>Hz
      </h2>
      <DropdownGrid
        @setItem="changeNoteIndexHandler"
        :items="notes"
        :selectedItem="noteIndex"
      />
    </div>

    <RangeInput
      :value="sliderValue"
      @updateValue="changeFrequencyHandler"
      min="0"
      max="2770"
    />

    <div class="controls">
      <Button @pressed="togglePlayButtonHandler">
        {{ isPlaying ? "Stop" : "Play" }}
      </Button>
      <div class="volume">
        <RangeInput
          :value="volume"
          @updateValue="changeVolumeHandler"
          min="0"
          max="100"
          uiSize="small"
          theme="marine"
          class="volumeRange"
        />
        {{ volume }} %
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

::selection {
  background: transparent;
}

.adjustments {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.volume {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.volumeRange {
  margin-right: $s-m;
}

@include desktop {
  .frequencyValue {
    font-size: $s-xxl;
  }
}
</style>
