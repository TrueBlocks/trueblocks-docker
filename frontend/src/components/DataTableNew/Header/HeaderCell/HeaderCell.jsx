//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

//---------------------------------------------------------------------
class HeaderCell extends React.Component {
  sortClicked = (el) => {
    this.props.ear('sort', this.props.content);
  };

  render = () => {
    return <th onClick={this.sortClicked}>{this.props.content}</th>;
  };
}

//---------------------------------------------------------------------
HeaderCell.propTypes = {
  content: PropTypes.string.isRequired,
  ear: PropTypes.func.isRequired
};

//---------------------------------------------------------------------
export default HeaderCell;
