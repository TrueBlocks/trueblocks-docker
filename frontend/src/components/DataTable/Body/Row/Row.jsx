/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import Cell from './Cell';
import { DataTableObject } from '../../../DataTableObject';
import '../../DataTable.css';

//----------------------------------------------------------------------
class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: true,
      isExpanded: false,
      isDeleted: false
    };
    this.rowEar = this.rowEar.bind(this);
  }

  expandClicked = () => {
    console.log('I am here');
    if (!this.state.isDeleted) this.rowEar('expand', '');
  };

  getExpanded = () => {
    if (!this.state.isExpanded) return <Fragment />;
    return (
      <div>
        <DataTableObject style={{ width: '20%' }} subpage="x" data={this.props.row} />
      </div>
    );
  };

  rowEar(cmd, value) {
    if (cmd === 'remove') {
      this.setState({ isShowing: false, isExpanded: false });
    } else if (cmd === 'delete') {
      this.setState({ isDeleted: true, isExpanded: false });
      this.props.row.deleted = true;
      cmd = 'noop';
    } else if (cmd === 'undo') {
      this.setState({ isDeleted: false, isExpanded: false });
      this.props.row.deleted = false;
      cmd = 'noop';
    } else if (cmd === 'expand') {
      if (!this.props.row.deleted) this.setState({ isExpanded: !this.state.isExpanded });
      cmd = 'noop';
    }
    if (this.props.innerEar) this.props.innerEar(cmd, value); // pass it to the parent in case they're interested
  }

  render = (props) => {
    const { pKey, cn, item } = this.props;
    return (
      <Fragment>
        <div key={pKey + 'r'} className={cn} onClick={this.expandClicked}>
          {Object.values(item).map((val, index) => {
            return <Cell key={`${pKey}-c${index}`} item={item} value={val} />;
          })}
        </div>
        {this.getExpanded()}
      </Fragment>
    );
  };
}

export default Row;
