import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SystemStatus from './system-status'

const Home = props => (
  <div>
    <SystemStatus/>
  </div>
)

// const mapStateToProps = ({ trueblocks }) => (
//   {
//   data: trueblocks.data,
//   isLoading: trueblocks.isLoading
// }
// )

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       getStatus,
//       changePage: () => push('/about-us')
//     },
//     dispatch
//   )

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home)

export default Home;