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
          <h4>Summary</h4>
          <div className="name-container">
            <div className="grid2 blank1"> </div>
            <div className="grid2"> </div>
            <div className="grid2 x-axis2">Custom Names</div>
            <div className="grid2 x-axis2">Known Addresses</div>
            <div className="grid2 x-axis2">Prefund Addresses</div>
            <div className="grid2 x-axis2">Community</div>
            <div className="grid2 blank3"> </div>
            <div className="grid2 blank1"> </div>
            <div className="grid2 y-axis2">Addresses</div>
            <div className="grid2 x-blank">40</div>
            <div className="grid2 x-blank">991</div>
            <div className="grid2 x-blank">8,894</div>
            <div className="grid2 x-blank">916</div>
            <div className="grid2 blank3"> </div>
          </div>
          <div className="name-container">
            <div className="grid2 blank1"> </div>
            <div className="grid2"> </div>
            <div className="grid2 x-axis3">From Monitors</div>
            <div className="grid2 x-axis3">Known Contracts</div>
            <div className="grid2 x-axis3">Generated</div>
            <div className="grid2 blank2"> </div>
            <div className="grid2 blank1"> </div>
            <div className="grid2 y-axis2">Functions / Events</div>
            <div className="grid2 x-blank">406</div>
            <div className="grid2 x-blank">1,559</div>
            <div className="grid2 x-blank">1,212,121</div>
            <div className="grid2 blank2"> </div>
          </div>
          <div className="name-container">
            <div className="grid2 blank1"> </div>
            <div className="grid2"> </div>
            <div className="grid2 x-axis3">Custom Names</div>
            <div className="grid2 x-axis3">Known Blocks</div>
            <div className="grid2 x-axis3">Generated</div>
            <div className="grid2 blank2"> </div>
            <div className="grid2 blank1"> </div>
            <div className="grid2 y-axis2">Blocks</div>
            <div className="grid2 x-blank">0</div>
            <div className="grid2 x-blank">26</div>
            <div className="grid2 x-blank">501</div>
            <div className="grid2 blank2"> </div>
          </div>
          <div className="name-container">
            <div className="grid2 blank1"> </div>
            <div className="grid2"> </div>
            <div className="grid2 x-axis3">Groups</div>
            <div className="grid2 x-axis3">Sub Groups</div>
            <div className="grid2 x-axis3">Other</div>
            <div className="grid2 x-axis2">Community</div>
            <div className="grid2 blank3"> </div>
            <div className="grid2 blank1"> </div>
            <div className="grid2 y-axis2">Other</div>
            <div className="grid2 x-blank">10</div>
            <div className="grid2 x-blank">7</div>
            <div className="grid2 x-blank">0</div>
            <div className="grid2 x-blank">0</div>
            <div className="grid2 blank2"> </div>
          </div>
        </div>
        <div class="wrapper">
          <div class="box a">A</div>
          <div class="box b">B</div>
          <div class="box c">C</div>
          <div class="box d">D</div>
          <div class="box e">E</div>
          <div class="box f">F</div>
          <div class="box g">G</div>
          <div class="box h">H</div>
          <div class="box i">I</div>
          <div class="box j">J</div>
          <div class="box k">K</div>
          <div class="box l">L</div>
          <div class="box g">G</div>
          <div class="box h">H</div>
          <div class="box i">I</div>
          <div class="box j">J</div>
          <div class="box k">K</div>
          <div class="box l">L</div>
        </div>{' '}
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
