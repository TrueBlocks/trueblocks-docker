import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getSettings
} from '../../modules/settingsManager'
import settingsLayout from './settingsLayout.json'

const SettingInput = ({ label, value, description, type, loc, ref }) => {
  return (
    <div className="setting-row">
      <label>{label}</label>
      <div className="input">
        { type === "bool" && <input type="checkbox" value="" defaultChecked={value} name={label}/> }
        { type !== "bool" && <input defaultValue={value} name={label}/>  }
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
  }

  componentDidMount = () => {
    this.props.getSettings().then((data) => {
      console.log(this.props.settings)
      let wrangledJson = []
      this.props.settings.files.map((file, fileI) => {
        return file.groups.map((group, groupI) => {
          return group.keys.map((key, keyI) => {
            wrangledJson[key.name] = { label: key.name, description: key.tip, value: key.value, type: key.type, loc: [fileI, groupI, keyI] }
          })
        })
      }).flat(10)
      this.setState({ settings: wrangledJson })
    })
  }

  handleInputChange = (e) => {
    // const target = e.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    
    // const settingToUpdate = this.state.settings.find(obj => obj.label === name)
    // console.log(settingToUpdate)
    // this.setState({
    //   settings[name]: value
    // });
  }

  submit = (e) => {
    e.preventDefault();
    console.log("submit")
    console.log(e.target)

    // get proper structure of settings
    // this.props.settings
    // replace values from our helper structure into the proper structure
    // this.state.settings.map(())
    // send to api
  }

  render() {
    const isLoading = this.props.isLoading
    let container
    if (this.props.settings.files === undefined) {
      container = <span>I hate you</span>
    } else if (isLoading) {
      container = <span>IT IS LOADING MY DUDE</span>
    } else if (this.state.settings !== []) {
      console.log(this.state.settings)
      let formInput = React.createRef();
      container = <div>
        <form onSubmit={this.submit}>
        {
          settingsLayout.map(category =>
            <div className="setting-container">
              <div className="setting-group">
              <h3>{category.heading}</h3>
              {category.elements.map(settingName => {
                const el = this.state.settings[settingName]
                return (
                  <div>
                    <SettingInput {...el} formInput={formInput} />
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
      getSettings
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
