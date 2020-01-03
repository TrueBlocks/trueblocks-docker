//----------------------------------------------------------------------
export const BEGIN = 'explore/BEGIN';
export const FAILURE = 'explore/FAILURE';

export const EDIT = 'explore/EDIT';
export const CREATE = 'explore/CREATE';
export const UPDATE = 'explore/UPDATE';
export const DELETE = 'explore/DELETE';
export const UNDELETE = 'explore/UNDELETE';
export const REMOVE = 'explore/REMOVE';

export const BLOCKS = 'blocks/blocks=latest&hashes_only';
export const TRANSACTIONS = 'transactions/transactions=8001001.0';
export const RECEIPTS = 'receipts/transactions=8001001.0';
export const LOGS = 'logs/transactions=46147.0';
export const TRACES = 'traces/transactions=8001001.1';
export const ACCOUNTS = 'status/modes=monitors&details&ether';

//----------------------------------------------------------------------
export const explore_menu = [
  {
    page: 'Explore',
    items: [
      { header: 'Blocks', value: 'VAL', action: BLOCKS },
      { header: 'Transactions', value: 'VAL', action: TRANSACTIONS },
      { header: 'Receipts', value: 'VAL', action: RECEIPTS },
      { header: 'Logs', value: 'VAL', action: LOGS },
      { header: 'Traces', value: 'VAL', action: TRACES },
      { header: 'Accounts', value: 'VAL', action: ACCOUNTS },
      { header: 'ex-0006' }
    ],
    color: 'purple'
  }
];
