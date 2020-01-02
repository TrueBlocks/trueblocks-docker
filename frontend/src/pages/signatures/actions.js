//----------------------------------------------------------------------
export const BEGIN = 'signatu/BEGIN';
export const FAILURE = 'signatu/FAILURE';

export const ADD = 'signatu/ADD';
export const EDIT = 'signatu/EDIT';
export const UNDELETE = 'signatu/UNDELETE';
export const DELETE = 'signatu/DELETE';
export const REMOVE = 'signatu/REMOVE';

export const MONITORED = 'signatures/monitored';
export const KNOWN = 'signatures/known';
export const GENERATED = 'signatures/generated';
export const ABIS = 'signatures/abis';

//----------------------------------------------------------------------
export const signatures_menu = [
  {
    page: 'Signatures',
    items: [
      { header: 'Monitored', value: 'VAL', action: MONITORED },
      { header: 'Known', value: 'VAL', action: KNOWN },
      { header: 'Generated', value: 'VAL', action: GENERATED },
      { header: 'Abis', value: 'VAL', action: ABIS },
      { header: 'si-0004' },
      { header: 'si-0005' },
      { header: 'si-0006' }
    ],
    color: 'green'
  }
];
