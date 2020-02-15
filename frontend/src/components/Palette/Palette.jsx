import React, { Fragment } from 'react';
import fly50 from 'skins/fly50';
import control from 'skins/control';
import love_apart from 'skins/love_apart';
import time_likes from 'skins/time_likes';
import fay from 'skins/fay';
import futuramo from 'skins/futuramo';

export const skinList = ['fly50', 'control', 'love_apart', 'time_likes', 'fay', 'futuramo'];
export var skins = [];
skins['fly50'] = fly50;
skins['control'] = control;
skins['love_apart'] = love_apart;
skins['time_likes'] = time_likes;
skins['fay'] = fay;
skins['futuramo'] = futuramo;

export function changeSkin(newSkin) {
  let skin = skins[newSkin];
  let root = document.documentElement;
  /**/
  root.style.setProperty('--color-bg-primary', skin.colorBgPrimary);
  root.style.setProperty('--color-bg-secondary', skin.colorBgSecondary);
  root.style.setProperty('--color-text-primary', skin.colorTextPrimary);
  root.style.setProperty('--color-border-primary', skin.colorBorderPrimary);
  /**/
  root.style.setProperty('--color-table-bg-primary', skin.colorTableBgPrimary);
  root.style.setProperty('--color-table-bg-secondary', skin.colorTableBgSecondary);
  root.style.setProperty('--color-table-text-primary', skin.colorTableTextPrimary);
  root.style.setProperty('--color-table-border-primary', skin.colorTableBorderPrimary);
  /**/
  root.style.setProperty('--color-bg-hover', skin.colorBgHover);
  root.style.setProperty('--color-text-hover', skin.colorTextHover);
}

//-------------------------------------------------
export class Palette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: localStorage.getItem('skin') || 'futuramo'
    };
  }

  onSkinChanged(newSkin) {
    console.log('newSkin: ', newSkin);
    localStorage.setItem('skin', newSkin);
    this.setState({ ...this.state });
    window.open('/settings/skins/settings+skins', '_self');
  }

  render = () => {
    const { name } = this.props;
    const skin = skins[name];
    const selected = (name === this.state.current);
    const selBorder = (selected ? '5px blue double' : '1px solid' + skin.colorBorderPrimary);
    const selPadding = (selected ? '4px' : '0');
    return (
      <div onClick={() => this.onSkinChanged(name)} style={{
        display: 'grid', textAlign: 'center', margin: '1%', border: selBorder, padding: selPadding
      }}>
        <div style={{ backgroundColor: 'lightgrey', border: '1px dashed darkgrey', borderBottom: '0 !important' }}>{name}</div>
        <div
          style={{
            backgroundColor: skin.colorBgPrimary,
            color: skin.colorTextPrimary,
          }}>
          {skin.colorBgPrimary + ' / ' + skin.colorTextPrimary}
        </div>
        <div style={{
          backgroundColor: skin.colorBgSecondary,
          color: skin.colorTextPrimary
        }}>
          {skin.colorBgSecondary + ' / ' + skin.colorTextPrimary}
        </div>
        <div style={{
          backgroundColor: skin.colorTableBgPrimary,
          color: skin.colorTableTextPrimary
        }}>
          {skin.colorTableBgPrimary + ' / ' + skin.colorTableTextPrimary}
        </div>
        <div style={{
          backgroundColor: skin.colorTableBgSecondary,
          color: skin.colorTableTextPrimary
        }}>
          {skin.colorTableBgSecondary + ' / ' + skin.colorTableTextPrimary}
        </div>
        <div style={{
          backgroundColor: skin.colorBgHover,
          color: skin.colorTextHover
        }}>
          {skin.colorBgHover + ' / ' + skin.colorTextHover}
        </div>
      </div >
    );
  };
}

//----------------------------------------------------------------------
export function showSkins() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
      {skinList.map((name) => {
        return <div style={{ display: 'grid', width: '80%' }}><Palette name={name} /></div>;
      })}
    </div>
  );
}
