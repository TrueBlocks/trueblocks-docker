import reducer, {
  BEGIN,
  SUCCESS,
  FAILURE
} from './reducers';

describe('StatusPanel reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      systemData: {},
      unripe: -1,
      staging: -1,
      finalized: -1,
      client: -1,
      isConnected: false,
      error: null
    });
  });

  it('should handle BEGIN', () => {
    expect(reducer({}, { type: BEGIN })).toEqual({
      error: null
    });
  });

  it('should handle SUCCESS', () => {
    const payload = {
      data: {},
      meta: {
        unripe: 1,
        staging: 1,
        finalized: 1,
        client: 1
      }
    };

    expect(reducer({}, { type: SUCCESS, payload })).toEqual({
      isConnected: true,
      error: null,
      systemData: payload.data,
      unripe: payload.meta.unripe,
      staging: payload.meta.staging,
      finalized: payload.meta.finalized,
      client: payload.meta.client
    });
  });

  it('should handle FAILURE', () => {
    const err = 'Error';

    expect(reducer({}, { type: FAILURE, err })).toEqual({
      isConnected: false,
      error: err,
      systemData: {},
      unripe: -1,
      staging: -1,
      finalized: -1,
      client: -1
    });
  });
});
