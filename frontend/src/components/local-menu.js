/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import { LastCol, SepRow } from './dash-menu';
import * as utils from '../utils';
import './local-menu.css';

/*-----------------------------------------------------------------------------*/
export class LocalMenu extends React.Component {
  render = () => {
    var _row = this.props.data;
    return (
      <Fragment>
        <BigRow key={_row.page.toLowerCase()} {...this.props} row={_row} no_labels />
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class BigRow extends React.Component {
  render = () => {
    var id = this.props.row.page.toLowerCase();
    var { no_labels, ...other } = this.props;
    return (
      <div className="wrapper1">
        <HeaderCols key={id + '_02'} {...other} />
        <LastCol key={id + '_03'} {...other} />

        <ItemCols key={id + '_12'} {...other} no_labels={no_labels} />
        <LastCol key={id + '_13'} {...other} />

        <SepRow key={id + '_21'} />
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class HeaderCols extends React.Component {
  render = () => {
    return (
      <Fragment>
        {this.props.row.submenu.map((item, i) => (
          <HeaderCol key={'h' + i} menu_text={item.menu_text} color={this.props.row.color} />
        ))}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class HeaderCol extends React.Component {
  render = () => {
    var empty = this.props.menu_text.substr(0, 2) === 'e-' || this.props.menu_text.includes('-00');
    var cn = empty
      ? 'summary-table box endpad '
      : 'summary-table box header ' + this.props.color + (this._reactInternalFiber.index === 0 ? ' lborder' : '');
    var head = empty ? '' : this.props.menu_text;
    return <div className={cn}>{head}</div>;
  };
}

/*-----------------------------------------------------------------------------*/
class ItemCols extends React.Component {
  render = () => {
    return (
      <Fragment>
        {this.props.row.submenu.map((item) => (
          <ItemCol {...this.props} key={item.menu_text} item={item} />
        ))}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class ItemCol extends React.Component {
  itemClicked = () => {
    this.props.innerEar('change_subpage', this.props.item.action);
  };

  render = () => {
    var empty = this.props.item.menu_text.substr(0, 2) === 'e-' || this.props.item.menu_text.includes('-00');
    var cn =
      (empty
        ? 'summary-table box endpad '
        : this.props.item.action === this.props.active
        ? 'summary-table box col-item selected'
        : 'summary-table box col-item ') + (this._reactInternalFiber.index === 0 ? ' lborder' : '');
    if (empty) {
      return (
        <div key={this.props.type} className={cn}>
          <Fragment></Fragment>
        </div>
      );
    }

    var value = empty ? '' : utils.fmtInteger(this.props.item.value);
    return (
      <div key={this.props.type} className={cn} onClick={this.itemClicked}>
        <button>{value}</button>
      </div>
    );
  };
}
