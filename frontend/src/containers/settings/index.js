import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  changeApiProvider
} from '../../modules/settingsManager'



const Settings = (props) => {

  let apiProvider

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(apiProvider.value);
    props.change(apiProvider.value)
  }
  
    return (
        <div>
          <h1>Settings</h1>
          API Provider: {props.apiProvider}
          
          <form onSubmit = {onSubmit}>
            <input placeholder="http://"
              ref = {el => apiProvider = el}/>
            <button>Change</button>
            </form>
          </div>
    )
}

const mapStateToProps = ({  settingsManager }) => (
    {
        apiProvider: settingsManager.apiProvider
    }
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      change: (val) => changeApiProvider(val)
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
