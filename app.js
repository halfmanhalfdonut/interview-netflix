import UI from './UI.js';

/**
 * In addition to setting up the view, we need to add a listener
 * to handle any "hidden" elements. When they scroll into view,
 * we want the "hidden" class to be removed, which will trigger
 * a CSS transition.
 *
 * When all "hidden" elements are viewed, the listener can be
 * removed and cleaned up.
 */
const setupListener = () => {
  let timer = null;

  const handleScroll = event => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let elements = document.getElementsByClassName('hidden');

      if (elements.length > 0) {
        [].forEach.call(elements, element => {
          if (window.pageYOffset + window.innerHeight >= element.getBoundingClientRect().top + window.pageYOffset) {
            element.classList.remove('hidden');
          }
        });
      } else {
        // No more hidden elements, clean up this listener
        document.removeEventListener('scroll', handleScroll);
      }
    }, 20);
  };

  document.addEventListener('scroll', handleScroll);
};

export function render(data) {
  new UI(data);
  setupListener();
};