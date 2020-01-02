//----------------------------------------------------------------------
export const BEGIN = 'other__/BEGIN';
export const FAILURE = 'other__/FAILURE';

export const ADD = 'other__/ADD';
export const EDIT = 'other__/EDIT';
export const UNDELETE = 'other__/UNDELETE';
export const DELETE = 'other__/DELETE';
export const REMOVE = 'other__/REMOVE';

export const CUSTOM = 'other/custom';
export const KNOWN = 'when/list';
export const GENERATED = 'other/generated';
export const GROUPS = 'other/groups';
export const SUBGROUPS = 'other/subgroups';

//----------------------------------------------------------------------
export const other_menu = [
  {
    page: 'Other',
    items: [
      { header: 'Custom', value: 'VAL', action: CUSTOM },
      { header: 'Known', value: 'VAL', action: KNOWN },
      { header: 'Generated', value: 'VAL', action: GENERATED },
      { header: 'Groups', value: 'VAL', action: GROUPS },
      { header: 'Subgroups', value: 'VAL', action: SUBGROUPS },
      { header: 'ot-0005' },
      { header: 'ot-0006' }
    ],
    color: 'orange'
  }
];
