/*-----------------------------------------------------------------------------*/
import React from 'react';
import PropTypes from 'prop-types';
import * as utils from '../../utils';
import './DataTable.css';

//----------------------------------------------------------------------
export default class DataCell extends React.Component {
  expandClicked = () => {
    if (this.props.innerEar) this.props.innerEar('expand', this.props.item);
  };

  render = () => {
    var cn = 'data_table_table_item';
    var isNum = !utils.isHex(this.props.value) && utils.isNumber(this.props.value);
    if (isNum) cn = 'data_table_table_item number';
    var val = this.props.value;
    if (typeof this.props.value === 'object') {
      val = JSON.stringify(this.props.value);
    }

    return (
      <div className={cn} onClick={this.expandClicked}>
        {isNum ? utils.fmtInteger(val) : val}
      </div>
    );
  };

  static propTypes = {
    subpage: PropTypes.string.isRequired,
    item: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.array])
  };
}
