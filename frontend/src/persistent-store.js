export function loadState() {
  try {
    const rawState = localStorage.getItem('state');

    if (!rawState) {
      return undefined;
    }

    return JSON.parse(rawState);
  } catch (e) {
    console.error('Error while loading state from localStorage', e);
    return undefined;
  }
}

export function saveState (state) {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error('Error while saving state to localStorage', e);
  }
};

export default {
  loadState,
  saveState
}
