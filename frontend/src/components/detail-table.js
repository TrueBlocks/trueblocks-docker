/*-----------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './detail-table.css';

//----------------------------------------------------------------------
export class DetailTable extends React.Component {
  constructor(props) {
    super(props);
    var fields = [];
    if (props.data && props.data.length > 0) {
      Object.keys(props.data[0]).map((key) => {
        fields.push(key);
        return null;
      });
    }
    this.state = {
      fields: fields
    };
  }

  getContainer = () => {
    if (!this.props.data) {
      return <Fragment></Fragment>;
    }

    return (
      <Fragment>
        <h4>{this.props.title}</h4>
        <div className="detail_table">
          <DTHeader {...this.props} headers={this.state.fields} />
          {this.props.data.map((item, index) => {
            return (
              <div key={index + 'a0'} className={this.props.css_pre + '_detail_row'}>
                {Object.values(item).map((val, vid) => {
                  return <DTCol key={index + '-' + vid} {...this.props} item={item} value={val} />;
                })}
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  };

  render = () => {
    return this.getContainer();
  };
}

//----------------------------------------------------------------------
class DTHeader extends React.Component {
  render = () => {
    return (
      <div className={this.props.css_pre + '_detail_header'}>
        {this.props.headers.map((field) => (
          <DTHeaderCol {...this.props} key={'h' + field} value={field} />
        ))}
      </div>
    );
  };
}
//----------------------------------------------------------------------
DTHeader.propTypes = {
  headers: PropTypes.array
};

//----------------------------------------------------------------------
class DTHeaderCol extends React.Component {
  sortClicked = (el) => {
    this.props.innerEar('sort', this.props.value);
  };

  render = () => {
    return <div onClick={this.sortClicked}>{this.props.value}</div>;
  };
}

//----------------------------------------------------------------------
DTHeaderCol.propTypes = {
  value: PropTypes.string
};

//----------------------------------------------------------------------
class DTCol extends React.Component {
  expandClicked = () => {
    this.props.innerEar('expand', this.props.item);
  };

  render = () => {
    return (
      <div className={'detail_table_item'} onClick={this.expandClicked}>
        {this.props.value}
      </div>
    );
  };
}

//----------------------------------------------------------------------
DTCol.propTypes = {
  css_pre: PropTypes.string.isRequired,
  item: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
};
