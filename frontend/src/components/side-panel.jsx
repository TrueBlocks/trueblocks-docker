import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from './';
import './side-panel.css';

const chevronDirectionByShrinkTo = new Map([
  [ 'left', { shrink: 'chevron_left', expand: 'chevron_right' } ],
  [ 'right', { shrink: 'chevron_right', expand: 'chevron_left' } ]
]);

const getShrinkToClass = (shrinkTo) => `shrink-to-${shrinkTo}`;
const getIconsNames = (shrinkTo) => chevronDirectionByShrinkTo.get(shrinkTo);

export const SidePanel = (props) => {
  const {
    isExpanded,
    onToggle,
    toggleIcon,
    shrinkTo
  } = props;
  const toggleIconName = toggleIcon || getIconsNames(shrinkTo)[isExpanded ? 'shrink' : 'expand'];
  const shrinkedClass = isExpanded ? '' : 'shrinked';
  const classes = `side-panel ${shrinkedClass} ${getShrinkToClass(props.shrinkTo)} ${props.className}`;

  return (
    <div className={classes}>
      <div className="title">
        <span>{props.title}</span>
        <Icon icon={toggleIconName} onClick={onToggle} />
      </div>
      {isExpanded ? props.children : null}
    </div>
  );
};

SidePanel.propTypes = {
  title: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  shrinkTo: PropTypes.oneOf(['left', 'right'])
};

SidePanel.defaultProps = {
  shrinkTo: 'left'
};
