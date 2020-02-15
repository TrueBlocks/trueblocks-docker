import reducer, {
  STATUS_TOGGLE,
  HELP_TOGGLE,
  MENU_TOGGLE
} from './reducers';

describe('SidePanel reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isStatusExpanded: true,
      isHelpExpanded: false,
      isMenuExpanded: true
    });
  });

  it('should handle STATUS_TOGGLE', () => {
    const state = {
      isStatusExpanded: true
    };

    expect(reducer(state, { type: STATUS_TOGGLE })).toEqual({
      isStatusExpanded: !state.isStatusExpanded
    });
  });

  it('should handle HELP_TOGGLE', () => {
    const state = {
      isHelpExpanded: true
    };

    expect(reducer(state, { type: HELP_TOGGLE })).toEqual({
      isHelpExpanded: !state.isHelpExpanded
    });
  });

  it('should handle MENU_TOGGLE', () => {
    const state = {
      isMenuExpanded: true
    };

    expect(reducer(state, { type: MENU_TOGGLE })).toEqual({
      isMenuExpanded: !state.isMenuExpanded
    });
  });
});
