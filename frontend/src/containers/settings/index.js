import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getSettings } from '../../modules/getSettings'
import { setSettings } from '../../modules/setSettings'
import Loading from '../common/loading'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: []
    }
  }

  componentDidMount = () => {
    this.props.getSettings().then(() => {
      this.setState({settings: this.props.settings.files})
    })
  }

  submit = (e) => {
    e.preventDefault();
    this.props.sendToApi(JSON.stringify(this.state.settings))
  }

  onChange = (loc, e) => {
    let settings = [...this.state.settings]
    let newVal = e.target.type === "checkbox" ? e.target.checked : e.target.value
    settings[loc[0]].groups[loc[1]].keys[loc[2]].value = newVal
    this.setState({settings: settings})
  }

  render() {
    let container
    if (this.props.settings.files === undefined) {
      container = <Loading status="loading" message="Preparing settings display..."/>
    } else if (this.props.isLoading) {
      container = <Loading status="loading" message="Querying settings..."/>
    } else if (this.state.settings !== []) {
      container = (
        <div>
          <form onSubmit={this.submit}>
          {
            this.state.settings.map((file, fileI) =>
              file.groups.map((category, categoryI) => 
              <div className="setting-container" key={category.section}>
                <div className="setting-group">
                <h3>{category.section}</h3>
                {category.keys.map((settingKey, keyI) => {
                  const el = this.state.settings[fileI].groups[categoryI].keys[keyI]
                  const loc = [fileI, categoryI, keyI]
                  return (
                    <div key={settingKey.name}>
                      <SettingInput {...el} onChange={(e) => this.onChange(loc, e)}/>
                    </div>
                  )
                })
                }              
                </div>
              </div>
            ))
          }
          <button type="submit">Submit</button>
          </form>
        </div>
      )
    }
    return (
      <div>
        {container}
      </div>
    )
  }
}

const SettingInput = ({ name, value, type, tip, onChange }) => {
  return (
    <div className="setting-row">
      <label>{name}</label>
      <div className="input">
        { type === 'bool' && <input type="checkbox" value={value} checked={value} name={name} onChange={onChange}/> }
        { type !== 'bool' && <input defaultValue={value} name={name} onChange={onChange}/>  }
      </div>
      <span className="description">{tip}</span>
      <span className="data-type">{type}</span>
    </div>
  )
}

const mapStateToProps = ({ getSettings }) => (
  {
    settings: getSettings.systemSettings,
    isLoading: getSettings.isLoading
  }
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSettings,
      sendToApi: (json) => setSettings(json)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
