//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { PanelBase } from '../PanelBase';

//----------------------------------------------------------------------
function PanelHelp({ isExpanded, toggle, children }) {
  return (
    <PanelBase
      title="Help"
      className="help-panel"
      toggleIcon="help"
      shrinkTo="right"
      onToggle={toggle}
      isExpanded={isExpanded}
    >
      {children}
    </PanelBase>
  );
}

//----------------------------------------------------------------------
PanelHelp.propTypes = {
  toggle: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
};

//----------------------------------------------------------------------
export default PanelHelp;
