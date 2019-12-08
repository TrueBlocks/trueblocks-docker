//--------------------------------------------------------------------------------
import React from 'react';
import ConnectionComponent from '../z_components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSettings } from './settings-get';
import { setSettings } from './settings-set';
import Loading from '../z_components/loading';
import PageNotes from '../z_components/page-notes';

//--------------------------------------------------------------------------------
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      configSettings: []
    };
  }

  componentDidMount = () => {
    this.props.getSettings().then(() => {
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

  render() {
    if (this.props.error) {
      return <Loading status="error" message={`${this.props.error}`} />;
    } else if (this.props.configSettings.files === undefined || this.state.configSettings === []) {
      return <Loading status="loading" message="Initializing..." />;
    } else {
      return (
        <div className="page">
          <ConnectionComponent props={this.props} />
          <div className="right-panel">
            <h1>
              Settings
              <PageNotes text="Monitors are per-address index caches that enable fast reteival of appearance histories for any account." />
            </h1>
            <form onSubmit={this.submit}>
              <div className="setting-container">
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
const mapStateToProps = ({ getSettings }) => ({
  configSettings: getSettings.configSettings,
  isLoading: getSettings.isLoading,
  error: getSettings.error
});

//--------------------------------------------------------------------------------
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSettings,
      sendToApi: (json) => setSettings(json)
    },
    dispatch
  );

//--------------------------------------------------------------------------------
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
