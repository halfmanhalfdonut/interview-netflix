export default class Video {
  constructor(data) {
    this.data = data;
  }

  /**
   * Build the video HTML
   *
   * @returns {String} - HTML representation of a video
   */
  getHtml() {
    return `<img src="${this.data.boxart}" class="boxshot">`;
  }
}