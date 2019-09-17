import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getSettings } from '../../modules/settingsManager'
import { setSettings } from '../../modules/setSettings'
import settingsGroupings from './settingsGroupings.json'

const SettingInput = ({ label, value, description, type, loc, onChange }) => {
  return (
    <div className="setting-row">
      <label>{label}</label>
      <div className="input">
        { type === "bool" && <input type="checkbox" value="" defaultChecked={value} name={label} onChange={onChange}/> }
        { type !== "bool" && <input defaultValue={value} name={label} onChange={onChange}/>  }
      </div>
      <span className="description">{description}</span>
      <span className="data-type">{type}</span>
    </div>
  )
}

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: []
    }

    this.settingNames = settingsGroupings.map(cat => cat.elements).flat(10)
  }

  componentDidMount = () => {
    this.props.getSettings().then(() => {
      console.log(this.props.settings)
      let wrangledJson = []
      this.props.settings.files.map((file, fileI) => {
        file.groups.map((group, groupI) => {
          group.keys.map((key, keyI) => {
            wrangledJson[key.name] = { label: key.name, description: key.tip, value: key.value, type: key.type, loc: [fileI, groupI, keyI] }
            this.setState({[key.name]: key.value})
          })
        })
      }).flat(10)
      this.setState({settings: wrangledJson})
    })
    
  }

  submit = (e) => {
    e.preventDefault();
    console.log("submit")

    let settingsUpdate = {}
    this.settingNames.map(setting => {
      if(this.state[setting] !== undefined)
        settingsUpdate[setting] = this.state[setting]
    })

    this.props.sendToApi(JSON.stringify(settingsUpdate))
  }

  onChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const isLoading = this.props.isLoading
    let container
    if (this.props.settings.files === undefined) {
      container = <span>Preparing settings display...</span>
    } else if (isLoading) {
      container = <span>Querying settings...</span>
    } else if (this.state.settings !== []) {
      console.log(this.state.settings)
      container = <div>
        <form onSubmit={this.submit}>
        {
          settingsGroupings.map(category =>
            <div className="setting-container">
              <div className="setting-group">
              <h3>{category.heading}</h3>
              {category.elements.map(settingName => {
                const el = this.state.settings[settingName]
                return (
                  <div>
                    <SettingInput {...el} value={this.state[settingName]} onChange={this.onChange}/>
                  </div>
                )
              })
              }
              </div>
            </div>
          )
        }
        <button type="submit">Submit</button>
        </form>
      </div>
    }

    return (
      <div>
        {container}
      </div>
    )
  }
}



const mapStateToProps = ({ settingsManager }) => (
  {
    settings: settingsManager.systemSettings,
    isLoading: settingsManager.isLoading
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
