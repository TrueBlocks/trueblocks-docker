//----------------------------------------------------------------------
export const BEGIN = 'signatu/BEGIN';
export const FAILURE = 'signatu/FAILURE';

export const ADD = 'signatu/ADD';
export const EDIT = 'signatu/EDIT';
export const UNDELETE = 'signatu/UNDELETE';
export const DELETE = 'signatu/DELETE';
export const REMOVE = 'signatu/REMOVE';

export const FROM_MONITORS = 'signatures/monitored';
export const KNOWN_SIGNATURES = 'signatures/known';
export const GENERATED_SIGNATURES = 'signatures/generated';
export const ABIS = 'signatures/abis';

//----------------------------------------------------------------------
export const signatures_menu = [
  {
    page: 'Signatures',
    items: [
      { header: 'From Monitors', value: 'VAL', action: FROM_MONITORS },
      { header: 'Known Signatures', value: 'VAL', action: KNOWN_SIGNATURES },
      { header: 'Generated Signatures', value: 'VAL', action: GENERATED_SIGNATURES },
      { header: 'Abis', value: 'VAL', action: ABIS },
      { header: 'si-0004' },
      { header: 'si-0005' },
      { header: 'si-0006' }
    ],
    color: 'green'
  }
];
