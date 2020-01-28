import React from 'react';
import { SidePanel } from '../SidePanel';
import StatusInner from './StatusPanelInner';
import './StatusPanel.css';

export const StatusPanel = (props) => {
  const { isExpanded, toggle } = props;

  return (
    <SidePanel title="Status" className="status-panel" onToggle={toggle} isExpanded={isExpanded}>
      <StatusInner {...props} />
    </SidePanel>
  );
};

export default StatusPanel;
