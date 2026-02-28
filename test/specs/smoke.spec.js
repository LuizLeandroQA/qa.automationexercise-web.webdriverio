const HomePage = require('../../src/pages/home.page');

describe('Smoke Suite', () => {
  it('should open Automation Exercise home', async () => {
    // Arrange
    // (no setup needed)

    // Act
    await HomePage.open();

    // Assert
    await expect(browser).toHaveTitle(/Automation Exercise/i);
  });
});