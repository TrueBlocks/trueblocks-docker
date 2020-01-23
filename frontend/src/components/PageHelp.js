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
  ],
  [
    'addresses',
      () => (
          <span>
            Monitors are per-address index caches that enable fast reteival of transaction histories for any account. Note
            that the transactions/logs/receipts/traces are not downloaded until you explore an address.
          </span>
      ),
  ],
  [
    'explore',
      () => (
          <span>
            The Explore module allows one to view the details of every transactions for each previously monitored address.
            Because TrueBlocks runs on a local machine not a server, this means that you are restricted to exploring only
            addresses that youve previously monitored.
          </span>
      ),
  ],
  [
    'indicies',
      () => (
          <span>
            TrueBlocks index of appearances greatly speed up access to the Ethereum data; however, they take up a lot of
            space on your hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too
            big.
          </span>
      ),
  ],
  [
    'signatures',
      () => (
          <span>
            TrueBlocks Signatures greatly speed up access to the Ethereum data; however, they take up a lot of space on your
            hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.
          </span>
      ),
  ],
  [
    'caches',
      () => (
          <span>
            TrueBlocks Caches greatly speed up access to the Ethereum data; however, they take up a lot of space on your
            hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.
          </span>
      ),
  ],
  [
    'other',
      () => (
          <span>
            The Other panel allows you to configure various other items related to TrueBlocks. This panel allows for many things including some other stuff.
          </span>
      ),
  ],
  [
    'settings',
      () => (
          <span>
            Monitors are per-address index caches that enable fast retreival of appearance histories for any account.
          </span>
      ),
  ],
  [
    'support',
      () => (
          <span>
            We provide various support options ranging from online email/forum discussions to full enterprise-level support
            plans to suit your needs. Weve got you covered.
          </span>
      ),
  ],
  [
    'dashboard',
    () => (<span></span>),
  ],
]);

// Dashboard and root share the same help
helpToPage.set('dashboard', helpToPage.get('root'));

export default function PageHelp() {
  return (
    <Switch>
      {Routes.map((route, index) => (
        <Route
          key={index}
          render={helpToPage.get(route.name)}
          exact={route.exact}
          path={route.path} />
      ))}
    </Switch>
  );
}