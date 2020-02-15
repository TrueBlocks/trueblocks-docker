import React from 'react';
import { mountComponent } from '../../utils/testing';

import PageHeader from './PageHeader';

const title = 'title';
let wrapper = null;

describe('PageHeader component', () => {
  beforeEach(() => {
    wrapper = mountComponent(PageHeader, { logo: 'logo', title });
  });

  it('displays logo', () => {
    expect(wrapper.find('img').length).toBe(1);
  });

  it('displays app name', () => {
    expect(wrapper.find('.app.title').text()).toBe(title);
  });
});
