//----------------------------------------------------------------------
export const BEGIN = 'address/BEGIN';
export const FAILURE = 'address/FAILURE';

export const ADD = 'address/ADD';
export const EDIT = 'address/EDIT';
export const UNDELETE = 'address/UNDELETE';
export const DELETE = 'address/DELETE';
export const REMOVE = 'address/REMOVE';

export const MONITORED = 'status/modes=monitors&details&ether';
export const CUSTOM_NAMES = 'names/custom';
export const OWNED_ADDRESSES = 'names/owned';
export const KNOWN_TOKENS = 'names/named';
export const PREFUNDS = 'names/prefund';
export const OTHER = 'names/other';

//----------------------------------------------------------------------
export const addresses_menu = [
  {
    page: 'Addresses',
    items: [
      { header: 'Monitored', value: 'VAL', action: MONITORED },
      { header: 'Custom Names', value: 'VAL', action: CUSTOM_NAMES },
      { header: 'Owned Addresses', value: 'VAL', action: OWNED_ADDRESSES },
      { header: 'Known Tokens', value: 'VAL', action: KNOWN_TOKENS },
      { header: 'Prefunds', value: 'VAL', action: PREFUNDS },
      { header: 'Other', value: 'VAL', action: OTHER },
      { header: 'ad-0006' }
    ],
    color: 'pink'
  }
];
