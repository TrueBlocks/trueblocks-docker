import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StatusInner from './status-inner';
import { Icon } from './';
import './status.css';

const toggle = () => ({ type: 'statu/TOGGLE' });

export const Status = (props) => {
  const { isExpanded, toggle } = props;
  const iconName = isExpanded ? 'chevron_left' : 'chevron_right';
  const shrinkedClass = isExpanded ? '' : 'shrinked';
  const classes = `status-panel ${shrinkedClass}`;

  return (
    <div className={classes}>
      <div className="title status">
        <span>Help</span>
        <Icon icon={iconName} onClick={toggle} />
      </div>
      {isExpanded ? <StatusInner {...props} /> : null}
    </div>
  );
};

const mapStateToProps = ({ reducer_Status }) => ({
  isExpanded: reducer_Status.isExpanded
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
)(Status);
