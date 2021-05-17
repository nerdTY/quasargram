import { Platform } from "quasar";

export const autofocus = {
  inserted(el, binding) {
    let input = el.querySelector(".q-field__native");
    let delay = 0;
    if (Platform.is.capacitor) {
      delay = 1000;
      if (binding.value) {
        delay = binding.value.delayCordova;
      }
    }
    setTimeout(() => {
      input.focus();
    }, delay);
  },
};
