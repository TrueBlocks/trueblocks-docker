//----------------------------------------------------------------------
export const BEGIN = 'other__/BEGIN';
export const FAILURE = 'other__/FAILURE';

export const ADD = 'other__/ADD';
export const EDIT = 'other__/EDIT';
export const UNDELETE = 'other__/UNDELETE';
export const DELETE = 'other__/DELETE';
export const REMOVE = 'other__/REMOVE';

export const CUSTOM_BLOCKS = 'when/list&verbose';
export const KNOWN_BLOCKS = 'when/list';
export const GENERATED_BLOCKS = 'other/generated';
export const GROUP_NAMES = 'other/groups';
export const SUBGROUP_NAMES = 'other/subgroups';

//----------------------------------------------------------------------
export const other_menu = [
  {
    page: 'Other',
    items: [
      { header: 'Custom Blocks', value: 'VAL', action: CUSTOM_BLOCKS },
      { header: 'Known Blocks', value: 'VAL', action: KNOWN_BLOCKS },
      { header: 'Generated Blocks', value: 'VAL', action: GENERATED_BLOCKS },
      { header: 'Group Names', value: 'VAL', action: GROUP_NAMES },
      { header: 'Subgroup Names', value: 'VAL', action: SUBGROUP_NAMES },
      { header: 'ot-0005' },
      { header: 'ot-0006' }
    ],
    color: 'orange'
  }
];
