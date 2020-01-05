//----------------------------------------------------------------------
export const BEGIN = 'signatu/BEGIN';
export const FAILURE = 'signatu/FAILURE';

export const EDIT = 'signatu/EDIT';
export const CREATE = 'signatu/CREATE';
export const UPDATE = 'signatu/UPDATE';
export const DELETE = 'signatu/DELETE';
export const UNDELETE = 'signatu/UNDELETE';
export const REMOVE = 'signatu/REMOVE';

export const FROM_MONITORS = 'abi/monitored&verbose';
export const KNOWN_SIGNATURES = 'abi/known&verbose';
export const GENERATED_SIGNATURES = 'signatures/generated';
export const ABI_FILES = 'status/modes=abis&details';

//----------------------------------------------------------------------
export const signatures_menu = [
  {
    page: 'Signatures',
    items: [
      { header: 'From Monitors', value: 'VAL', action: FROM_MONITORS },
      { header: 'Known Signatures', value: 'VAL', action: KNOWN_SIGNATURES },
      { header: 'Generated Signatures', value: 'VAL', action: GENERATED_SIGNATURES },
      { header: 'Abi Files', value: 'VAL', action: ABI_FILES },
      { header: 'si-0004' },
      { header: 'si-0005' },
      { header: 'si-0006' }
    ],
    color: 'green'
  }
];
