//---------------------------------------------------------------------
import React from 'react';
import ConnectionComponent from '../z_components';
import NamesInner from './names-inner';

//---------------------------------------------------------------------
const Names = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <NamesInner props={props} />
  </div>
);

export default Names;
