import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { polling } from '../z_components/polling';
import { dispatcher_Names } from './names-getdata';

import Loading from '../z_components/loading';
import InnerHeader from '../z_components/inner-header';

const NamesInner = (props) => {
  let status;
  if (props.isLoading) {
    status = 'loading';
  }

  if (props.error) {
    status = 'error';
  } else if (!props.isConnected || !props.names.data) {
    status = 'initializing';
  } else {
    status = 'ready';
  }

  let container;
  switch (status) {
    case 'ready':
      container = (
        <div className="inner-panel">
          <h4>Customized Names (private)</h4>
          <ul>
            <li>
              {props.names.data[0].group},{props.names.data[0].subgroup},{props.names.data[0].name},
              {props.names.data[0].address},{props.names.data[0].symbol},{props.names.data[0].description},
              {props.names.data[0].source},{props.names.data[0].logo},{props.names.data[0].is_contract},
              {props.names.data[0].is_private},{props.names.data[0].is_shared}
            </li>
            <li>
              {props.names.data[1].group},{props.names.data[1].subgroup},{props.names.data[1].name},
              {props.names.data[1].address},{props.names.data[1].symbol},{props.names.data[1].description},
              {props.names.data[1].source},{props.names.data[1].logo},{props.names.data[1].is_contract},
              {props.names.data[1].is_private},{props.names.data[1].is_shared}
            </li>
            <li>
              {props.names.data[2].group},{props.names.data[2].subgroup},{props.names.data[2].name},
              {props.names.data[2].address},{props.names.data[2].symbol},{props.names.data[2].description},
              {props.names.data[2].source},{props.names.data[2].logo},{props.names.data[2].is_contract},
              {props.names.data[2].is_private},{props.names.data[2].is_shared}
            </li>
            <li>
              {props.names.data[3].group},{props.names.data[3].subgroup},{props.names.data[3].name},
              {props.names.data[3].address},{props.names.data[3].symbol},{props.names.data[3].description},
              {props.names.data[3].source},{props.names.data[3].logo},{props.names.data[3].is_contract},
              {props.names.data[3].is_private},{props.names.data[3].is_shared}
            </li>
            <li>
              {props.names.data[4].group},{props.names.data[4].subgroup},{props.names.data[4].name},
              {props.names.data[4].address},{props.names.data[4].symbol},{props.names.data[4].description},
              {props.names.data[4].source},{props.names.data[4].logo},{props.names.data[4].is_contract},
              {props.names.data[4].is_private},{props.names.data[4].is_shared}
            </li>
            <li>Named Address 2</li>
          </ul>
          <h4>Named Addresses (shared)</h4>
          <ul>
            <li>Named Function 1</li>
            <li>Named Event 2</li>
          </ul>
          <h4>Pre-fund Addresses (shared)</h4>
          <ul>
            <li>Named Function 1</li>
            <li>Named Event 2</li>
          </ul>
          <h4>Named Functions / Events</h4>
          <ul>
            <li>Named Function 1</li>
            <li>Named Event 2</li>
          </ul>
          <h4>Named Blocks</h4>
          <ul>
            <li>Named Block 1</li>
            <li>Named Block 2</li>
          </ul>
        </div>
      );
      break;
    case 'initializing':
      container = <Loading status={status} message="Initializing..." />;
      break;
    case 'error':
      container = <Loading status={status} message={props.error} />;
      break;
    default:
      container = <Loading status={status} message="Loading..." />;
  }
  return (
    <div className="right-panel">
      <div>
        <InnerHeader
          title="Named Objects"
          notes="The Names component of TrueBlocks allows one to name various objects include
          any address (even if not previously monitored), any Solidity function or event signatures, and other relevant data.
          These names may be shared anonomously with the TrueBlocks community."
        />
        {container}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer_Connection, reducer_Names }) => ({
  names: reducer_Names.names,
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_Names
    },
    dispatch
  );

export default polling(dispatcher_Names, 20000)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NamesInner)
);
