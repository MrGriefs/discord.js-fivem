'use strict';

/** Add utility methods for identifiers */
class Identifiers {
  /**
   * @param {Array<string>} identifiers - The identifiers this utility uses
   */
  constructor(identifiers = []) {
    this.array = identifiers;
    this.raw = {};
    for (const identifier of this.array) {
      const prefix = identifier.replace(/:\d+$/, '');
      this.raw[prefix] = identifier.slice(prefix.length + 1);
    }
  }

  /**
   * Returns the identifier
   * @param {string} identifier - The identifier to return
   * @returns {?string}
   */
  get(identifier) {
    return this.raw[identifier] ?? null;
  }

  /**
   * @type {string}
   */
  get steam() {
    return this.raw.steam ?? null;
  }

  /**
   * @type {string}
   */
  get license() {
    return this.raw.license ?? null;
  }

  /**
   * @type {string}
   */
  get license2() {
    return this.raw.license2 ?? null;
  }

  /**
   * @type {string}
   */
  get discord() {
    return this.raw.discord ?? null;
  }

  /**
   * @type {string}
   */
  get xbl() {
    return this.raw.xbl ?? null;
  }

  /**
   * @type {string}
   */
  get live() {
    return this.raw.live ?? null;
  }

  /**
   * @type {string}
   */
  get fivem() {
    return this.raw.fivem ?? null;
  }

  /**
   * @type {string}
   */
  get ip() {
    return this.raw.ip ?? null;
  }
}

module.exports = Identifiers;
