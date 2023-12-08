import BackupsRepository from 'cypress/support/repositories/backups/BackupsRepository';

const backups = new BackupsRepository();

export default class BackupsAction {
  doRetrieveBackup() {
    backups.getRetrieveButton().first().click();

    cy.wait('@gqladdRestoreMutation').then(interception => {
      expect(interception.response?.statusCode).to.eq(200);
    });
  }

  doResultsLimitedchangeCheck(val: string | number) {
    const vals = {
      10: 0,
      25: 1,
      50: 2,
      100: 3,
      all: 4,
    };
    cy.get('.results div').eq(6).click({ force: true });

    cy.get(`[id^="react-select-"][id$=-option-${vals[val]}]`).click();

    if (val !== 'all') {
      backups.getResultsLimited().invoke('text').should('be.eq', `Number of results displayed is limited to ${val}`);
    } else {
      cy.location().should(loc => {
        expect(loc.search).to.eq('?limit=-1');
      });
    }
  }
}
