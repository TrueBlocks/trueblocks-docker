//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Settings } from './dispatchers';

import { InnerPageHeader, DetailTable, LocalMenu, isReady, NotReady } from '../../components';
import { settings_local_menu } from '../../fake_data/summary-data';
import './settings.css';

// EXISTING_CODE
import { dispatcher_setSettings } from './settings-getdata-set';
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
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    if (cmd === 'change_subpage') {
      // update the local state...
      this.setState({
        subpage: value
      });
      // update the global state...
      var query = 'get';
      this.props.dispatcher_Settings(query);
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInnerMost = () => {
    // EXISTING_CODE
    return (
      <Fragment>
        <form onSubmit={this.submit}>
          {this.props.data.files.map((file, fileI) =>
            file.groups.map((category, categoryI) => (
              <div className="setting-group" key={category.section}>
                <h4>{category.section}</h4>
                {category.keys.map((settingKey, keyI) => {
                  const el = this.props.data.files[fileI].groups[categoryI].keys[keyI];
                  const loc = [fileI, categoryI, keyI];
                  return (
                    <div key={settingKey.name}>
                      <SettingInput {...el} onChange={(e) => this.onChange(loc, e)} />
                    </div>
                  );
                })}
              </div>
            ))
          )}
          <button type="submit">Submit</button>
        </form>
      </Fragment>
    );
    // EXISTING_CODE
    // return <DetailTable css_pre="settings" data={this.props.data} innerEar={this.innerEar} />;
  };

  getInnerPage = () => {
    if (!isReady(this.props, this.props)) return <NotReady {...this.props} />;

    // EXISTING_CODE
    // EXISTING_CODE
    return (
      <Fragment>
        <LocalMenu data={settings_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
        {this.getInnerMost()}
      </Fragment>
    );
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Settings"
          notes="Monitors are per-address index caches that enable fast retreival of appearance histories for any account."
        />
        {this.getInnerPage()}
      </div>
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
const mapStateToProps = ({ reducer_Connection, reducer_Settings }) => ({
  sysConnected: reducer_Connection.isConnected,
  sysError: reducer_Connection.error,
  isLoading: reducer_Settings.isLoading,
  error: reducer_Settings.error,
  data: reducer_Settings.data
});

//----------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      sendToApi: (json) => dispatcher_setSettings(json),
      dispatcher_Settings
    },
    dispatch
  );

//----------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsInner);
