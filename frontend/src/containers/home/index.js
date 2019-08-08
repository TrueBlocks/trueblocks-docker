import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  getBlockAsync
} from '../../modules/trueblocks'

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Count: {props.data.length}</p>

      <button onClick={props.getBlockAsync} disabled={props.isLoading}>
        Fetch data
      </button>

  </div>
)

const mapStateToProps = ({ trueblocks }) => (
  {
  data: trueblocks.data,
  isLoading: trueblocks.isLoading
}
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBlockAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
