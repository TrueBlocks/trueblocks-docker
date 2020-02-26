const progressModule = require('./progress');
const webSockets = require('./webSockets');

module.exports = {
  reportProgress: progressModule.createReportProgress(webSockets),
  ...webSockets
};
