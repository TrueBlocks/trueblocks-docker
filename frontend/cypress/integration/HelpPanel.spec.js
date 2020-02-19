const panelSelector = '.side-panel.help-panel';
let panel = null;

function togglePanel() {
  panel.find('i.material-icons').click();
}

function prepare(path = '/') {
  cy.visit(path);
  panel = cy.get(panelSelector);
}

function createHelpContentTest(path, helpText) {
  return function() {
    prepare(path);

    // Open panel
    togglePanel();

    cy.get(panelSelector)
      .find('div.title ~ span')
      .invoke('text')
      .should('match', new RegExp(helpText));
  };
}

beforeEach(prepare);

describe('Help panel', () => {
  it('should be shrunk by default', () => {
    panel.should('have.class', 'shrinked');
  });

  it('can be shrunk and expanded', () => {
    togglePanel();

    panel.should('not.have.class', 'shrinked');

    togglePanel();

    panel.should('have.class', 'shrinked');
  });

  // it('displays context help for Dashboard', createHelpContentTest(
  //     '/',
  //     'Learn about the TrueBlocks project, our organization, our philosopy towards decentralization, and our team.'
  // ));

  // it('displays context help for Address', createHelpContentTest(
  //     '/addresses',
  //     'Monitors are per-address index caches that enable fast reteival of transaction histories for any account. Note that the transactions\/logs\/receipts\/traces are not downloaded until you explore an address.'
  // ));

  // it('displays context help for Explore', createHelpContentTest(
  //     '/explore',
  //     'The Explore module allows one to view the details of every transactions for each previously monitored address. Because TrueBlocks runs on a local machine not a server, this means that you are restricted to exploring only addresses that youve previously monitored.'
  // ));

  // it('displays context help for Digests', createHelpContentTest(
  //     '/digests',
  //     'TrueBlocks index of appearances greatly speed up access to the Ethereum data; however, they take up a lot of space on your hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.'
  // ));

  // it('displays context help for Signatures', createHelpContentTest(
  //     '/signatures',
  //     'TrueBlocks Signatures greatly speed up access to the Ethereum data; however, they take up a lot of space on your hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.'
  // ));

  // it('displays context help for Caches', createHelpContentTest(
  //     '/caches',
  //     'TrueBlocks Caches greatly speed up access to the Ethereum data; however, they take up a lot of space on your hard drive, so you have to keep any eye on them. Clean them out periodically so they dont get too big.'
  // ));

  // it('displays context help for Other', createHelpContentTest(
  //     '/other',
  //     'The Other panel allows you to configure various other items related to TrueBlocks. This panel allows for many things including some other stuff.'
  // ));

  // it('displays context help for Settings', createHelpContentTest(
  //     '/settings',
  //     'Monitors are per-address index caches that enable fast retreival of appearance histories for any account.'
  // ));

  // it('displays context help for Support', createHelpContentTest(
  //     '/support',
  //     'We provide various support options ranging from online email/forum discussions to full enterprise-level support plans to suit your needs. Weve got you covered.'
  // ));
});
