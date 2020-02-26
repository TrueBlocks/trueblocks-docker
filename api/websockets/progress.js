module.exports = {
  createReportProgress(webSockets) {
    return function reportProgress(id, progress) {
      webSockets.broadcast({ action: 'progress', id, progress });
    };
  }
};
