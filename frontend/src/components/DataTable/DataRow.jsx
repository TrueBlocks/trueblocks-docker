/*-----------------------------------------------------------------------------*/
import React from 'react';
import DataCell from './DataCell';
import './DataTable.css';

//----------------------------------------------------------------------
export default class DataRow extends React.Component {
  render = () => {
    return (
      <div key={this.props.index} className={this.props.cn}>
        {Object.values(this.props.item).map((val, vid) => {
          return <DataCell key={this.props.index + '-' + vid} {...this.props} item={this.props.item} value={val} />;
        })}
      </div>
    );
  };
}
