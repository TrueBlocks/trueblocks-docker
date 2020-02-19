import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from 'routes';
import { r_help } from 'help/root';
import { a_help, am_help, an_help, aw_help, at_help, ap_help, ao_help } from 'help/addresses';
import { e_help, ea_help, eb_help, et_help, er_help, el_help, etr_help } from 'help/explore';
import { d_help, df_help, ds_help, du_help, dc_help, dsh_help } from 'help/digests';
import { s_help, sd_help, sc_help, sn_help, sp_help, scr_help } from 'help/signatures';
import { c_help, cb_help, ct_help, ctr_help, cs_help, cp_help, ca_help } from 'help/caches';
import { o_help, oc_help, ok_help, og_help, op_help, ogr_help } from 'help/other';
import { se_help, sec_help, ses_help, sef_help, sel_help } from 'help/settings';
import { su_help, suf_help, sup_help, sud_help, suc_help, sua_help } from 'help/support';

const helpMap = new Map([
  ['root', r_help],
  ['addresses/', a_help],
  ['addresses/monitors', am_help],
  ['addresses/names', an_help],
  ['addresses/wallets', aw_help],
  ['addresses/tokens', at_help],
  ['addresses/prefunds', ap_help],
  ['addresses/other', ao_help],
  ['explore/', e_help],
  ['explore/accounts', ea_help],
  ['explore/blocks', eb_help],
  ['explore/transactions', et_help],
  ['explore/receipts', er_help],
  ['explore/logs', el_help],
  ['explore/traces', etr_help],
  ['digests/', d_help],
  ['digests/finalized', df_help],
  ['digests/staged', ds_help],
  ['digests/unripe', du_help],
  ['digests/columns', dc_help],
  ['digests/shared', dsh_help],
  ['signatures/', s_help],
  ['signatures/downloaded', sd_help],
  ['signatures/common', sc_help],
  ['signatures/names', sn_help],
  ['signatures/params', sp_help],
  ['signatures/cross', scr_help],
  ['caches/', c_help],
  ['caches/block_cache', cb_help],
  ['caches/tx_cache', ct_help],
  ['caches/trace_cache', ctr_help],
  ['caches/slurps', cs_help],
  ['caches/prices', cp_help],
  ['caches/abi_cache', ca_help],
  ['other/', o_help],
  ['other/custom', oc_help],
  ['other/known', ok_help],
  ['other/generated', og_help],
  ['other/prices', op_help],
  ['other/groups', ogr_help],
  ['settings/', se_help],
  ['settings/configuration', sec_help],
  ['settings/skins', ses_help],
  ['settings/formats', sef_help],
  ['settings/licenses', sel_help],
  ['support/', su_help],
  ['support/free_support', suf_help],
  ['support/per_incident', sup_help],
  ['support/documentation', sud_help],
  ['support/contact_us', suc_help],
  ['support/about_us', sua_help]
]);

// Dashboard and root share the same help
helpMap.set('dashboard/', helpMap.get('root'));

function getHelp(page, subpage) {
  return () => (
    <Fragment>
      <h4 style={{ textTransform: 'capitalize' }}>{page + (subpage ? ' / ' + subpage.replace('_', ' ') : '')} Page</h4>
      <span>{helpMap.get(page + '/' + subpage)()}</span>
    </Fragment>
  );
}

function PageHelp({ location }) {
  const array = location.pathname.split('/');
  return (
    <Switch>
      {Routes.map((route, index) => (
        <Route
          key={index}
          render={getHelp(route.name, array.length > 2 ? array[2] : '')}
          exact={route.exact}
          path={route.path}
        />
      ))}
    </Switch>
  );
}

export default PageHelp;
