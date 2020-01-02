//----------------------------------------------------------------------
export const BEGIN = 'support/BEGIN';
export const FAILURE = 'support/FAILURE';

export const ADD = 'support/ADD';
export const EDIT = 'support/EDIT';
export const UNDELETE = 'support/UNDELETE';
export const DELETE = 'support/DELETE';
export const REMOVE = 'support/REMOVE';

export const FREE_TEIR = 'support/free';
export const PAY_TEIR = 'support/pay';
export const DOCUMENTATION = 'support/documentation';
export const CONNECT_US = 'support/connect';

//----------------------------------------------------------------------
export const support_menu = [
  {
    page: 'Support',
    items: [
      { header: 'Free Teir', value: 'VAL', action: FREE_TEIR },
      { header: 'Pay Teir', value: 'VAL', action: PAY_TEIR },
      { header: 'Documentation', value: 'VAL', action: DOCUMENTATION },
      { header: 'Connect Us', value: 'VAL', action: CONNECT_US },
      { header: 'su-0004' },
      { header: 'su-0005' },
      { header: 'su-0006' }
    ],
    color: 'purple'
  }
];
