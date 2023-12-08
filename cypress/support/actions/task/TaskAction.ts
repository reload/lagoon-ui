import TaskRepository from 'cypress/support/repositories/task/TaskRepository';

const task = new TaskRepository();

export default class TaskAction {
  doNavToRunningTask() {
    cy.get('.results div').eq(6).click({ force: true });

    cy.waitForNetworkIdle('@idle', 500);

    cy.get(`[id^="react-select-"][id$=-option-4]`).click();

    cy.get('.taskRow').find('.pending').click();
  }
  doCancelTask() {
    task.getCancelBtn().first().click();

    cy.wait('@gqlcancelTaskMutation');

    task.getCancelBtn().first().should('have.text', 'Cancelled');
  }

  doFailedCancelTask() {
    task.getCancelBtn().first().click();

    cy.wait('@gqlcancelTaskMutation');

    task.getErrorNotification().should('exist').should('include.text', 'There was a problem cancelling a task.');
  }
}
