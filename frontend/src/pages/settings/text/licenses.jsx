import React, { Fragment } from 'react';

export const licensesText = () => {
  const explain1 = `All files in the folder ./src/apps and in all files in subfolders of that folder are:`;
  const lic1 = `\
 /*-------------------------------------------------------------------------\n\
  * Confidential proprietary information of TrueBlocks, LLC\n\
  * Copyright (c) 2016, 2020 TrueBlocks, LLC (http://trueblocks.io)\n\
  *------------------------------------------------------------------------*/\n`;

  const explain2 = `Remaining files, folders, and data other than the above (and unless otherwise noted) are MIT licensed and are:`;
  const lic2 = `\
 /*-------------------------------------------------------------------------\n\
  * TrueBlocks - fully-decentralized data from blockchains\n\
  * Copyright (c) 2016, 2020 TrueBlocks, LLC (http://trueblocks.io)\n\
  *------------------------------------------------------------------------*/\n`;

  const explain3 = `The code in the file: ./src/libs/utillib/biguint.cpp is:`;
  const lic3 = `\
 /*-------------------------------------------------------------------------\n\
  * Derived from https://mattmccutchen.net/bigint/index.html, where it says:\n\
  * "I, Matt McCutchen, the sole author of the original Big Integer Library,\n\
  * waive my copyright to it, placing it in the public domain. The library\n\
  * comes with absolutely no warranty."\n\
  *------------------------------------------------------------------------*/`;

  const explain4 = 'The code in the file: ./src/libs/utillib/memmap.cpp is';
  const lic4 = `\
 /*-------------------------------------------------------------------------\n\
  * Copyright (c) 2013 Stephan Brumme. All rights Reserved.\n\
  * Author: Stephan Brumme Rudolf-Breitscheid-Str. 226 14482 Potsdam, Germany\n\
  * http://create.stephan-brumme.com/disclaimer.html\n\
  * Page accessed: October 21, 2017 - 11:13:20 PM EST\n\
  *\n\
  * License:\n\
  * Unless otherwise noted, all source code and its sub-pages is licensed similar\n\
  * to the zlib license: This software is provided as-is, without any express or\n\
  * implied warranty. In no event will the author be held liable for any damages\n\
  * arising from the use of this software. Permission is granted to anyone to use\n\
  * this software for any purpose, including commercial applications, and to alter\n\
  * it and redistribute it freely, subject to the following restrictions:\n\
  * o - The origin of this software must not be misrepresented; you must not claim\n\
  *     that you wrote the original software.\n\
  * o - If you use this software in a product, an acknowledgment in the product\n\
  *     documentation would be appreciated but is not required.\n\
  * o - Altered source versions must be plainly marked as such, and must not be\n\
  *     misrepresented as being the original software.\n\
  *
  * Notice:\n\
  * This source code has been modified by TrueBlocks, LLC to conform to formatting\n\
  * preferences, improve preformance, as well as other minor changes.\n\
  *------------------------------------------------------------------------*/\n`;

  const style1 = { marginLeft: '2%' };
  const style2 = { backgroundColor: 'antiquewhite', color: 'darkred', width: '700px', marginLeft: '2%' };
  return (
    <Fragment>
      <h4>Licensing notes</h4>
      <p></p>
      <h5 style={style1}>{explain1}</h5>
      <pre style={style2}>
        <small>{lic1}</small>
      </pre>
      <h5 style={style1}>{explain2}</h5>
      <pre style={style2}>
        <small>{lic2}</small>
      </pre>
      <h4>Otherwise notes</h4>
      <p></p>
      <h5 style={style1}>{explain3}</h5>
      <pre style={style2}>
        <small>{lic3}</small>
      </pre>
      <h5 style={style1}>{explain4}</h5>
      <pre style={style2}>
        <small>{lic4}</small>
      </pre>
    </Fragment>
  );
};
