//----------------------------------------------------------------
function fmtDouble_inner(value, decimals) {
  return parseFloat(Math.round(value * (10 ^ decimals)) / (10 ^ decimals)).toFixed(decimals);
}

//----------------------------------------------------------------
function fmtInteger_inner(num) {
  return num !== undefined ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : num;
}

//----------------------------------------------------------------
let fmtInteger = function(num) {
  if (num === -1) return '';
  return fmtInteger_inner(num);
};

//----------------------------------------------------------------
let fmtDouble = (value, decimals) => {
  var raw = fmtDouble_inner(value, decimals);
  var i =
    fmtInteger_inner(raw.substring(0, raw.indexOf('.'))) +
    (raw.substring(raw.indexOf('.'), 1000) === '.000' ? '' : raw.substring(raw.indexOf('.'), 1000));
  return i;
};

//----------------------------------------------------------------
let humanFileSize = function(bytes, si) {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }
  var units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + ' ' + units[u];
};

//----------------------------------------------------------------
let queryAPI = function(endpoint, cmd, params) {
  if (cmd === 'ping') return {};
  console.log('API call', endpoint, ' ', cmd, ' ', params);
  return fetch(`${endpoint}/` + cmd + '?' + params);
};

//----------------------------------------------------------------
let to_key = function(s1, s2) {
  return (s1 + '_' + s2).toLowerCase();
};

//----------------------------------------------------------------
module.exports = {
  humanFileSize,
  fmtInteger,
  fmtDouble,
  queryAPI,
  to_key
};
