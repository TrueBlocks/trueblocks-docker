//----------------------------------------------------------------
const queryAPI = (endpoint, cmd, params) => {
  if (cmd === 'ping') return {};
  console.log('------------------------');
  console.log('API call', endpoint, ' ', cmd, ' ', params);
  return fetch(`${endpoint}/` + cmd + '?' + params);
};

export default queryAPI;
