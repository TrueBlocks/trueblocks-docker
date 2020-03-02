//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
//import FooterCell from './FooterCell';
import '../DataTable.css';

// const data = [
//   ['Foo', 'programmer'],
//   ['Bar', 'bus driver'],
//   ['Moo', 'Reindeer Hunter']
// ];

let someData;
let asText = false;
function onDownload() {
  console.log('xxx:', someData, ' size: ', someData.length);
  var csv;
  for (var i = 0; i < someData.length; i++) {
    var row = someData[i];
    // console.log('i: ', i, ' row: ', row);
    csv += [row.group, row.address, row.name].join(asText ? '\t' : ',');
    csv += '\n';
  }
  console.log(csv);
  var hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/' + (asText ? 'text' : 'csv') + ';charset=utf-8,' + encodeURI(csv);
  hiddenElement.target = '_blank';
  hiddenElement.download = 'download.' + (asText ? 'text' : 'csv');
  hiddenElement.click();
}
function onDownload1() {
  asText = true;
  return onDownload();
}
function onDownload2() {
  asText = false;
  return onDownload();
}
function Footer({ pKey, theData, theFields, displayMap, sortCtx, headerEar }) {
  console.log('pKey: ', pKey);
  console.log('theData: ', theData);
  console.log('theFields: ', theFields);
  console.log('displayMap: ', displayMap);
  someData = theData;
  console.log('someData: ', someData);
  return (
    <div className={'dt_foot 10fr 1fr'}>
      <div></div>
      <div>
        <button onClick={onDownload1}>Text</button>
        <button onClick={onDownload2}>CSV</button>
      </div>
    </div>
  );
}

//----------------------------------------------------------------------
Footer.propTypes = {
  theFields: PropTypes.array.isRequired,
  sortCtx: PropTypes.object.isRequired,
  ear: PropTypes.func
};

//----------------------------------------------------------------------
export default Footer;
