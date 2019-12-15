/*-----------------------------------------------------------------------------*/
import React from 'react';
import { Fragment } from 'react';
import './names.css';
import { fmtInteger } from '../z_utils/number_fmt';

/*-----------------------------------------------------------------------------*/
export class SummaryTable extends React.Component {
  constructor(props) {
    super(props);
    this.summaryTableEar = this.summaryTableEar.bind(this);
  }

  summaryTableEar(cmd, value) {
    console.log('%csummaryTableEar - ' + cmd + ' value: ' + value, 'color:green');
    this.props.innerEar(cmd, value);
  }

  render = () => {
    return (
      <Fragment>
        <h4>{this.props.title}</h4>
        {this.props.data.map((_row) => {
          return <SummaryTableRow key={_row.id} row={_row} summaryTableEar={this.summaryTableEar} />;
        })}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
export class SummaryTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.summaryRowEar = this.summaryRowEar.bind(this);
  }

  summaryRowEar(cmd, value) {
    console.log('%csummaryRowEar - ' + cmd + ' value: ' + value, 'color:green');
    this.props.summaryTableEar(cmd, value);
  }

  render = () => {
    return (
      <div className="wrapper">
        <First />
        <HeadersSummary headers={this.props.row.items} />
        <Last />

        <First id={this.props.row.id} />
        <Items items={this.props.row.items} summaryRowEar={this.summaryRowEar} />
        <Last endnote={this.props.row.endnote} />
        <Separator />
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
export class HeadersSummary extends React.Component {
  render = () => {
    return (
      <Fragment>
        {this.props.headers.map((item) => (
          <HeaderItemSummary key={item.header} header={item.header} />
        ))}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
export class HeaderItemSummary extends React.Component {
  render = () => {
    return (
      <div className={!this.props.header || this.props.header === '' ? 'names box endpad' : 'names box header'}>
        {this.props.header}
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
export class Items extends React.Component {
  constructor(props) {
    super(props);
    this.itemsEar = this.itemsEar.bind(this);
  }

  itemsEar(cmd, value) {
    console.log('%citemsEar - ' + cmd + ' value: ' + value, 'color:green');
    this.props.summaryRowEar(cmd, value);
  }

  render = () => {
    return (
      <Fragment>
        {this.props.items.map((item) => (
          <ColumnItemSummary key={item.header} id={item.header} value={item.value} itemsEar={this.itemsEar} />
        ))}
      </Fragment>
    );
  };
}

/*-----------------------------------------------------------------------------*/
export class ColumnItemSummary extends React.Component {
  itemClicked = () => {
    this.props.itemsEar('change_type', this.props.id);
  };

  render = () => {
    return (
      <div
        key={this.props.type}
        className={this.props.id === '' ? 'names box endpad' : 'names box col-item'}
        onClick={this.itemClicked}
      >
        {this.props.id === '' ? '' : fmtInteger(this.props.value)}
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
export class First extends React.Component {
  render = () => {
    return (
      <div className={!this.props.id || this.props.id === '' ? 'names box frontpad' : 'names box row-head'}>
        {this.props.id}
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
export class Last extends React.Component {
  render = () => {
    return <div className="names box endpad">{this.props.endnote}</div>;
  };
}

/*-----------------------------------------------------------------------------*/
export class Separator extends React.Component {
  render = () => {
    return <div className="names box sep"></div>;
  };
}
