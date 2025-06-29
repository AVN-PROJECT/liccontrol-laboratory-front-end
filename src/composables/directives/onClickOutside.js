const onClickOutside = {
  beforeMount(el, binding) {
    el._handler = (el, binding) => {
      return () => {
        if (!el.contains(event.target)) {
          binding.value();
        }
      };
    };

    window.addEventListener('mousedown', el._handler(el, binding));
  },
  unmounted(el) {
    window.removeEventListener('mousedown', el._handler);

    delete el._handler;
  },
};

export default onClickOutside;
