import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SidePanel } from '../';
import { HELP_TOGGLE } from './side-panel-actions';

const toggle = () => ({ type: HELP_TOGGLE });

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

const mapStateToProps = ({ reducer_SidePanels }) => ({
  isExpanded: reducer_SidePanels.isHelpExpanded
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
)(HelpPanel);
