//----------------------------------------------------------------------
export const BEGIN = 'address/BEGIN';
export const FAILURE = 'address/FAILURE';

export const ADD = 'address/ADD';
export const EDIT = 'address/EDIT';
export const UNDELETE = 'address/UNDELETE';
export const DELETE = 'address/DELETE';
export const REMOVE = 'address/REMOVE';

export const MONITORS = 'status/modes=monitors&details&ether';
export const CUSTOM = 'names/custom';
export const OWNED = 'names/owned';
export const NAMED = 'names/named';
export const PREFUND = 'names/prefund';
export const OTHER = 'names/other';

//----------------------------------------------------------------------
export const addresses_menu = [
  {
    page: 'Addresses',
    items: [
      { header: 'Monitors', value: 'VAL', action: MONITORS },
      { header: 'Custom', value: 'VAL', action: CUSTOM },
      { header: 'Owned', value: 'VAL', action: OWNED },
      { header: 'Named', value: 'VAL', action: NAMED },
      { header: 'Prefund', value: 'VAL', action: PREFUND },
      { header: 'Other', value: 'VAL', action: OTHER },
      { header: 'ad-0006' }
    ],
    color: 'pink'
  }
];
