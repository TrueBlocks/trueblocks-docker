const panelSelector = '.side-panel.status-panel';
let panel = null;

beforeEach(() => {
    cy.visit('/');
    panel = cy.get(panelSelector);
});

describe('Status panel', () => {
    it('should be expanded by default', () => {
        panel
            .should('not.have.class', 'shrinked');
    });

    it('can be shrunk and expanded', () => {
        const togglePanel = () => {
            panel
                .find('i.material-icons')
                .click();
        };

        togglePanel();

        panel
            .should('have.class', 'shrinked');

        togglePanel();

        panel
            .should('not.have.class', 'shrinked');
    });
});
