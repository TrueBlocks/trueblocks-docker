/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../icon';
import * as utils from '../../utils';
import './object-data-table.css';

//----------------------------------------------------------------------
export class ObjectTable extends React.Component {
  constructor(props) {
    super(props);
    var fields = [];
    if (this.props.data[0].result) {
      Object.keys(this.props.data[0].result).map((key) => {
        fields.push(key);
        return true;
      });
    } else {
      Object.keys(this.props.data[0]).map((key) => {
        fields.push(key);
        return true;
      });
    }
    console.log('fields: ', fields);
    this.state = {
      fieldList: fields
    };
  }

  componentWillMount() {}

  getContainer = () => {
    if (!this.state.fieldList) return <Fragment></Fragment>;
    var str = this.state.fieldList.map((item) => {
      return (
        <Fragment>
          <div key={'a0'} className={'object_table_col '}>
            <p style={{ fontWeight: '700', display: 'inline' }}>{item + ':'}</p>{' '}
            {JSON.stringify(this.props.data[0].result ? this.props.data[0].result[item] : this.props.data[0][item])}
          </div>
        </Fragment>
      );
    });
    //   <ObjectTableHeaderRow {...this.props} headers={this.state.fieldList} bang={this.state.fieldList.length} />
    //   {this.props.data.map((item, index) => {
    //     return (
    //       <Fragment>
    //         <div key={index + 'a0'} className={'object_table_row '}>
    //           {Object.values(item).map((val, vid) => {
    //             return <ObjectTableItem key={index + '-' + vid} {...this.props} item={item} value={val} />;
    //           })}
    //         </div>
    //       </Fragment>
    //     );
    //   })}
    // </div>
    return (
      <Fragment>
        <h4>{'Table title: ' + str}</h4>
        <div className={'object_table ' + this.props.subpage}>{str}</div>
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
class ObjectTableHeaderRow extends React.Component {
  render = () => {
    return (
      <div className={'object_table_header '}>
        {this.props.headers.map((field) => (
          <ObjectTableHeaderItem {...this.props} key={'h' + field} value={field} />
        ))}
      </div>
    );
  };

  static propTypes = {
    headers: PropTypes.array
  };
}

//----------------------------------------------------------------------
class ObjectTableHeaderItem extends React.Component {
  render = () => {
    if (!this.props.value || this.props.value === '') return <Fragment></Fragment>;
    return <div className="object_table_header-item">{this.props.value.replace('_', ' ')}</div>;
  };

  static propTypes = {
    value: PropTypes.string
  };
}

//----------------------------------------------------------------------
class ObjectTableItem extends React.Component {
  expandClicked = () => {
    this.props.innerEar('expand', this.props.item);
  };

  render = () => {
    var cn = 'object_table_table_item';
    var isNum = !utils.isHex(this.props.value) && utils.isNumber(this.props.value);
    if (isNum) cn = 'object_table_table_item number';
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
