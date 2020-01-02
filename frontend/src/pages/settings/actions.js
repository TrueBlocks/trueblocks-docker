//----------------------------------------------------------------------
export const BEGIN = 'setting/BEGIN';
export const FAILURE = 'setting/FAILURE';

export const ADD = 'setting/ADD';
export const EDIT = 'setting/EDIT';
export const UNDELETE = 'setting/UNDELETE';
export const DELETE = 'setting/DELETE';
export const REMOVE = 'setting/REMOVE';

export const CONFIGS = 'settings/get';
export const PRICES = 'settings/prices';
export const SKINS = 'settings/skins';
export const LICENSES = 'settings/licenses';

//----------------------------------------------------------------------
export const settings_menu = [
  {
    page: 'Settings',
    items: [
      { header: 'Configs', value: 'VAL', action: CONFIGS },
      { header: 'Prices', value: 'VAL', action: PRICES },
      { header: 'Skins', value: 'VAL', action: SKINS },
      { header: 'Licenses', value: 'VAL', action: LICENSES },
      { header: 'se-0004' },
      { header: 'se-0005' },
      { header: 'se-0006' }
    ],
    color: 'pink'
  }
];
