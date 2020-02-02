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
        <h4>Addresses Page</h4>
        Monitors are per-address index caches that enable fast reteival of transaction histories for any account. Note
        that the transactions/logs/receipts/traces are not downloaded until you explore an address.
      </span>
    )
  ],
  [
    'caches',
    () => (
      <span>
        <h4>Caches Page</h4>
        TrueBlocks Caches greatly speed up access to the Ethereum data; however, they take up a lot of space on your
        hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.
      </span>
    )
  ],
  [
    'digests',
    () => (
      <span>
        <h4>Digests Page</h4>
        TrueBlocks index of appearances greatly speed up access to the Ethereum data; however, they take up a lot of
        space on your hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too
        big.
      </span>
    )
  ],
  [
    'explore',
    () => (
      <span>
        <h4>Explore Page</h4>
        The Explore module allows one to view the details of every transactions for each previously monitored address.
        Because TrueBlocks runs on a local machine not a server, this means that you are restricted to exploring only
        addresses that youve previously monitored.
      </span>
    )
  ],
  [
    'other',
    () => (
      <span>
        <h4>Other Page</h4>
        The Other panel allows you to configure various other items related to TrueBlocks. This panel allows for many
        things including some other stuff.
      </span>
    )
  ],
  [
    'settings',
    () => (
      <span>
        <h4>Settings Page</h4>
        Monitors are per-address index caches that enable fast retreival of appearance histories for any account.
      </span>
    )
  ],
  [
    'signatures',
    () => (
      <span>
        <h4>Signatures Page</h4>
        TrueBlocks Signatures greatly speed up access to the Ethereum data; however, they take up a lot of space on your
        hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.
      </span>
    )
  ],
  [
    'support',
    () => (
      <span>
        <h4>Support Page</h4>
        We provide various support options ranging from online email/forum discussions to full enterprise-level support
        plans to suit your needs. Weve got you covered.
      </span>
    )
  ]
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
