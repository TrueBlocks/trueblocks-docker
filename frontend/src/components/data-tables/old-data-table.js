//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import './old-data-table.css';
import Identicon from './identicons';
import { Icon } from '../icon';
var Utils = require('../../utils');

//---------------------------------------------------------------------
export class OldDataTable extends React.Component {
  render = () => {
    return (
      <table className="old-data-table">
        <HeaderRow headings={this.props.headings} innerEar={this.props.innerEar} />
        <TableBody rows={this.props.rows} innerEar={this.props.innerEar} />
      </table>
    );
  };
}

//---------------------------------------------------------------------
export class HeaderRow extends React.Component {
  render = () => {
    return (
      <thead>
        <tr key="header-0">
          {this.props.headings.map((field, cellIndex) => {
            return <HeaderCell {...this.props} key={`header-${cellIndex}`} content={field} />;
          })}
        </tr>
      </thead>
    );
  };
}

//---------------------------------------------------------------------
export class HeaderCell extends React.Component {
  sortClicked = (el) => {
    if (this.props.innerEar) this.props.innerEar('sort', this.props.content);
  };

  render = () => {
    return (
      <th key={this.key} className={'dt-header'} onClick={this.sortClicked}>
        {this.props.content}
      </th>
    );
  };
}

//---------------------------------------------------------------------
export class TableBody extends React.Component {
  render = () => {
    return (
      <tbody>
        {this.props.rows.map((_row) => {
          return <BodyRow key={_row.address} {...this.props} row={_row} />;
        })}
      </tbody>
    );
  };
}

//---------------------------------------------------------------------
export class BodyRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: true,
      isExpanded: false,
      isDeleted: false
    };
    this.rowEar = this.rowEar.bind(this);
  }

  rowEar(cmd, value) {
    console.log('%crowEar - ' + cmd + ' value: ' + value, 'color:magenta');
    if (!value) {
      console.log('%crowEar - empty value', 'color:magenta');
      return;
    }

    if (cmd === 'remove') {
      this.setState({ isShowing: false, isExpanded: false });
    } else if (cmd === 'delete') {
      this.setState({ isDeleted: true, isExpanded: false });
      this.props.row.deleted = true;
    } else if (cmd === 'undo') {
      this.setState({ isDeleted: false, isExpanded: false });
      this.props.row.deleted = false;
    } else if (cmd === 'expand') {
      if (!this.props.row.deleted) this.setState({ isExpanded: !this.state.isExpanded });
      cmd = 'noop';
    }
    if (this.props.innerEar) this.props.innerEar(cmd, value); // pass it to the parent in case they're interested
  }

  render = () => {
    const g = this.props.row.group;
    //    const s = this.props.row.subgroup;
    const a = this.props.row.address;
    const n = this.props.row.name;
    const d = (g ? g + ': ' : '') + (n ? n : a) + (this.state.isExpanded ? '(expanded)' : '');
    const x = '';
    const f = Utils.fmtInteger(this.props.row.firstAppearance);
    const l = Utils.fmtInteger(this.props.row.latestAppearance);
    const r = Utils.fmtInteger(this.props.row.latestAppearance - this.props.row.firstAppearance);
    const c = Utils.fmtInteger(this.props.row.nRecords);
    const z = Utils.fmtInteger(this.props.row.sizeInBytes);
    const e = Utils.fmtDouble(this.props.row.curEther, 18);
    const q = this.props.row.nRecords
      ? Utils.fmtInteger(
          (Math.floor((this.props.row.latestAppearance - this.props.row.firstAppearance) / this.props.row.nRecords) *
            100) /
            100
        )
      : 0;

    if (!this.state.isShowing) {
      return <Fragment></Fragment>;
    }

    var deleted = this.props.row.deleted || this.state.isDeleted;
    return (
      <tr
        key={this.props.row.address}
        className={this.props.row.deleted || this.state.isDeleted ? 'dt-row-deleted' : 'dt-row'}
      >
        <BodyCell key={a + '-x'} {...this.props} content={x} rowEar={this.rowEar} is_addr deleted={deleted} />
        <BodyCell key={a + '-d'} {...this.props} content={d} rowEar={this.rowEar} is_text />
        <BodyCell key={a + '-f'} {...this.props} content={f} rowEar={this.rowEar} />
        <BodyCell key={a + '-l'} {...this.props} content={l} rowEar={this.rowEar} />
        <BodyCell key={a + '-r'} {...this.props} content={r} rowEar={this.rowEar} />
        <BodyCell key={a + '-c'} {...this.props} content={c} rowEar={this.rowEar} />
        <BodyCell key={a + '-q'} {...this.props} content={q} rowEar={this.rowEar} />
        <BodyCell key={a + '-z'} {...this.props} content={z} rowEar={this.rowEar} />
        <BodyCell key={a + '-e'} {...this.props} content={e} rowEar={this.rowEar} />
        <IconCell key={a + '-b'} {...this.props} content={a} rowEar={this.rowEar} deleted={deleted} />
      </tr>
    );
  };
}

//---------------------------------------------------------------------
export class BodyCell extends React.Component {
  expandClicked = () => {
    this.props.rowEar('expand', this.props.row.address);
  };

  render = () => {
    var addr = this.props.row.address;
    if (this.props.is_addr && addr !== '') {
      return (
        <td className="dt-cell-center" onClick={this.expandClicked}>
          {addr.substr(0, 5)}...{addr.substr(addr.length - 4, addr.length)}{' '}
          <Identicon seed={addr} deleted={this.props.deleted} />
        </td>
      );
    }

    return (
      <td className={this.props.is_text ? 'dt-cell-left' : 'dt-cell-right'} onClick={this.expandClicked}>
        {this.props.content}
      </td>
    );
  };
}

//---------------------------------------------------------------------
export class IconCell extends React.Component {
  refreshClicked = () => {
    this.props.rowEar('refresh', this.props.content);
  };

  exploreClicked = () => {
    const url = '/explore/accounts/' + this.props.content;
    window.open(url, '_self');
  };

  removeClicked = () => {
    this.props.rowEar('remove', this.props.content);
    this.setState(this.state);
  };

  deleteClicked = () => {
    this.props.rowEar('delete', this.props.content);
    this.setState(this.state);
  };

  undoClicked = () => {
    this.props.rowEar('undo', this.props.content);
    this.setState(this.state);
  };

  launchClicked = () => {
    const url = 'https://etherscan.io/address/' + this.props.content;
    window.open(url, '_blank');
  };

  render = () => {
    if (this.props.deleted) {
      return (
        <td className="dt-cell-center">
          <Icon icon="launch" onClick={this.launchClicked} />
          <Icon icon="delete_forever" onClick={this.removeClicked} />
          <Icon icon="undo" onClick={this.undoClicked} />
        </td>
      );
    }

    return (
      <td className="dt-cell-center">
        <Icon icon="launch" onClick={this.launchClicked} />
        <Icon icon="list_alt" title="explore" onClick={this.exploreClicked} />
        <Icon icon="refresh" onClick={this.refreshClicked} />
        <Icon icon="delete_outline" title="delete" onClick={this.deleteClicked} />
      </td>
    );
  };
}
