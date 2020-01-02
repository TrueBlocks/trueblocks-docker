//----------------------------------------------------------------------
export const BEGIN = 'support/BEGIN';
export const FAILURE = 'support/FAILURE';

export const ADD = 'support/ADD';
export const EDIT = 'support/EDIT';
export const UNDELETE = 'support/UNDELETE';
export const DELETE = 'support/DELETE';
export const REMOVE = 'support/REMOVE';

export const FREE = 'support/free';
export const PAY = 'support/pay';
export const DOCUMENTATION = 'support/documentation';
export const CONNECT = 'support/connect';

//----------------------------------------------------------------------
export const support_menu = [
  {
    page: 'Support',
    items: [
      { header: 'Free', value: 'VAL', action: FREE },
      { header: 'Pay', value: 'VAL', action: PAY },
      { header: 'Documentation', value: 'VAL', action: DOCUMENTATION },
      { header: 'Connect', value: 'VAL', action: CONNECT },
      { header: 'su-0004' },
      { header: 'su-0005' },
      { header: 'su-0006' }
    ],
    color: 'purple'
  }
];
