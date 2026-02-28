/**
 * Utility methods to generate unique test data.
 */
class Random {
    /**
   * Generates a unique email using timestamp.
   * @param {string} prefix email prefix
   * @returns {string} unique email
   */
    static email(prefix = 'qa') {
    return `${prefix}.${Date.now()}@mailinator.com`;
    }
}

module.exports = Random;