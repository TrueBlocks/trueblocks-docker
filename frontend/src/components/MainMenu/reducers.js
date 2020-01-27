export const MAIN_MENU_TOGGLE = 'mainMenu/TOGGLE';

const initialState = {
  isMainMenuExpanded: true
};

export default function reducer_MainMenu(state = initialState, action) {
  if (action.type !== MAIN_MENU_TOGGLE) return state;

  return {
    ...state,
    isMainMenuExpanded: !state.isMainMenuExpanded
  };
}
