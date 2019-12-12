//---------------------------------------------------------------------
import React from 'react';
import ConnectionComponent from '../z_components';
import NamesInner2 from './names2';

//---------------------------------------------------------------------
const Names = (props) => (
  <div className="page">
    <ConnectionComponent props={props} />
    <NamesInner2 props={props} />
  </div>
);

export default Names;
