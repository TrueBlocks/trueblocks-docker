import React, { Fragment } from 'react';
//import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import discord from 'img/discord.svg';
import github from 'img/github.svg';
import medium from 'img/medium.svg';
import twitter from 'img/twitter.svg';
import './PageFooter.css';

//------------------------------------------------------------
function PageFooter(props) {
  const { isMainMenuExpanded } = props;
  const classNames = ['page-footer', isMainMenuExpanded ? 'expanded' : 'not-expanded'].join(' ');
  const openLink = (url) => () => window.open(url); //require('electron').remote.shell.openExternal(url);

  return (
    <Fragment>
      <div className={classNames}>
        <div className="footer-container">
          <div className="footer-left">
            <div>TrueBlocks, LLC • 1010 N Hancock St, Philadelpia, PA 19123</div>
            <div>
              <span onClick={openLink('http://www.quickblocks.io')} className="footer-links">
                http://www.quickblocks.io
              </span>{' '}
              •{' '}
              <span onClick={openLink('mailto:info@quickblocks.io?subject=Inquiry')} className="footer-links">
                info@quickblocks.io
              </span>
            </div>
          </div>
          <div className="footer-right">
              <img onClick={openLink('http://twitter.com/@quickblocks')} className="footer-social" alt={twitter} src={twitter} />
              <img onClick={openLink('http://github.com/Great-Hill-Corporation/trueblocks-core')} className="footer-social" alt={github} src={github} />
              <img onClick={openLink('http://medium.com/@tjayrush')} className="footer-social" alt={medium} src={medium} />
              <img onClick={openLink('https://discordapp.com/channels/570963863428661248/570963863428661250')} className="footer-social" alt={discord} src={discord} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ reducer_MainMenu }) => ({
  isMainMenuExpanded: reducer_MainMenu.isMainMenuExpanded
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageFooter);
