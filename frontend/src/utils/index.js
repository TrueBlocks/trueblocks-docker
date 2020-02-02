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
let isHex = function(str) {
  if (typeof str !== 'string') return false;
  return str.substring(0, 2) === '0x' && (str.length === 10 || str.length === 42 || str.length === 66);
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
  //  console.log('PUT: ', apiProvider, cmd, '?', params);
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

//----------------------------------------------------------------------
const findMenu = (page, menu, match) => {
  var ret = { subpage: page, route: '', query: '' };
  if (menu.items && menu.items.length > 0) {
    ret.subpage = menu.items[0].subpage;
    ret.route = menu.items[0].route;
    ret.query = menu.items[0].query;
    if (match.url !== '/' + page) {
      if (match.params) {
        ret.subpage = match.params.subpage;
        var res = match.params.query.split('+');
        ret.route = res[0];
        ret.query = res[1];
      }
    }
  }
  return ret;
};

//----------------------------------------------------------------------
const nParts = (haystack) => {
  return (haystack.match(/\//g) || []).length;
};

//----------------------------------------------------------------------
const getBang = (num) => {
  var bangs = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'];
  if (num === 20) return 'twenty_bang';
  if (num > 11) num = 11;
  return bangs[num] + '_bang';
};

//----------------------------------------------------------------
function getKeys(str) {
  return { key: str, parentKey: str };
}

//----------------------------------------------------------------
module.exports = {
  humanFileSize,
  fmtInteger,
  fmtDouble,
  isNumber,
  isHex,
  queryAPI_get,
  queryAPI_put,
  to_key,
  findMenu,
  nParts,
  getBang,
  getKeys
};
