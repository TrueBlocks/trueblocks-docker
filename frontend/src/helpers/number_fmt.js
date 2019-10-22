module.exports.fmtDouble = (value, decimals) => {
    return parseFloat(Math.round(value * (10^decimals)) / (10^decimals)).toFixed(decimals);
}
module.exports.fmtInteger = (num) => {
    return (num !== undefined ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : num);
}
