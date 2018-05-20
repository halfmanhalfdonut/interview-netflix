import Billboard from './components/Billboard.js';
import Video from './components/Video.js';

export default class View {
  constructor(data) {
    this.rows = data.rows || [];
    this.billboards = data.billboards || [];
    this.videos = data.videos || [];

    document.getElementsByTagName('body')[0].innerHTML = this.getHtml();
    this.setupListener();
  }

  /**
   * We need to add a listener to handle any "hidden" elements.
   * When they scroll into view, we want the "hidden" class
   * to be removed, which will trigger a CSS transition.
   *
   * When all "hidden" elements are viewed, the listener can be
   * removed and cleaned up.
   */
  setupListener() {
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
  }

  /**
   * Build out the HTML for each row by reducing the array into an HTML String
   *
   * @returns {String}
   */
  getHtml() {
    return `<div class="gallery">${this.rows.reduce(this.getRowHtml.bind(this), '')}</div>`;
  }

  /**
   * For each row, determine if it's a billboard or a regular row of videos.
   * Then add the appropriate CSS class to the wrapping element.
   *
   * @param {String} memo - Accumulator for the reduce function
   * @param {Array<Array<Number>>} row - Array of row item(s)
   * @param {Number} rowIndex - Current row index used to find associated billboards
   *
   * @returns {String}
   */
  getRowHtml(memo, row, rowIndex) {
    let billboard = this.billboards.find(bb => rowIndex === bb.row);
    let rowClass = 'row-videos';

    if (billboard) {
      rowClass = 'row-billboard';
      if (billboard.type === 'inline') {
        rowClass += ' row-billboard-inline';
      }
    }

    return memo += `<div class="${rowClass}">${row.reduce((rowMemo, id) => rowMemo += this.getItemHtml(id, billboard), '')}</div>`;
  }

  /**
   * Build the HTML for a given item, whether it's a billboard or a regular video
   *
   * @param {Number} id - Video ID
   * @param {Object} [billboard] - Billboard metadata object
   *
   * @returns {String}
   */
  getItemHtml(id, billboard) {
    let html = '';
    let video = this.videos.find(video => id === video.id);

    if (billboard) {
      html += new Billboard(video, billboard).getHtml();
    } else {
      html += new Video(video).getHtml();
    }

    return html;
  }
}