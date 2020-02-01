import React from 'react';
import { mountComponent } from '../../utils/testing';

import BreadCrumb from './BreadCrumb';

let wrapper = null;

const page = 'Test Page';
const menu = { subpage: 'subpage1' };

const expectedString = `${page} : ${menu.subpage}`;

describe('BreadCrumb component', () => {
  it('displays page name when no menu provided', () => {
    wrapper = mountComponent(BreadCrumb, { page });

    expect(wrapper.text()).toEqual(page);
  });

  it('displays string when menu is provided', () => {
    wrapper = mountComponent(BreadCrumb, { page, menu });

    expect(wrapper.text()).toEqual(expectedString);
  });
});
