module.exports = {
  /**
   * Locates the UI and returns the URL to it. Should return react dev server URL
   * in development mode, or a file:// path to the built index.html
   * @param {boolean} developmentMode - true if in development mode.
   */
  getUiUrl(developmentMode) {
    if (developmentMode) {
      return process.env.ELECTRON_UI_URL;
    }

    return url.format({
      pathname: path.join(__dirname, '../frontend/build/index.html'),
      protocol: 'file:'
    });
  }
};
