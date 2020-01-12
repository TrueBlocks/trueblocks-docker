//----------------------------------------------------------------
export const STATUS_TOGGLE = 'sidePanel/status/TOGGLE';
export const HELP_TOGGLE = 'sidePanel/help/TOGGLE';

//----------------------------------------------------------------
const initialState = {
  isStatusExpanded: true,
  isHelpExpanded: false
};

//----------------------------------------------------------------
export default function reducer_SidePanels(state = initialState, action) {
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

    default:
      return state;
  }
}
