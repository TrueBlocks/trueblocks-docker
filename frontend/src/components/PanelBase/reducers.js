//----------------------------------------------------------------
export const STATUS_TOGGLE = 'sidePanel/status/TOGGLE';
export const HELP_TOGGLE = 'sidePanel/help/TOGGLE';
export const MENU_TOGGLE = 'sidePanel/menu/TOGGLE';

//----------------------------------------------------------------
const initialState = {
  isStatusExpanded: true,
  isHelpExpanded: false,
  isMenuExpanded: true
};

//----------------------------------------------------------------
export default function reducer_Panels(state = initialState, action) {
  switch (action.type) {
    case STATUS_TOGGLE:
      return {
        ...state,
        isStatusExpanded: !state.isStatusExpanded
      };

    case HELP_TOGGLE:
      return {
        ...state,
        isHelpExpanded: !state.isHelpExpanded
      };

    case MENU_TOGGLE:
      return {
        ...state,
        isMenuExpanded: !state.isMenuExpanded
      };

    default:
      return state;
  }
}
