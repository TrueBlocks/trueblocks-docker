//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_Settings } from './settings-getdata';

import { InnerPageHeader } from '../../components';
import { LocalMenu } from '../../components/local-menu';
import { Loading } from '../../components/loading';
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
      // EXISTING_CODE
      configSettings: [],
      // EXISTING_CODE
      subpage: props.subpage
    };
    this.innerEar = this.innerEar.bind(this);
  }

  // EXISTING_CODE
  componentDidMount = () => {
    this.props.dispatcher_Settings().then(() => {
      this.setState({ configSettings: this.props.configSettings.files });
    });
  };

  submit = (e) => {
    e.preventDefault();
    this.props.sendToApi(JSON.stringify(this.state.configSettings));
  };

  onChange = (loc, e) => {
    let settings = [...this.state.configSettings];
    let newVal = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    settings[loc[0]].groups[loc[1]].keys[loc[2]].value = newVal;
    this.setState({ configSettings: settings });
  };
  // EXISTING_CODE

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');

    // EXISTING_CODE
    // EXISTING_CODE

    if (cmd === 'change_subpage') {
      this.setState({
        // EXISTING_CODE
        // EXISTING_CODE
        subpage: value
      });
    } else if (cmd === 'goto_page') {
      window.open('/' + value, '_self');
    }
    // EXISTING_CODE
    // EXISTING_CODE
  };

  // EXISTING_CODE
  // EXISTING_CODE

  getInner = () => {
    let inner;
    // EXISTING_CODE
    inner = (
      <Fragment>
        <form onSubmit={this.submit}>
          {this.state.configSettings.map((file, fileI) =>
            file.groups.map((category, categoryI) => (
              <div className="setting-group" key={category.section}>
                <h4>{category.section}</h4>
                {category.keys.map((settingKey, keyI) => {
                  const el = this.state.configSettings[fileI].groups[categoryI].keys[keyI];
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
    return inner;
  };

  getContainer = () => {
    // EXISTING_CODE
    // EXISTING_CODE
    let container;
    if (this.props.error) {
      container = <Loading source="settings" status="error" message={this.props.error} />;
    } else if (this.props.isConnected) {
      container = (
        <div className="inner-panel">
          <LocalMenu data={settings_local_menu} active={this.state.subpage} innerEar={this.innerEar} />
          {this.getInner()}
        </div>
      );
    } else {
      container = <Loading source="settings" status="initializing" message="Loading..." />;
    }
    return container;
  };

  render = () => {
    return (
      <div className="right-panel">
        <InnerPageHeader
          title="Settings"
          notes="Monitors are per-address index caches that enable fast retreival of appearance histories for any account."
        />
        {this.getContainer()}
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
  // EXISTING_CODE
  // EXISTING_CODE
  isConnected: reducer_Connection.isConnected,
  isLoading: reducer_Connection.isLoading,
  error: reducer_Connection.error,
  configSettings: reducer_Settings.configSettings
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
