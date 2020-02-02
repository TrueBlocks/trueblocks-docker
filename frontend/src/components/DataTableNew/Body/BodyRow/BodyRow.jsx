//----------------------------------------------------------------------
import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';
import { DataTableObject } from '../../../DataTableObject';
import Cell from './Cell';
import IconCell from './IconCell';
import { addrDisplay } from '../../../Identicons';
var Utils = require('../../../../utils');

//---------------------------------------------------------------------
export default class BodyRow extends React.Component {
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
    if (!this.state.isDeleted) this.rowEar('expand', '');
  };

  getExpanded = () => {
    this.props.onCloseAll();
    if (!this.state.isExpanded) return <Fragment />;
    return (
      <tr>
        <td colspan="10">
          <DataTableObject style={{ width: '20%' }} subpage="x" data={this.props.row} />
        </td>
      </tr>
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

  render = () => {
    const fa = this.props.row.firstAppearance;
    const la = this.props.row.latestAppearance;
    const nr = this.props.row.nRecords;
    var deleted = this.props.row.deleted || this.state.isDeleted;

    const g = this.props.row.group;
    const a = this.props.row.address;
    const k = a.substr(a.length - 4, a.length);
    const n = this.props.row.name;
    const f = Utils.fmtInteger(fa);
    const l = Utils.fmtInteger(la);
    const r = Utils.fmtInteger(la - fa);
    const c = Utils.fmtInteger(nr);
    const z = Utils.fmtInteger(this.props.row.sizeInBytes);
    const e = Utils.fmtDouble(this.props.row.curEther, 18);
    const d = (g ? g + ': ' : '') + (n ? n : a);
    const q = nr ? Utils.fmtInteger((Math.floor((la - fa) / nr) * 100) / 100) : 0;
    const i = addrDisplay(a, deleted);

    if (!this.state.isShowing) {
      return <Fragment></Fragment>;
    }

    return (
      <Fragment>
        <tr
          key={this.props.row.address}
          className={this.props.row.deleted || this.state.isDeleted ? 'dt-old deleted' : 'dt-old'}
          onClick={this.expandClicked}
        >
          <Cell key={k + '-x'} content={i} align="center" />
          <Cell key={k + '-d'} content={d} align="left" />
          <Cell key={k + '-f'} content={f} align="right" />
          <Cell key={k + '-l'} content={l} align="right" />
          <Cell key={k + '-r'} content={r} align="right" />
          <Cell key={k + '-c'} content={c} align="right" />
          <Cell key={k + '-q'} content={q} align="right" />
          <Cell key={k + '-z'} content={z} align="right" />
          <Cell key={k + '-e'} content={e} align="right" />
          <IconCell key={k + '-b'} content={a} rowEar={this.rowEar} deleted={deleted} />
        </tr>
        {this.getExpanded()}
      </Fragment>
    );
  };
}
