//----------------------------------------------------------------------
export const BEGIN = 'support/BEGIN';
export const FAILURE = 'support/FAILURE';

export const EDIT = 'support/EDIT';
export const CREATE = 'support/CREATE';
export const UPDATE = 'support/UPDATE';
export const DELETE = 'support/DELETE';
export const UNDELETE = 'support/UNDELETE';
export const REMOVE = 'support/REMOVE';

export const FREE_TEIR = 'support/free';
export const PAY_TEIR = 'support/pay';
export const DOCUMENTATION = 'support/documentation';
export const CONNECT_US = 'support/connect';
export const ABOUT = 'about/about';

//----------------------------------------------------------------------
export const support_menu = [
  {
    page: 'Support',
    items: [
      { header: 'Free Teir', value: 'VAL', action: FREE_TEIR },
      { header: 'Pay Teir', value: 'VAL', action: PAY_TEIR },
      { header: 'Documentation', value: 'VAL', action: DOCUMENTATION },
      { header: 'Connect Us', value: 'VAL', action: CONNECT_US },
      { header: 'About', value: 'VAL', action: ABOUT },
      { header: 'su-0005' },
      { header: 'su-0006' }
    ],
    color: 'purple'
  }
];
