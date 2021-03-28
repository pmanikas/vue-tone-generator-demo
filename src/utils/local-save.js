export default {
  get(key, type = "localStorage") {
    return JSON.parse(window[type].getItem(key));
  },
  save(key, state, type = "localStorage") {
    window[type].setItem(key, JSON.stringify(state));
  },
  delete(key, type = "localStorage") {
    window[type].removeItem(key);
  },

  clear(type = "localStorage") {
    window[type].clear();
  },
};
