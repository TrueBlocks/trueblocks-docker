/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import './detail-table.css';

/*-----------------------------------------------------------------------------*/
export class DetailTable extends React.Component {
  getContainer = () => {
    if (!this.props.data) return <Fragment></Fragment>;
    var tt = this.props.css_pre + '_detail_row';
    return (
      <Fragment>
        <h4>{this.props.title}</h4>
        <div className="detail_table">
          <HeadersDetail {...this.props} headers={this.props.fields} />
          {this.props.data.map((item, index) => (
            <div key={index + 'a0'} className={tt}>
              <ColumnItemDetail
                {...this.props}
                key={index + '-0'}
                css_pre={this.props.css_pre}
                item={item}
                content={item.group}
              />
              <ColumnItemDetail
                {...this.props}
                key={index + '-1'}
                css_pre={this.props.css_pre}
                item={item}
                content={item.address}
              />
              <ColumnItemDetail
                {...this.props}
                key={index + '-2'}
                css_pre={this.props.css_pre}
                item={item}
                content={item.name}
              />
              <ColumnItemDetail
                {...this.props}
                key={index + '-3'}
                css_pre={this.props.css_pre}
                item={item}
                content={item.symbol}
              />
              <ColumnItemDetail
                {...this.props}
                key={index + '-4'}
                css_pre={this.props.css_pre}
                item={item}
                content={'a'}
              />
              <ColumnItemDetail
                {...this.props}
                key={index + '-5'}
                css_pre={this.props.css_pre}
                item={item}
                content={item.description.substr(0, 50) + '...'}
              />
              <ColumnItemDetail
                {...this.props}
                key={index + '-6'}
                css_pre={this.props.css_pre}
                item={item}
                content={'0 1 1'}
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
  render = () => {
    return (
      <div className="dashboard_detail_header">
        {this.props.headers.map((field) => (
          <HeaderItemDetail {...this.props} key={field} content={field} />
        ))}
      </div>
    );
  };
}

/*-----------------------------------------------------------------------------*/
class HeaderItemDetail extends React.Component {
  sortClicked = (el) => {
    this.props.innerEar('sort', this.props.content);
  };

  render = () => {
    return <div onClick={this.sortClicked}>{this.props.content}</div>;
  };
}

/*-----------------------------------------------------------------------------*/
class ColumnItemDetail extends React.Component {
  expandClicked = () => {
    this.props.innerEar('expand', this.props.item);
  };

  render = () => {
    return (
      <div className={this.props.css_pre + '_table_item'} onClick={this.expandClicked}>
        {this.props.content}
      </div>
    );
  };
}
