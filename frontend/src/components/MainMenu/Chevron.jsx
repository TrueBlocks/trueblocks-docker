import React from 'react';
import Icon from 'components/Icon';

//------------------------------------------------------------
export default function Chevron({ active }) {
  return (
    <div>
      <Icon icon={active ? 'keyboard_arrow_down' : 'keyboard_arrow_right'} />
    </div>
  );
}
