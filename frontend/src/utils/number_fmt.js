function fmtDouble_inner(value, decimals) {
  return parseFloat(Math.round(value * (10 ^ decimals)) / (10 ^ decimals)).toFixed(decimals);
}

function fmtInteger_inner(num) {
  return num !== undefined ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : num;
}

module.exports.fmtInteger = (num) => {
  return fmtInteger_inner(num);
};

module.exports.fmtDouble = (value, decimals) => {
  var raw = fmtDouble_inner(value, decimals);
  var i =
    fmtInteger_inner(raw.substring(0, raw.indexOf('.'))) +
    (raw.substring(raw.indexOf('.'), 1000) === '.000' ? '' : raw.substring(raw.indexOf('.'), 1000));
  return i;
};
