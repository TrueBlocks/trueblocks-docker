import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getSettings
} from '../../modules/settingsManager'
import settingsLayout from './settingsLayout.json'

const SettingInput = ({ label, value, description, type }) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} />
      <span className="description">{description}</span>
      <span className="data-type">{type}</span>
    </div>
  )
}

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: {}
    }
  }

  componentDidMount = () => {
    this.props.getSettings().then((data) => {
      console.log(this.props.settings)
      const wrangledJson = this.props.settings.files.map((file, fileI) => {
        return file.groups.map((group, groupI) => {
          return group.keys.map((key, keyI) => {
            return { label: key.name, description: key.tip, value: key.value, type: key.type, loc: [fileI, groupI, keyI] }
          })
        })
      }).flat(10)
      this.setState({ settings: wrangledJson })
    })
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const isLoading = this.props.isLoading
    const makeInput = ({ label, value, description, type }) => {
      console.log(label, value, description, type)
      return (
        <div>
          <label>{label}</label>
          <input value={value} />
          <span className="description">{description}</span>
          <span className="data-type">{type}</span>
        </div>
      )
    }

    let container
    if (this.props.settings.files === undefined) {
      container = <span>I hate you</span>
    } else if (isLoading) {
      container = <span>IT IS LOADING MY DUDE</span>
    } else if (this.state.settings.length) {
      container = <div>
        {
          settingsLayout.map(category =>
            <div>
              <h3>{category.heading}</h3>
              {category.elements.map(settingName => {
                const el = this.state.settings.find(obj => obj.label === settingName)
                return (
                  <div>
                    <SettingInput {...el} />
                  </div>
                )
              })
              }
            </div>
          )
        }
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
