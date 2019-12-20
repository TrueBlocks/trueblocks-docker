/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import './local-menu.css';
const utils = require('../utils');

/*-----------------------------------------------------------------------------*/
export class LocalMenu extends React.Component {
  render = () => {
    return (
      <Fragment>
        {this.props.data.map((_row) => {
          return <BigRow key={_row.page.toLowerCase()} {...this.props} row={_row} no_labels />;
        })}
        <h4>
          Active subpage:{' '}
          {this.props.active
            ? typeof this.props.active === 'object'
              ? JSON.stringify(this.props.active)
              : this.props.active
            : ''}
        </h4>
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
          <HeaderCol key={'h' + i} header={item.header} color={this.props.row.color} />
        ))}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class HeaderCol extends React.Component {
  render = () => {
    var empty = this.props.header.substr(0, 2) === 'e-';
    var cn = empty
      ? 'summary-table box endpad '
      : 'summary-table box header ' + this.props.color + (this._reactInternalFiber.index === 0 ? ' lborder' : '');
    var head = empty ? '' : this.props.header;
    return <div className={cn}>{head}</div>;
  };
}

/*-----------------------------------------------------------------------------*/
class ItemCols extends React.Component {
  render = () => {
    return (
      <Fragment>
        {this.props.row.items.map((item) => (
          <ItemCol {...this.props} key={item.header} item={item} />
        ))}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class ItemCol extends React.Component {
  itemClicked = () => {
    this.props.innerEar(this.props.no_labels ? 'change_subpage' : 'goto_page', this.props.item.route_to);
  };

  render = () => {
    var empty = this.props.item.header.substr(0, 2) === 'e-';
    var cn =
      (empty
        ? 'summary-table box endpad '
        : this.props.item.route_to === this.props.active
        ? 'summary-table box col-item selected'
        : 'summary-table box col-item ') + (this._reactInternalFiber.index === 0 ? ' lborder' : '');
    var value = empty ? '' : utils.fmtInteger(this.props.item.value);
    return (
      <div key={this.props.type} className={cn} onClick={this.itemClicked}>
        <button>{value}</button>
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class LastCol extends React.Component {
  render = () => {
    return <div className="summary-table box endpad">{this.props.row.endnote}</div>;
  };
}

/*-----------------------------------------------------------------------------*/
class SepRow extends React.Component {
  render = () => {
    return <div className="summary-table box sep"></div>;
  };
}
