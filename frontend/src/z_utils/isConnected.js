function isConnected(chainStatus) {
  return chainStatus.client > 0;
}

export default isConnected;