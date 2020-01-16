import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { STATUS_TOGGLE } from './side-panel-actions';
import { SidePanel } from './side-panel';
import StatusInner from './status-inner';
import './status.css';

const toggle = () => ({ type: STATUS_TOGGLE });

export const StatusPanel = (props) => {
  const { isExpanded, toggle } = props;

  return (
    <SidePanel title="Status" className="status-panel" onToggle={toggle} isExpanded={isExpanded}>
      <StatusInner {...props} />
    </SidePanel>
  );
};

const mapStateToProps = ({ reducer_SidePanels }) => ({
  isExpanded: reducer_SidePanels.isStatusExpanded
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggle
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusPanel);
