//----------------------------------------------------------------------
export const BEGIN = 'other__/BEGIN';
export const FAILURE = 'other__/FAILURE';

export const EDIT = 'other__/EDIT';
export const CREATE = 'other__/CREATE';
export const UPDATE = 'other__/UPDATE';
export const DELETE = 'other__/DELETE';
export const UNDELETE = 'other__/UNDELETE';
export const REMOVE = 'other__/REMOVE';

export const CUSTOM_BLOCKS = 'when/list&verbose';
export const KNOWN_BLOCKS = 'when/list';
export const GENERATED_BLOCKS = 'other/generated';
export const GROUPS = 'names/groups';

//----------------------------------------------------------------------
export const other_menu = [
  {
    page: 'Other',
    items: [
      { header: 'Custom Blocks', value: 'VAL', action: CUSTOM_BLOCKS },
      { header: 'Known Blocks', value: 'VAL', action: KNOWN_BLOCKS },
      { header: 'Generated Blocks', value: 'VAL', action: GENERATED_BLOCKS },
      { header: 'Groups', value: 'VAL', action: GROUPS },
      { header: 'ot-0004' },
      { header: 'ot-0005' },
      { header: 'ot-0006' }
    ],
    color: 'orange'
  }
];
