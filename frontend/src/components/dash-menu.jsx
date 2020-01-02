/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import './dash-menu.css';
import * as ad from '../pages/addresses/actions';
import * as ex from '../pages/explore/actions';
import * as ind from '../pages/indicies/actions';
import * as ca from '../pages/caches/actions';
import * as si from '../pages/signatures/actions';
import * as ot from '../pages/other/actions';
import * as se from '../pages/settings/actions';
import * as su from '../pages/support/actions';
import * as ab from '../pages/about/actions';

const utils = require('../utils');

/*-----------------------------------------------------------------------------*/
export class DashMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: getDashMenu()
    };
  }

  render = () => {
    return (
      <Fragment>
        {this.state.menu.map((_row) => {
          return <BigRow key={_row.page.toLowerCase()} {...this.props} row={_row} />;
        })}
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
      <div className="wrapper">
        <FirstCol key={id + '_01'} {...other} no_labels />
        <HeaderCols key={id + '_02'} {...other} />
        <LastCol key={id + '_03'} {...other} />

        <FirstCol key={id + '_11'} {...other} no_labels={no_labels} linked />
        <ItemCols key={id + '_12'} {...other} no_labels={no_labels} />
        <LastCol key={id + '_13'} {...other} />

        <SepRow9 key={id + '_21'} />
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class HeaderCols extends React.Component {
  render = () => {
    return (
      <Fragment>
        {this.props.row.items.map((item) => (
          <HeaderCol
            key={(this.props.row.page + '_' + item.header + '_h').toLowerCase()}
            header={item.header}
            color={this.props.row.color}
          />
        ))}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class HeaderCol extends React.Component {
  render = () => {
    var empty = this.props.header.includes('-');
    var cn = empty ? 'summary-table box endpad ' : 'summary-table box header ' + this.props.color;
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
    this.props.changePage(this.props.row.page.toLowerCase(), this.props.item.action);
  };

  render = () => {
    var empty = this.props.item.header.includes('-');
    var cn = empty
      ? 'summary-table box endpad '
      : this.props.item.action === this.props.active
      ? 'summary-table box col-item selected'
      : 'summary-table box col-item ';
    var value = empty ? '' : utils.fmtInteger(this.props.item.value);
    return (
      <div key={this.props.type} className={cn} onClick={this.itemClicked}>
        {value}
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class FirstCol extends React.Component {
  render = () => {
    var cn = this.props.no_labels ? 'summary-table box frontpad' : 'summary-table box row-head';
    return <div className={cn}>{this.props.no_labels ? (this.props.linked ? 'Home' : '') : this.props.row.page}</div>;
  };
}

/*-----------------------------------------------------------------------------*/
export class LastCol extends React.Component {
  render = () => {
    return <div className="summary-table box endpad"></div>;
  };
}

/*-----------------------------------------------------------------------------*/
export class SepRow9 extends React.Component {
  render = () => {
    return <div className="summary-table box sep9"></div>;
  };
}

/*-----------------------------------------------------------------------------*/
export class SepRow extends React.Component {
  render = () => {
    return <div className="summary-table box sep"></div>;
  };
}

/*-----------------------------------------------------------------------------*/
export const getDashMenu = () => {
  var ret = [];
  ret.push(ad.addresses_menu[0]);
  ret.push(ex.explore_menu[0]);
  ret.push(ind.indicies_menu[0]);
  ret.push(si.signatures_menu[0]);
  ret.push(ca.caches_menu[0]);
  ret.push(ot.other_menu[0]);
  ret.push(se.settings_menu[0]);
  ret.push(su.support_menu[0]);
  ret.push(ab.about_menu[0]);
  return ret;
};
