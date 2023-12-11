export default class VariablesRepository {
  getVariablesLink() {
    return cy.getBySel('variablesLink');
  }

  getToggleShowButton() {
    return cy.getBySel('hideShowValues');
  }
  getAddButton() {
    return cy.getBySel('addVariable');
  }

  getEnvDataRows() {
    return cy.get('.data-table > .data-row');
  }
  getVariableToDelete() {
    return cy.get('.data-table > .data-row');
  }
  getDeleteBtn(name: string) {
    this.getVariableToDelete()
      .contains(name)
      .parent()
      .within(() => {
        cy.getBySel('varDelete').click();
      });
  }
}
