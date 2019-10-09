module.exports.fmtDouble = (value, decimals) => {
    return parseFloat(Math.round(value * (10^decimals)) / (10^decimals)).toFixed(decimals);
}