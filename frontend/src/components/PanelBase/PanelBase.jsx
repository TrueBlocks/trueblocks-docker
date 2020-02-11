import React from 'react';
import PropTypes from 'prop-types';
import { ExpandShrinkIcon } from '../';
import './PanelBase.css';

const getShrinkToClass = (shrinkTo) => `shrink-to-${shrinkTo}`;

export const PanelBase = (props) => {
  const { isExpanded, onToggle, toggleIcon, shrinkTo } = props;
  const shrinkedClass = isExpanded ? '' : 'shrinked';
  const classes = `side-panel ${shrinkedClass} ${getShrinkToClass(props.shrinkTo)} ${props.className}`;

  return (
    <div className={classes}>
      <div className="title">
        <span>{props.title}</span>
        <ExpandShrinkIcon shrinkTo={shrinkTo} isExpanded={isExpanded} toggleIcon={toggleIcon} onClick={onToggle} />
      </div>
      {isExpanded ? props.children : null}
    </div>
  );
};

PanelBase.propTypes = {
  title: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  shrinkTo: PropTypes.oneOf(['left', 'right'])
};

PanelBase.defaultProps = {
  shrinkTo: 'left'
};
