<script>
import soundServiceCreator from "../services/sound.service";
import FrequencySlider from "./FrequencySlider";
import soundConfig from "../config/sound.config";
import DropdownGrid from "./../components/DropdownGrid";

const soundService = soundServiceCreator();

const { DEFAULT_VOLUME } = soundConfig;

export default {
  name: "ToneGenerator",
  components: { FrequencySlider, DropdownGrid },
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
    changeVolumeHandler(e) {
      this.volume = e.target.value;
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
  <div class="freqGenerator">
    <h1 class="title">Tone Generator</h1>

    <div class="adjustments">
      <div class="waveTypes">
        <DropdownGrid
          @setItem="changeTypeButtonHandler"
          :items="types"
          :selectedItem="type"
          :is-index-based="false"
          position="left"
          caret-position="left"
        />
      </div>
      <h2 class="frequencyValue">{{ frequency }} Hz</h2>
      <DropdownGrid
        @setItem="changeNoteIndexHandler"
        :items="notes"
        :selectedItem="noteIndex"
      />
    </div>

    <FrequencySlider
      :value="sliderValue"
      @updateValue="changeFrequencyHandler"
    />

    <div class="controls">
      <button @click="togglePlayButtonHandler" class="togglePlayButton">
        {{ isPlaying ? "Stop" : "Play" }}
      </button>
      <div class="volume">
        <input
          @input="changeVolumeHandler"
          class="volumeSlider"
          type="range"
          :min="0"
          :max="100"
          :value="volume"
        />
        {{ volume }} %
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "./../styles/design" as *;

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

.volumeSlider {
  margin-right: $s-m;
}

.button {
  &.active {
    background: $c-eastern-blue;
  }
}
</style>
