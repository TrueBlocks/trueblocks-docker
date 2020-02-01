import React from 'react';
import { mount } from 'enzyme';

export function mountComponent(Component, props) {
  return mount(
    <Component
      {...props} />
  );
}
