/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './DataTableObject.css';
import * as utils from '../../utils';

//----------------------------------------------------------------------
export class DataTableObject extends React.Component {
  constructor(props) {
    super(props);
    var fields = [];
    if (this.props.data) {
      Object.keys(this.props.data).map((key) => {
        fields.push(key);
        return true;
      });
    }
    // console.log('fields: ', fields);
    this.state = {
      fieldList: fields
    };
  }

  componentWillMount() {}

  getContainer = () => {
    if (!this.state.fieldList) return <Fragment></Fragment>;
    var str = this.state.fieldList.map((item) => {
      var value = this.props.data[item];
      return (
        <Fragment>
          <div key={'a0'} className={'object_table_row '}>
            <ObjectTableItem cn="object_table_row left" value={item + ':'} />
            <ObjectTableItem cn="object_table_right" value={value} />
          </div>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <div className={'object_table ' + this.props.subpage}>
          <div className="object_table_header">
            <div className="object_table_header_item">{this.props.type}</div>
          </div>
          <div>{str}</div>
        </div>
        <p></p>
      </Fragment>
    );
  };

  render = () => {
    return this.getContainer();
  };

  static propTypes = {
    subpage: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
  };
}

//----------------------------------------------------------------------
class ObjectTableItem extends React.Component {
  render = () => {
    var cn = this.props.cn;
    var isNum = !utils.isHex(this.props.value) && utils.isNumber(this.props.value);
    if (isNum) cn = cn + ' number';
    var val = this.props.value;
    if (typeof this.props.value === 'object') {
      val = JSON.stringify(this.props.value);
    }
    if (val && typeof val === 'string') val = val.replace(/([A-Z])/g, ' $1').trim();
    return <div className={cn}>{isNum ? utils.fmtInteger(val) : val}</div>;
  };
}
