//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Settings } from './dispatchers';

import { LocalMenu } from '../../components';
import { isError, NotReady, isEmpty, EmptyQuery } from '../../components';
import { isReady } from '../../components';
import { licensesText } from './text/licenses';
import * as se from './actions';
import './settings.css';

// EXISTING_CODE
import { dispatcher_setSettings } from './settings-actions-set';
// EXISTING_CODE

//----------------------------------------------------------------------
class SettingsInner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  submit = (e) => {
    e.preventDefault();
    this.props.sendToApi(JSON.stringify(this.props.data.files));
  };

  onChange = (loc, e) => {
    let settings = [...this.props.data.files];
    let newVal = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    settings[loc[0]].groups[loc[1]].keys[loc[2]].value = newVal;
    this.setState({ data: settings });
  };
  // EXISTING_CODE

  componentWillMount = () => {};

  componentDidMount = () => {
    this.innerEar('change_subpage', this.props.subpage);
  };

  innerEar = (cmd, value) => {
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        subpage: value
      });
      // update the global state...
      this.props.dispatcher_Settings(value);
      return;
    }

    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    if (this.state.subpage === se.LICENSES) {
      return licensesText();
    }
    //if (isError(this.props)) return <NotReady {...this.props} />;
    //else if (!isReady(this.props, this.props.data)) return <NotReady {...this.props} />;
    //else if (isEmpty(this.props.data)) return <EmptyQuery query={this.state.subpage} />;
    // EXISTING_CODE
    //return (
    //  <Fragment>
    //    <form onSubmit={this.submit}>
    //      {this.props.data.files.map((file, fileI) =>
    //        file.groups.map((category, categoryI) => (
    //          <div className="setting-group" key={category.section}>
    //            <h4>{category.section}</h4>
    //            {category.keys.map((settingKey, keyI) => {
    //              const el = this.props.data.files[fileI].groups[categoryI].keys[keyI];
    //              const loc = [fileI, categoryI, keyI];
    //              return (
    //                <div key={settingKey.name}>
    //                  <SettingInput {...el} onChange={(e) => this.onChange(loc, e)} />
    //                </div>
    //              );
    //            })}
    //          </div>
    //        ))
    //      )}
    //      <button type="submit">Submit</button>
    //    </form>
    //  </Fragment>
    //);
    // EXISTING_CODE
    return <div style={{ width: '98%' }}>Content of Settings page with subpage: {this.state.subpage}</div>;
  };

  getInnerPage = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={this.props.menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <Fragment>
        <div className="inner-panel">
          <div className="title inner-page">Settings</div>
          {this.getInnerPage()}
        </div>
      </Fragment>
    );
  };
}

// EXISTING_CODE
//----------------------------------------------------------------------
const SettingInput = ({ name, value, type, tip, onChange }) => {
  return (
    <div className="setting-row">
      <div className="side"></div>
      <label>{name}</label>
      <div className="input">
        {type === 'bool' && <input type="checkbox" value={value} checked={value} name={name} onChange={onChange} />}
        {type !== 'bool' && <input defaultValue={value} name={name} onChange={onChange} />}
      </div>
      <span className="description">{tip}</span>
      <span className="data-type">{type}</span>
    </div>
  );
};
// EXISTING_CODE

//----------------------------------------------------------------------
const mapStateToProps = ({ reducer_Status, reducer_Settings }) => ({
  // EXISTING_CODE
  // EXISTING_CODE
  sysConnected: reducer_Status.isConnected,
  sysError: reducer_Status.error,
  isLoading: reducer_Settings.isLoading,
  error: reducer_Settings.error,
  data: reducer_Settings.data,
  meta: reducer_Settings.meta,
  fieldList: reducer_Settings.fieldList,
  menu: reducer_Settings.menu
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // EXISTING_CODE
      sendToApi: (json) => dispatcher_setSettings(json),
      // EXISTING_CODE
      dispatcher_Settings
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsInner);