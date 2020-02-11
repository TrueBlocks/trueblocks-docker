//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

//----------------------------------------------------------------------
function Icon({ icon, title, small, midsize, large, color, bg_color, bordered, onClick }) {
  const tit = title || icon;
  let size = 'md-regular';
  if (small) size = 'md-small';
  if (midsize) size = 'md-midsize';
  if (large) size = 'md-large';
  let cn = 'material-icons ' + size + ' ' + color + (bordered ? ' bordered' : '');
  const style = bg_color ? { backgroundColor: bg_color } : {};
  return (
    <i style={style} className={cn} onClick={onClick} title={tit}>
      {icon}
    </i>
  );
}

//----------------------------------------------------------------------
Icon.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  small: PropTypes.bool,
  midsize: PropTypes.bool,
  large: PropTypes.bool,
  color: PropTypes.string,
  bg_color: PropTypes.string,
  bordered: PropTypes.bool,
  onClick: PropTypes.func
};

//----------------------------------------------------------------------
export default Icon;

//----------------------------------------------------------------------
export function SortIcon({ field, sortCtx, color }) {
  if (field === '' || field !== sortCtx.sortedBy) return <Icon midsize invisible />;
  if (sortCtx.sortDir) return <Icon midsize icon="arrow_drop_down" color={color} title="ascending" />;
  return <Icon midsize icon="arrow_drop_up" color={color} title="descending" />;
}

//----------------------------------------------------------------------
SortIcon.propTypes = {
  field: PropTypes.string.isRequired,
  sortCtx: PropTypes.object.isRequired,
  color: PropTypes.string
};
