import React from 'react';

//---------------------------------------------------
export function se_help() {
  return (
    <span>
      The settings page allows you to change settings both in the backend and the frontend. You may also modify the
      current skin, change the display formats for the data and object tables, and view the licenses of the various
      parts of the application.
    </span>
  );
}

//---------------------------------------------------
export function sec_help() {
  return (
    <span>
      The configurations page allows you to set certain options in the backend such as the Ethereum provider, the
      location and size of the various TrueBlocks caches, some of the operations of the backend such as which files get
      cached, as well as specifying any API keys you may need for external services.
    </span>
  );
}

//---------------------------------------------------
export function ses_help() {
  return (
    <span>
      Changing skins allows you to modify the look and feel of the application. Try different skins until you find one
      you like. Simply click on the skin you like to change it.
    </span>
  );
}

//---------------------------------------------------
export function sef_help() {
  return (
    <span>
      Many of the data and object tables can be customized by setting their format strings. This form allows you to
      modify those values. See the documentation for more information.
    </span>
  );
}

//---------------------------------------------------
export function sel_help() {
  return (
    <span>
      This page details the licenses of the various parts of the TrueBlocks system. Please contact us if you have
      specific needs for licensing, as we are open to trying to accomodate other arrangements.
    </span>
  );
}
