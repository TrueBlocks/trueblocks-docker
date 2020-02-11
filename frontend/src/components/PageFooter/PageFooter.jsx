import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';

import discord from 'img/discord.svg';
import github from 'img/github.svg';
import medium from 'img/medium.svg';
import twitter from 'img/twitter.svg';
import './PageFooter.css';

//------------------------------------------------------------
function PageFooter() {
  return (
    <Fragment>
      <div className="page-footer">
        <div className="footer-container">
          <div className="left-item">
            <div>TrueBlocks, LLC • 1010 N Hancock St, Philadelpia, PA 19123</div>
            <div>
              <a className="linker" href="http://www.quickblocks.io" target="_blank" rel="noopener noreferrer">
                http://www.quickblocks.io
              </a>{' '}
              •{' '}
              <a className="linker" href="mailto:info@quickblocks.io?subject=Inquiry">
                info@quickblocks.io
              </a>
            </div>
          </div>
          <div className="right-item">
            <a href="http://twitter.com/@quickblocks" target="_blank" rel="noopener noreferrer">
              <img className="social" alt={twitter} src={twitter} />
            </a>
            <a
              href="http://github.com/Great-Hill-Corporation/trueblocks-core"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="social" alt={github} src={github} />
            </a>
            <a href="http://medium.com/@tjayrush" target="_blank" rel="noopener noreferrer">
              <img className="social" alt={medium} src={medium} />
            </a>
            <a
              href="https://discordapp.com/channels/570963863428661248/570963863428661250"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="social" alt={discord} src={discord} />
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PageFooter;
