import React from 'react';
import Connection from '../../components';
import IndiciesInner from './indicies-inner';

const Indicies = (props) => (
  <div className="page">
    <Connection props={props} />
    <IndiciesInner props={props} />
  </div>
);

export default Indicies;
