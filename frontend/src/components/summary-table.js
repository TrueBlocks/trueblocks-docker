/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import './summary-table.css';
const utils = require('../utils');

/*-----------------------------------------------------------------------------*/
export class SummaryTable extends React.Component {
  render = () => {
    return (
      <Fragment>
        {this.props.data.map((_row) => {
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
    var empty = this.props.header.substr(0, 2) === 'e-';
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
    this.props.innerEar(this.props.no_labels ? 'change_subpage' : 'goto_page', this.props.item.route_to);
  };

  render = () => {
    var empty = this.props.item.header.substr(0, 2) === 'e-';
    var cn = empty
      ? 'summary-table box endpad '
      : this.props.item.route_to === this.props.active
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
  itemClicked = () => {
    if (this.props.no_labels) {
      this.props.innerEar('goto_page', '/');
    }
  };

  render = () => {
    var cn = this.props.no_labels ? 'summary-table box frontpad' : 'summary-table box row-head';
    return (
      <div className={cn} onClick={this.itemClicked}>
        {this.props.no_labels ? (this.props.linked ? 'Home' : '') : this.props.row.page}
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
