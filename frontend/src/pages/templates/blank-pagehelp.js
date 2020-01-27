import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes from '../routes';

const helpToPage = new Map([
  [
    'root',
    () => (
      <span>
        Learn about the TrueBlocks project, our organization, our philosopy towards decentralization, and our team.
      </span>
    )
  ][{PAGEHELP}]
]);

// Dashboard and root share the same help
helpToPage.set('dashboard', helpToPage.get('root'));

export default function PageHelp() {
  return (
    <Switch>
      {Routes.map((route, index) => (
        <Route key={index} render={helpToPage.get(route.name)} exact={route.exact} path={route.path} />
      ))}
    </Switch>
  );
}
