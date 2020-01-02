//----------------------------------------------------------------------
export const BEGIN = 'caches_/BEGIN';
export const FAILURE = 'caches_/FAILURE';

export const ADD = 'caches_/ADD';
export const EDIT = 'caches_/EDIT';
export const UNDELETE = 'caches_/UNDELETE';
export const DELETE = 'caches_/DELETE';
export const REMOVE = 'caches_/REMOVE';

export const CACHE_OVERVIEW = 'status/modes=caches&types=all';
export const BLOCK_CACHE = 'status/modes=caches&types=blocks&details&depth=2';
export const TRANSACTION_CACHE = 'status/modes=caches&types=transactions&details&depth=2';
export const TRACE_CACHE = 'status/modes=caches&types=traces&details&depth=2';
export const SLURPS = 'status/modes=caches&types=slurps&details&depth=2';

//----------------------------------------------------------------------
export const caches_menu = [
  {
    page: 'Caches',
    items: [
      { header: 'Cache Overview', value: 'VAL', action: CACHE_OVERVIEW },
      { header: 'Block Cache', value: 'VAL', action: BLOCK_CACHE },
      { header: 'Transaction Cache', value: 'VAL', action: TRANSACTION_CACHE },
      { header: 'Trace Cache', value: 'VAL', action: TRACE_CACHE },
      { header: 'Slurps', value: 'VAL', action: SLURPS },
      { header: 'ca-0005' },
      { header: 'ca-0006' }
    ],
    color: 'tan'
  }
];
