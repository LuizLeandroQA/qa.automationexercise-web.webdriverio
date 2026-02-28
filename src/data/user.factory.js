const Random = require('../utils/random');

/**
 * Factory that builds user payloads for UI tests.
 */
class UserFactory {
    /**
   * Builds a valid user object for AutomationExercise registration.
   * @returns {object} user data
   */
    static buildValidUser() {
    return {
        title: 'Mr',
        name: 'Luiz QA',
        email: Random.email('luiz'),
        password: 'P@ssw0rd123!',
        birthDay: '12',
        birthMonth: 'March',
        birthYear: '1989',
        firstName: 'Luiz',
        lastName: 'Leandro',
        company: 'Zig',
        address1: 'Rua Exemplo 123',
        address2: 'Apto 45',
        country: 'Canada',
        state: 'SP',
        city: 'Sao Paulo',
        zipcode: '01000-000',
        mobileNumber: '11999999999',
        newsletter: true,
        offers: true,
    };
    }
}

module.exports = UserFactory;