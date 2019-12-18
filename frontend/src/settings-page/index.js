//--------------------------------------------------------------------------------
import React from 'react';
import Connection from '../components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { dispatcher_getSettings } from './settings-getdata-get';
import { dispatcher_setSettings } from './settings-getdata-set';
import { SummaryTable } from '../components/summary-table';
import { summary_settings_data } from '../fake_data/summary-data';

import Loading from '../components/loading';
import InnerHeader from '../components/inner-header';

//--------------------------------------------------------------------------------
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configSettings: []
    };
    this.innerEar = this.innerEar.bind(this);
  }

  componentDidMount = () => {
    this.props.dispatcher_getSettings().then(() => {
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

  innerEar = (cmd, value) => {
    console.log('%cinnerEar - ' + cmd + ' value: ' + value, 'color:orange');
    if (cmd === 'change_page') {
      //this.setState(this.state);
      window.open('/' + value.replace('/', '?sub='), '_self');
    }
  };

  render() {
    if (this.props.error) {
      return <Loading status="error" message={`${this.props.error}`} />;
    } else if (this.props.configSettings.files === undefined || this.state.configSettings === []) {
      return <Loading status="loading" message="Initializing..." />;
    } else {
      return (
        <div className="page">
          <Connection props={this.props} />
          <div className="right-panel">
            <InnerHeader
              title="Settings"
              notes="Monitors are per-address index caches that enable fast
              retreival of appearance histories for any account."
            />
            <form onSubmit={this.submit}>
              <div className="inner-table">
                <SummaryTable data={summary_settings_data} no_labels innerEar={this.innerEar} />
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
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
    }
  }
}

//--------------------------------------------------------------------------------
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

//--------------------------------------------------------------------------------
const mapStateToProps = ({ reducer_Settings }) => ({
  configSettings: reducer_Settings.configSettings,
  isLoading: reducer_Settings.isLoading,
  error: reducer_Settings.error
});

//--------------------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      dispatcher_getSettings,
      sendToApi: (json) => dispatcher_setSettings(json)
    },
    dispatch
  );

//--------------------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
