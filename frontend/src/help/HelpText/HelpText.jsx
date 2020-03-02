import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from 'routes';

import { ro_help } from 'help/root';
import { ad_help, ad_mo_help, ad_na_help, ad_wa_help, ad_to_help, ad_pr_help, ad_ot_help } from 'help/addresses';
import { mo_help, mo_pr_help, mo_ad_help, mo_da_help, mo_sc_help } from 'help/monitors';
import { na_help, na_yo_help, na_wa_help, na_to_help } from 'help/names';
import { na_pr_help, na_ot_help, na_na_help, na_gr_help } from 'help/names';
import { ex_help, ex_ac_help, ex_bl_help, ex_tr_help, ex_re_help, ex_lo_help, ex_tc_help } from 'help/explore';
import { di_help, di_fi_help, di_st_help, di_un_help, di_co_help } from 'help/digests';
import { ca_help, ca_bl_help, ca_tr_help, ca_tc_help, ca_sl_help, ca_pr_help, ca_ab_help } from 'help/caches';
import { se_help, se_co_help, se_sk_help, se_fo_help, se_li_help } from 'help/settings';
import { su_help, su_fr_help, su_pe_help, su_do_help, su_co_help, su_ab_help } from 'help/support';

const helpMap = new Map([
  ['root', ro_help],

  ['addresses/', ad_help],
  ['addresses/monitors', ad_mo_help],
  ['addresses/names', ad_na_help],
  ['addresses/wallets', ad_wa_help],
  ['addresses/tokens', ad_to_help],
  ['addresses/prefunds', ad_pr_help],
  ['addresses/other', ad_ot_help],

  ['monitors/', mo_help],
  ['monitors/projects', mo_pr_help],
  ['monitors/addresses', mo_ad_help],
  ['monitors/daemon', mo_da_help],
  ['monitors/scraper', mo_sc_help],

  [('names/', na_help)],
  ['names/your_names', na_yo_help],
  ['names/wallets', na_wa_help],
  ['names/tokens', na_to_help],
  ['names/prefunds', na_pr_help],
  ['names/other_names', na_ot_help],
  ['names/named_blocks', na_na_help],
  ['names/groups', na_gr_help],

  ['explore/', ex_help],
  ['explore/accounts', ex_ac_help],
  ['explore/blocks', ex_bl_help],
  ['explore/transactions', ex_tr_help],
  ['explore/receipts', ex_re_help],
  ['explore/logs', ex_lo_help],
  ['explore/traces', ex_tc_help],

  ['digests/', di_help],
  ['digests/finalized', di_fi_help],
  ['digests/staged', di_st_help],
  ['digests/unripe', di_un_help],
  ['digests/columns', di_co_help],

  ['caches/', ca_help],
  ['caches/block_cache', ca_bl_help],
  ['caches/tx_cache', ca_tr_help],
  ['caches/trace_cache', ca_tc_help],
  ['caches/slurps', ca_sl_help],
  ['caches/prices', ca_pr_help],
  ['caches/abi_cache', ca_ab_help],

  ['settings/', se_help],
  ['settings/configuration', se_co_help],
  ['settings/skins', se_sk_help],
  ['settings/formats', se_fo_help],
  ['settings/licenses', se_li_help],

  ['support/', su_help],
  ['support/free_support', su_fr_help],
  ['support/per_incident', su_pe_help],
  ['support/documentation', su_do_help],
  ['support/contact_us', su_co_help],
  ['support/about_us', su_ab_help]
]);

// Dashboard and root share the same help
helpMap.set('dashboard/', helpMap.get('root'));

function getHelp(page, subpage) {
  return () => (
    <Fragment>
      <h4>{subpage ? subpage.replace('_', ' ') : page} Page</h4>
      <span>{helpMap.get(page + '/' + subpage) ? helpMap.get(page + '/' + subpage)() : page + '/' + subpage}</span>
    </Fragment>
  );
}

function HelpText({ location }) {
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

export default HelpText;
