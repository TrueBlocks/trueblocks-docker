//----------------------------------------------------------------------
export const BEGIN = 'caches_/BEGIN';
export const FAILURE = 'caches_/FAILURE';

export const ADD = 'caches_/ADD';
export const EDIT = 'caches_/EDIT';
export const UNDELETE = 'caches_/UNDELETE';
export const DELETE = 'caches_/DELETE';
export const REMOVE = 'caches_/REMOVE';

export const OVERVIEW = 'status/modes=caches&types=all';
export const BLOCKS = 'status/modes=caches&types=blocks&details&depth=2';
export const TRANSACTIONS = 'status/modes=caches&types=transactions&details&depth=2';
export const TRACES = 'status/modes=caches&types=traces&details&depth=2';
export const SLURPS = 'status/modes=caches&types=slurps&details&depth=2';

//----------------------------------------------------------------------
export const caches_menu = [
  {
    page: 'Caches',
    items: [
      { header: 'Overview', value: 'VAL', action: OVERVIEW },
      { header: 'Blocks', value: 'VAL', action: BLOCKS },
      { header: 'Transactions', value: 'VAL', action: TRANSACTIONS },
      { header: 'Traces', value: 'VAL', action: TRACES },
      { header: 'Slurps', value: 'VAL', action: SLURPS },
      { header: 'ca-0005' },
      { header: 'ca-0006' }
    ],
    color: 'tan'
  }
];
