/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import { LastCol, SepRow } from './dash-menu';
import * as utils from '../../utils';
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
        {this.props.row.items.map((item, i) => (
          <HeaderCol key={'h' + i} subpage={item.subpage} color={this.props.row.color} />
        ))}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class HeaderCol extends React.Component {
  render = () => {
    var empty = this.props.subpage.substr(0, 2) === 'e-' || this.props.subpage.includes('-00');
    var cn = empty
      ? 'summary-table box endpad '
      : 'summary-table box header ' + this.props.color + (this._reactInternalFiber.index === 0 ? ' lborder' : '');
    var head = empty ? '' : this.props.subpage;
    return <div className={cn}>{head}</div>;
  };
}

/*-----------------------------------------------------------------------------*/
class ItemCols extends React.Component {
  render = () => {
    return (
      <Fragment>
        {this.props.row.items.map((item) => (
          <ItemCol {...this.props} key={item.subpage} item={item} />
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
    var empty = this.props.item.subpage.substr(0, 2) === 'e-' || this.props.item.subpage.includes('-00');
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
