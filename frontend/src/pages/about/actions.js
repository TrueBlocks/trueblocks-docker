//----------------------------------------------------------------------
export const BEGIN = 'about__/BEGIN';
export const FAILURE = 'about__/FAILURE';

export const ADD = 'about__/ADD';
export const EDIT = 'about__/EDIT';
export const UNDELETE = 'about__/UNDELETE';
export const DELETE = 'about__/DELETE';
export const REMOVE = 'about__/REMOVE';

export const ABOUT = 'about/about';
export const PHILOSOPHY = 'about/philosophy';
export const TEAM = 'about/team';

//----------------------------------------------------------------------
export const about_menu = [
  {
    page: 'About',
    items: [
      { header: 'About', value: 'VAL', action: ABOUT },
      { header: 'Philosophy', value: 'VAL', action: PHILOSOPHY },
      { header: 'Team', value: 'VAL', action: TEAM },
      { header: 'ab-0003' },
      { header: 'ab-0004' },
      { header: 'ab-0005' },
      { header: 'ab-0006' }
    ],
    color: 'blue'
  }
];
