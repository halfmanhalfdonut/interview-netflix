export default class Billboard {
  constructor(video, billboard) {
    this.video = video;
    this.billboard = billboard;
  }

  /**
   * Build the billboard HTML
   *
   * @returns {String} - HTML representation of a billboard
   */
  getHtml() {
    let background = this.video.background;
    let metadataClass = 'billboard-metadata';

    if (this.billboard.type === 'inline') {
      background = this.video.backgroundShort;
      metadataClass += ' hidden';
    }

    return `
      <img src="${background}" class="billboard-background">
      <div class="${metadataClass}">
        <img src="${this.video.logo}" class="billboard-metadata-logo">
        ${this.getSynopsisHtml()}
        ${this.getButtonsHtml()}
      </div>
    `;
  }

  /**
   * Build the HTML for a synopsis, if it has any
   *
   * @returns {String} - HTML for a synopsis IF it has anything, otherwise an empty string
   */
  getSynopsisHtml() {
    return this.synopsis ? `<p class="billboard-metadata-synopsis">${this.synopsis}</p>` : '';
  }

  /**
   * Build the HTML for buttons
   *
   * @returns {String} - HTML for billboard buttons
   */
  getButtonsHtml() {
    return this.billboard.buttons.reduce((memo, button) => {
      let extraClass = button.type === 'play' ? 'billboard-metadata-button-play' : '';
      return memo += `<button class="billboard-metadata-button ${extraClass}">${button.text}</button>`;
    }, '');
  }
}