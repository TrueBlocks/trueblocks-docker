//----------------------------------------------------------------------
export const BEGIN = 'indicie/BEGIN';
export const FAILURE = 'indicie/FAILURE';

export const EDIT = 'indicie/EDIT';
export const CREATE = 'indicie/CREATE';
export const UPDATE = 'indicie/UPDATE';
export const DELETE = 'indicie/DELETE';
export const UNDELETE = 'indicie/UNDELETE';
export const REMOVE = 'indicie/REMOVE';

export const FINALIZED = 'status/modes=index&details';
export const STAGED = 'status/modes=index';
export const UNRIPE = 'status/modes=index';
export const COLUMNS = 'status/modes=index';
export const SHARED = 'status/modes=index';

//----------------------------------------------------------------------
export const indicies_menu = [
  {
    page: 'Indicies',
    items: [
      { header: 'Finalized', value: 'VAL', action: FINALIZED },
      { header: 'Staged', value: 'VAL', action: STAGED },
      { header: 'Unripe', value: 'VAL', action: UNRIPE },
      { header: 'Columns', value: 'VAL', action: COLUMNS },
      { header: 'Shared', value: 'VAL', action: SHARED },
      { header: 'ind-0005' },
      { header: 'ind-0006' }
    ],
    color: 'blue'
  }
];
