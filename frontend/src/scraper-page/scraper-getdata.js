import queryAPI from '../z_utils/queryAPI';

//----------------------------------------------------------------
const SCRAPER_BEGIN = 'scraper/SCRAPER_BEGIN';
const SCRAPER_SUCCESS = 'scraper/SCRAPER_SUCCESS';
const SCRAPER_FAILURE = 'scraper/SCRAPER_FAILURE';

//----------------------------------------------------------------
const initialState = {
  indexData: {},
  isLoading: false,
  error: null
};

//----------------------------------------------------------------
export default (state = initialState, action) => {
  console.log('scraper', state, action);
  switch (action.type) {
    case SCRAPER_BEGIN:
      return {
        ...state,
        isLoading: true
      };

    case SCRAPER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        indexData: action.payload
      };

    case SCRAPER_FAILURE:
      return {
        ...state,
        isLoading: false,
        indexData: {},
        error: action.e
      };

    default:
      return state;
  }
};

//----------------------------------------------------------------
export const Scraper_reducer = () => {
  return (dispatch, getState) => {
    dispatch({
      type: SCRAPER_BEGIN
    });

    return queryAPI(getState().getSettings.apiProvider, 'ping', '')
      .then(async (res) => {
        let json = await res.json();
        dispatch({
          type: SCRAPER_SUCCESS,
          payload: json
        });
        return json;
      })
      .catch((e) => {
        dispatch({
          type: SCRAPER_FAILURE,
          e
        });
      });
  };
};
