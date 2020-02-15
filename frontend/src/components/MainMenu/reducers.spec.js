import reducer, {
  MAIN_MENU_TOGGLE
} from './reducers';

describe('MainMenu reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isMainMenuExpanded: true
    });
  });

  it('should handle MAIN_MENU_TOGGLE', () => {
    const state = {
        isMainMenuExpanded: true
    };

    expect(reducer(state, { type: MAIN_MENU_TOGGLE })).toEqual({
      isMainMenuExpanded: !state.isMainMenuExpanded
    });
  });
});
