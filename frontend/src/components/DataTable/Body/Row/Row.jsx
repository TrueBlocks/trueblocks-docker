//----------------------------------------------------------------------
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import ObjectTable from 'components/ObjectTable';
import IconTray from 'components/IconTray';
import { addrDisplay } from 'components/Identicons';
import '../../DataTable.css';

/**
 * A row in the Body component of the DataTable component
 * @param {array} rows - an JSON array of rows of data
 * @param {array} theFields - JSON array matching rows describing types of columns in rows
 * @param {array} displayMap - Map describing which fields to display and alternative name for fields
 * @param {func} rowEar - listener to bubble up events to the body, handled by rowEar first
 * @param {string} pKey - the key of the containing Body
 * @param {string} cn - className for this row
 * @param {array} icons - a list of icons for the icon tray
 */
class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: true,
      isExpanded: false,
      isDeleted: false,
      wasDeleted: false
    };
    this.cellEar = this.cellEar.bind(this);
  }

  getExpanded = () => {
    if (!this.state.isExpanded) return <Fragment />;
    let title = this.props.row['display_name'];
    title += ' (' + this.props.row['nRecords'] + ' appearances';
    title += ' - ' + this.props.row['curEther'] + ' balance in Ether)';
    return (
      <div style={{ borderBottom: 'solid 1px', borderRight: 'solid 1px' }}>
        <ObjectTable
          options={{ style: { width: '75%', margin: '.5% 0% .5% 12.5%', padding: '0px' }, header: true, sider: true }}
          title={title}
          theFields={this.props.theFields}
          object={this.props.row}
          tableEar={this.cellEar}
        />
      </div>
    );
  };

  getIdenticon(row, pKey, deleted) {
    const i = addrDisplay(row['address'], deleted);
    return <Cell key={pKey + '-x'} content={i} align="center" />;
  }

  cellEar(cmd, value) {
    if (cmd === 'launch') {
      // LAUNCH
      const url = 'https://etherscan.io/address/' + value;
      window.open(url, '_blank');
    } else if (cmd === 'explore') {
      // EXPLORE
      const url = '/explore/accounts/export+addrs=' + value + '&occurrence=0&all_abis&articulate';
      window.open(url, '_self');
    } else if (cmd === 'refresh') {
      // REFRESH
      this.props.rowEar(cmd, value);
    } else if (cmd === 'add') {
      // ADD
      this.props.rowEar(cmd, value);
    } else if (cmd === 'remove') {
      // REMOVE
      this.setState({ isShowing: false, isExpanded: false });
      this.props.rowEar(cmd, value); // pass it to the parent in case they're interested
    } else if (cmd === 'delete') {
      // DELETE
      this.setState({ isDeleted: true, wasDeleted: false, isExpanded: false });
      this.props.row.deleted = true;
      this.props.rowEar(cmd, value); // pass it to the parent in case they're interested
    } else if (cmd === 'undo') {
      // UNDO
      this.setState({ isDeleted: false, wasDeleted: true, isExpanded: false });
      this.props.row.deleted = false;
      this.props.rowEar(cmd, value); // pass it to the parent in case they're interested
    } else if (cmd === 'expand') {
      // EXPAND
      console.log('expand-in', this.state.isExpanded);
      if (!this.state.isDeleted && !this.state.wasDeleted) this.setState({ isExpanded: !this.state.isExpanded });
      else this.setState({ isDeleted: false, wasDeleted: false });
      this.props.rowEar(cmd, value); // pass it to the parent in case they're interested
      console.log('expand-out', this.state.isExpanded);
    }
  }

  render = (props) => {
    const { pKey, cn, row, icon_list } = this.props;
    if (!this.state.isShowing) {
      return <Fragment></Fragment>;
    }
    return (
      <Fragment>
        <div key={pKey + 'r'} className={cn}>
          {
            <Fragment>
              {Object.keys(row).map((key, index) => {
                const showing = this.props.displayMap.get(key) && this.props.displayMap.get(key).showing;
                let val = row[key];
                val = typeof val === 'object' ? JSON.stringify(val) : val;
                return <Cell key={`${pKey}-c${index}`} showing={showing} content={val} cellEar={this.cellEar} />;
              })}
            </Fragment>
          }
          <IconTray
            cn="dt_td"
            key={pKey + '-it'}
            content={row['address'] === undefined ? ' ' : row['address']}
            trayEar={this.cellEar}
            icons={icon_list}
          />
        </div>
        {this.getExpanded()}
      </Fragment>
    );
  };
}

//----------------------------------------------------------------------
Row.propTypes = {
  rowEar: PropTypes.func.isRequired
};

//----------------------------------------------------------------------
export default Row;
