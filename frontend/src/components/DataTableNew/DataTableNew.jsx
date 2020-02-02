//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './DataTableNew.css';
import Header from './Header';
import Body from './Body';
import * as Utils from '../../utils';
import { DataTableControls } from '../DataTableControls';

//---------------------------------------------------------------------
class DataTableNew extends React.Component {
  render = (props) => {
    const { fields, rows, ear } = this.props;
    return (
      <Fragment>
        <DataTableControls n_items={0} pages={100} cur_page={12} per_page={25} />
        <table className="dt-old">
          <Header {...Utils.getKeys('th')} fields={fields} ear={ear} />
          <Body rows={rows} ear={ear} />
        </table>
      </Fragment>
    );
  };
}

//---------------------------------------------------------------------
DataTableNew.propTypes = {
  fields: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  ear: PropTypes.func.isRequired
};

//---------------------------------------------------------------------
export default DataTableNew;
