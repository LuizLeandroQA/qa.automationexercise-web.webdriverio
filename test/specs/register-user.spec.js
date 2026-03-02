const UserFactory = require('../../src/data/user.factory');
const UserActions = require('../../src/actions/user.actions');

describe('Regression Suite - User Registration', () => {

    it('should register and delete a user successfully', async () => {

    // ====================
    // Arrange
    // ====================
    const user = UserFactory.buildValidUser();

    // ====================
    // Act
    // ====================
    await UserActions.register(user);
    await UserActions.deleteCurrentAccount();

    // ====================
    // Assert
    // ====================
    // Assertions are handled inside Page Objects to keep spec clean.
    // If execution reaches here without error, the flow is successful.

    });

});