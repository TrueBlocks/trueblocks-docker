import React from 'react';
import { mountComponent } from '../utils/testing';

import ExpandShrinkIcon from './ExpandShrinkIcon';

const mountIcon = (propsToSet) => {
  const defaultProps = {
    shrinkTo: 'left',
    isExpanded: true,
    onClick: undefined
  };

  return mountComponent(ExpandShrinkIcon, { ...defaultProps, ...propsToSet });
};
let wrapper = null;

describe('ExpandShrinkIcon component', () => {
  it('displays correct icon for expanded and shrinkTo=left', () => {
    wrapper = mountIcon({ shrinkTo: 'left' });

    expect(wrapper.text()).toEqual('chevron_left');
  });

  it('displays correct icon for expanded and shrinkTo=right', () => {
    wrapper = mountIcon({ shrinkTo: 'right' });

    expect(wrapper.text()).toEqual('chevron_right');
  });

  it('displays correct icon for shrunk and shrinkTo=left', () => {
    wrapper = mountIcon({ shrinkTo: 'left', isExpanded: false });

    expect(wrapper.text()).toEqual('chevron_right');
  });

  it('displays correct icon for shrunk and shrinkTo=right', () => {
    wrapper = mountIcon({ shrinkTo: 'right', isExpanded: false });

    expect(wrapper.text()).toEqual('chevron_left');
  });

  it('supports onClick', () => {
    const onClick = jest.fn(() => {});

    wrapper = mountIcon({ onClick });
    wrapper.simulate('click');

    expect(onClick.mock.calls.length).toBe(1);
  });
});
