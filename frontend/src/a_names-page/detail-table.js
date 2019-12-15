/*-----------------------------------------------------------------------------*/
import React from 'react';
import { Fragment } from 'react';
import './detail-table.css';

/*-----------------------------------------------------------------------------*/
export class DetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.tableEar = this.tableEar.bind(this);
  }

  tableEar(cmd, value) {
    console.log('%ctableEar - ' + cmd + ' value: ' + value, 'color:green');
    this.props.innerEar(cmd, value);
  }

  getContainer = () => {
    if (!this.props.data) return <Fragment></Fragment>;
    var tt = this.props.type + '_detail_row';
    return (
      <Fragment>
        <h4>{this.props.title}</h4>
        <div className="detail_table">
          <HeadersDetail headers={this.props.fields} tableEar={this.tableEar} />
          {this.props.data.map((item, index) => (
            <div key={index + 'a0'} className={tt}>
              <ColumnItemDetail
                key={index + '-0'}
                type={this.props.type}
                item={item}
                content={item.group}
                tableEar={this.tableEar}
              />
              <ColumnItemDetail
                key={index + '-1'}
                type={this.props.type}
                item={item}
                content={item.address}
                tableEar={this.tableEar}
              />
              <ColumnItemDetail
                key={index + '-2'}
                type={this.props.type}
                item={item}
                content={item.name}
                tableEar={this.tableEar}
              />
              <ColumnItemDetail
                key={index + '-3'}
                type={this.props.type}
                item={item}
                content={item.symbol}
                tableEar={this.tableEar}
              />
              <ColumnItemDetail
                key={index + '-4'}
                type={this.props.type}
                item={item}
                content={'a'}
                tableEar={this.tableEar}
              />
              <ColumnItemDetail
                key={index + '-5'}
                type={this.props.type}
                item={item}
                content={item.description.substr(0, 50) + '...'}
                tableEar={this.tableEar}
              />
              <ColumnItemDetail
                key={index + '-6'}
                type={this.props.type}
                item={item}
                content={'0 1 1'}
                tableEar={this.tableEar}
              />
            </div>
          ))}
        </div>
      </Fragment>
    );
  };

  render = () => {
    return this.getContainer();
  };
}

/*-----------------------------------------------------------------------------*/
class HeadersDetail extends React.Component {
  constructor(props) {
    super(props);
    this.headerEar = this.headerEar.bind(this);
  }

  headerEar(cmd, value) {
    console.log('%cheaderEar - ' + cmd + ' value: ' + value, 'color:green');
    this.props.tableEar(cmd, value);
  }

  render = () => {
    return (
      <div className="names_detail_header">
        {this.props.headers.map((field) => (
          <HeaderItemDetail key={field} content={field} headerEar={this.headerEar} />
        ))}
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class HeaderItemDetail extends React.Component {
  sortClicked = (el) => {
    this.props.headerEar('sort', this.props.content);
  };
  render = () => {
    return <div onClick={this.sortClicked}>{this.props.content}</div>;
  };
}

/*-----------------------------------------------------------------------------*/
class ColumnItemDetail extends React.Component {
  expandClicked = () => {
    this.props.tableEar('expand', this.props.item);
  };
  //onMouseOver={this.expandClicked}
  render = () => {
    return (
      <div className={this.props.type + '_table_item'} onClick={this.expandClicked}>
        {this.props.content}
      </div>
    );
  };
}
