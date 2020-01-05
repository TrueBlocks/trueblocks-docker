//----------------------------------------------------------------------
export const BEGIN = 'setting/BEGIN';
export const FAILURE = 'setting/FAILURE';

export const EDIT = 'setting/EDIT';
export const CREATE = 'setting/CREATE';
export const UPDATE = 'setting/UPDATE';
export const DELETE = 'setting/DELETE';
export const UNDELETE = 'setting/UNDELETE';
export const REMOVE = 'setting/REMOVE';

export const CONFIGURATION = 'settings/get';
export const SKINS = 'settings/skins';
export const LICENSES = 'settings/licenses';

//----------------------------------------------------------------------
export const settings_menu = [
  {
    page: 'Settings',
    items: [
      { header: 'Configuration', value: 'VAL', action: CONFIGURATION },
      { header: 'Skins', value: 'VAL', action: SKINS },
      { header: 'Licenses', value: 'VAL', action: LICENSES },
      { header: 'se-0003' },
      { header: 'se-0004' },
      { header: 'se-0005' },
      { header: 'se-0006' }
    ],
    color: 'pink'
  }
];
