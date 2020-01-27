import React from 'react';
import { SidePanel } from '../';

export const HelpPanel = (props) => {
  const { isExpanded, toggle } = props;
  return (
    <SidePanel
      title="Help"
      className="help-panel"
      shrinkTo="right"
      onToggle={toggle}
      isExpanded={isExpanded}
      toggleIcon="help"
    >
      {props.children}
    </SidePanel>
  );
};

export default HelpPanel;
