import Emitter from "component-emitter";
import soundConfig from "./../config/sound.config";

export default () => {
  const {
    DEFAULT_FREQUENCY,
    DEFAULT_TYPES,
    DEFAULT_TYPE,
    DEFAULT_FADE_DURATION,
    DEFAULT_BASE_NOTE,
    DEFAULT_NOTES,
  } = soundConfig;

  const DEFAULT_NOTE_INDEX = DEFAULT_NOTES.findIndex(
    (note) => note === DEFAULT_BASE_NOTE
  );

  let context = null;
  let osc = null; // osc stands for oscillator
  let gainNode = null;

  const events = Emitter({});
  const on = (event, arg) => events.on(event, arg);
  const off = (event) => events.off(event);
  const emitStatusUpdate = (status) => events.emit("statusUpdate", status);
  const emitDataUpdate = (data) => events.emit("dataUpdate", data);
  const emitTypeUpdate = (type) => events.emit("typeUpdate", type);

  const getInitialData = () => {
    return {
      frequency: DEFAULT_FREQUENCY,
      types: DEFAULT_TYPES,
      type: DEFAULT_TYPE,
      noteIndex: DEFAULT_NOTE_INDEX,
      notes: DEFAULT_NOTES,
    };
  };

  const getNoteIndexfromFrequence = (selectedFrequence, baseFrequency) => {
    return Math.round(
      Math.log(selectedFrequence / baseFrequency) /
        Math.log(Math.pow(2, 1 / 12))
    );
  };

  const getFrequenceFromNoteIndex = (noteIndex, defaultFrequency) => {
    return Math.round(
      defaultFrequency *
        Math.pow(Math.pow(2, 1 / 12), noteIndex - DEFAULT_NOTE_INDEX)
    );
  };

  const isPlaying = () => !!osc;

  const setType = (type) => {
    if (isPlaying()) osc.type = type;
    emitTypeUpdate(type);
  };

  const setFrequency = (frequency) => {
    if (isPlaying()) osc.frequency.value = frequency;
    const noteIndex =
      getNoteIndexfromFrequence(frequency, DEFAULT_FREQUENCY) +
      DEFAULT_NOTE_INDEX;
    emitDataUpdate({ frequency, noteIndex });
  };

  const setNoteIndex = (noteIndex) => {
    const frequency = getFrequenceFromNoteIndex(noteIndex, DEFAULT_FREQUENCY);
    if (isPlaying()) osc.frequency.value = frequency;
    emitDataUpdate({ frequency, noteIndex });
  };

  const setVolume = (volume) => {
    if (isPlaying && gainNode) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        volume,
        context.currentTime + DEFAULT_FADE_DURATION
      );
    }
  };

  const start = ({
    frequency = DEFAULT_FREQUENCY,
    type = DEFAULT_TYPE,
    volume,
  }) => {
    context = new (window.AudioContext || window.webkitAudioContext)();

    gainNode = context.createGain();
    gainNode.gain.value = volume;
    gainNode.connect(context.destination);

    osc = context.createOscillator();
    osc.frequency.value = frequency;
    osc.type = type;
    osc.connect(gainNode);
    osc.start();

    emitStatusUpdate(true);
  };

  // eslint-disable-next-line no-unused-vars
  const stop = (fadeDuration = DEFAULT_FADE_DURATION) => {
    if (!isPlaying()) return;
    gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + fadeDuration
    );

    gainNode = null;
    osc = null;

    emitStatusUpdate(false);
  };

  const togglePlayer = ({ frequency, type, volume }) => {
    isPlaying() ? stop() : start({ frequency, type, volume });
  };

  return {
    on,
    off,
    getInitialData,
    setFrequency,
    setNoteIndex,
    setType,
    setVolume,
    togglePlayer,
    start,
    stop,
  };
};
