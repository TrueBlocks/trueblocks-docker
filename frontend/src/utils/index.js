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
let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

//----------------------------------------------------------------
let isAddress = function(addr) {
  return addr && (addr.length === 42 && addr.substring(0, 2) === '0x');
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

// TODO(tjayush): this needs to be configurable
const apiProvider = 'http://localhost:8080/';
//----------------------------------------------------------------
let queryAPI_get = function(cmd, params) {
  //  console.log('GET: ', apiProvider, cmd, '?', params);
  if (cmd === 'ping') return { data: [{}] };
  const url = apiProvider + cmd + '?' + params;
  return fetch(url);
};

//----------------------------------------------------------------
let queryAPI_put = function(cmd, params, body) {
  console.log('PUT: ', apiProvider, cmd, '?', params);
  if (cmd === 'ping') return { json: {} };
  const url = apiProvider + cmd + '?' + params;
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  });
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
  isNumber,
  isAddress,
  queryAPI_get,
  queryAPI_put,
  to_key
};
