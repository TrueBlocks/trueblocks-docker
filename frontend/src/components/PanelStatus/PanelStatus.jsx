import React from 'react';
import { PanelBase } from '../PanelBase';
import StatusInner from './PanelStatusInner';
import './PanelStatus.css';

const PanelStatus = (props) => {
  const { isExpanded, toggle } = props;

  return (
    <PanelBase title="Status" className="status-panel" onToggle={toggle} isExpanded={isExpanded}>
      <StatusInner {...props} />
    </PanelBase>
  );
};

export default PanelStatus;
