import React from 'react';
import { Icon } from './';

const chevronDirectionByShrinkTo = new Map([
  ['left', { shrink: 'chevron_left', expand: 'chevron_right' }],
  ['right', { shrink: 'chevron_right', expand: 'chevron_left' }]
]);

const getIconsNames = (shrinkTo) => chevronDirectionByShrinkTo.get(shrinkTo);

export default function ExpandShrinkIcon({ shrinkTo, isExpanded, toggleIcon, onClick }) {
  const iconName = toggleIcon || getIconsNames(shrinkTo)[isExpanded ? 'shrink' : 'expand'];

  return (
    <Icon icon={iconName} onClick={onClick} />
  );
}
