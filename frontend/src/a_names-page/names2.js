import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { polling } from '../z_components/polling';
import { dispatcher_Names } from './names-getdata';
import InnerHeader from '../z_components/inner-header';
import './names.css';

/*-----------------------------------------------------------------------------*/
const NamesInner2 = (props) => {
  return (
    <div className="right-panel">
      <div>
        <InnerHeader
          title="Named Objects"
          notes="The Names component of TrueBlocks allows one to name various objects include
          any address (even if not previously monitored), any Solidity function or event signatures, and other relevant data.
          These names may be shared anonomously with the TrueBlocks community."
        />
        <div className="inner-panel">
          <h4>Named Addresses</h4>
          <div className="name-container">
            <div className="grid2 blank1"> </div>
            <div className="grid2"> </div>
            <div className="grid2 x-axis2">Custom Names</div>
            <div className="grid2 x-axis2">Known Addresses</div>
            <div className="grid2 x-axis2">Prefund Addresses</div>
            <div className="grid2 x-axis2">Community</div>
            <div className="grid2 blank3"> </div>
            <div className="grid2 blank1"> </div>
            <div className="grid2 y-axis2">Expand >></div>
            <div className="grid2 x-blank">500</div>
            <div className="grid2 x-blank">23</div>
            <div className="grid2 x-blank">12</div>
            <div className="grid2 x-blank">12</div>
            <div className="grid2 blank3"> </div>
          </div>
          <h4>Named Functions / Events</h4>
          <div className="name-container">
            <div className="grid2 blank1"> </div>
            <div className="grid2"> </div>
            <div className="grid2 x-axis2">From Monitors</div>
            <div className="grid2 x-axis2">Known Contracts</div>
            <div className="grid2 x-axis2">Generated</div>
            <div className="grid2 blank2"> </div>
            <div className="grid2 blank1"> </div>
            <div className="grid2 y-axis2">Expand >></div>
            <div className="grid2 x-blank">2</div>
            <div className="grid2 x-blank">232</div>
            <div className="grid2 x-blank">1,212,121</div>
            <div className="grid2 blank2"> </div>
          </div>
          <h4>Named Blocks</h4>
          <div className="name-container">
            <div className="grid2 blank1"> </div>
            <div className="grid2"> </div>
            <div className="grid2 x-axis2">Custom Names</div>
            <div className="grid2 x-axis2">Known Blocks</div>
            <div className="grid2 x-axis2">Generated</div>
            <div className="grid2 blank2"> </div>
            <div className="grid2 blank1"> </div>
            <div className="grid2 y-axis2">Expand >></div>
            <div className="grid2 x-blank">12</div>
            <div className="grid2 x-blank">1</div>
            <div className="grid2 x-blank">1</div>
            <div className="grid2 blank2"> </div>
          </div>
        </div>
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
  )(NamesInner2)
);
