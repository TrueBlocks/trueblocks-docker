//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { SidePanel } from '../SidePanel';

//----------------------------------------------------------------------
function HelpPanel({ isExpanded, toggle, children }) {
  return (
    <SidePanel
      title="Help"
      className="help-panel"
      toggleIcon="help"
      shrinkTo="right"
      onToggle={toggle}
      isExpanded={isExpanded}
    >
      {children}
    </SidePanel>
  );
}

//----------------------------------------------------------------------
HelpPanel.propTypes = {
  toggle: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired
};

//----------------------------------------------------------------------
export default HelpPanel;
