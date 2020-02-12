//----------------------------------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/Icon';

//---------------------------------------------------------------------
function IconTray({ content, icons, cn, trayEar, style = { textAlign: 'center', padding: '2px 3px 1px 2px' } }) {
  return (
    <div className={cn} style={style}>
      {icons.map((entry, index) => {
        const icon = entry.icon || entry.action;
        const title = entry.title || entry.action;
        return (
          <Icon
            key={entry.action}
            icon={icon}
            title={title}
            onClick={entry.disabled ? noop : () => trayEar(entry.action, content)}
          />
        );
      })}
    </div>
  );
}

// let a = new AudioContext(); // browsers limit the number of concurrent audio contexts, so you better re-use'em
// function beep(vol, freq, duration) {
//   let v = a.createOscillator();
//   let u = a.createGain();
//   v.connect(u);
//   v.frequency.value = freq;
//   v.type = 'square';
//   u.connect(a.destination);
//   u.gain.value = vol * 0.01;
//   v.start(a.currentTime);
//   v.stop(a.currentTime + duration * 0.001);
// }
//----------------------------------------------------------------------
function noop() {
  // beep(5, 110, 60);
}

//----------------------------------------------------------------------
IconTray.propTypes = {
  content: PropTypes.string.isRequired,
  trayEar: PropTypes.func.isRequired,
  icons: PropTypes.array.isRequired
};

//----------------------------------------------------------------------
export default IconTray;
