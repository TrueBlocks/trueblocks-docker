import React, { Fragment } from 'react';

//---------------------------------------------------
export function mo_help() {
  // EXISTING_CODE
  return (
    <Fragment>
      The monitors dashboard provides a more detailed summary of the state of the monitors running on your system. You
      can turn on and off the monitor daemon, view summary statistics about your monitors, and access a list of your
      monitored addresses directly.
    </Fragment>
  );
  // EXISTING_CODE
}

//---------------------------------------------------
export function mo_pr_help() {
  // EXISTING_CODE
  return (
    <Fragment>
      The <b>Projects Page</b> allows you to group together monitored addresses giving you an overview of transactions
      within the project. Mix and match addresses, for example, to gain insight into the operation of a multi-contract
      application. Then, later, you may add addresses (or a group of addresses) to see the interaction of those
      addresses with the application application.
      <p></p>
      There's no limit to the number of addresses you can combine into a project.
    </Fragment>
  );
  // EXISTING_CODE
}

//---------------------------------------------------
export function mo_ad_help() {
  // EXISTING_CODE
  return <Fragment>The Monitors Addresses page </Fragment>;
  // EXISTING_CODE
}

//---------------------------------------------------
export function mo_da_help() {
  // EXISTING_CODE
  return <Fragment>Help for monitors daemon</Fragment>;
  // EXISTING_CODE
}

//---------------------------------------------------
export function mo_sc_help() {
  // EXISTING_CODE
  return <Fragment>Help for monitors scraper</Fragment>;
  // EXISTING_CODE
}
