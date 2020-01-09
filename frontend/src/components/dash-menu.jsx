/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import './dash-menu.css';
import * as ad from '../pages/addresses/dispatchers';
import * as ex from '../pages/explore/dispatchers';
import * as ind from '../pages/indicies/dispatchers';
import * as ca from '../pages/caches/dispatchers';
import * as si from '../pages/signatures/dispatchers';
import * as ot from '../pages/other/dispatchers';
import * as se from '../pages/settings/dispatchers';
import * as su from '../pages/support/dispatchers';

const utils = require('../utils');

/*-----------------------------------------------------------------------------*/
export const getDashMenu = () => {
  var theMenu = [];
  theMenu.push(ad.addresses_menu);
  theMenu.push(ex.explore_menu);
  theMenu.push(ind.indicies_menu);
  theMenu.push(si.signatures_menu);
  theMenu.push(ca.caches_menu);
  theMenu.push(ot.other_menu);
  theMenu.push(se.settings_menu);
  theMenu.push(su.support_menu);
  return theMenu;
};

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
            key={(this.props.row.page + '_' + item.subpage + '_h').toLowerCase()}
            subpage={item.subpage}
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
    var empty = this.props.subpage.includes('-');
    var cn = empty ? 'summary-table box endpad ' : 'summary-table box header ' + this.props.color;
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
    this.props.changePage(this.props.row.page.toLowerCase(), this.props.item.action);
  };

  render = () => {
    var empty = this.props.item.subpage.includes('-');
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
