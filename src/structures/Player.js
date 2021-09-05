'use strict';

const { Base } = require('discord.js');
const Identifiers = require('../util/Identifiers');

/**
 * A Player object
 * @extends {Base}
 */
class Player extends Base {
  constructor(client, data, server) {
    super(client);

    /**
     * The server this player belongs to
     * @type {Server}
     */
    this.server = server;

    /**
     * This player's id
     * @type {number}
     */
    this.id = data.id;

    /**
     * This player's ping
     * @type {number}
     */
    this.ping = null;

    /**
     * This player's in-game displayname
     * @type {string}
     */
    this.name = null;

    /**
     * The estimated time this player joined the server
     * @type {Date}
     */
    this.joinedAt = new Date();

    /**
     * The estimated time this player left the server
     * @type {Date}
     */
    this.leftAt = null;

    /**
     * Whwther this player is no longer playing on this server
     * @type {boolean}
     */
    this.left = false;

    this._identifiers = [];

    this._patch(data);
  }

  _patch(data) {
    if ('left' in data) {
      this.left = data.left;
      if (!this.leftAt) this.leftAt = new Date();
    }
    if ('endpoint' in data) this.endpoint = data.endpoint;
    if ('identifiers' in data) this._identifiers = data.identifiers;
    if ('name' in data) this.name = data.name;
    if ('ping' in data) this.ping = data.ping;
  }

  toString() {
    return `${this.name ?? 'Unknown'}`;
  }

  toJSON(...props) {
    return super.toJSON(...props);
  }

  /**
   * This player's identifiers
   * @returns {Identifiers}
   */
  get identifiers() {
    return new Identifiers(this._identifiers);
  }

  /**
   * This player's Discord.js user
   * @returns {User|null}
   */
  get user() {
    const id = this.identifiers.discord;
    if (!id) return null;
    return this.client.users.resolve(id);
  }

  /**
   * Fetches this player's Discord.js user
   * @param {BaseFetchOptions} options - Options to be used
   * @returns {Promise<User|null>}
   */
  fetch(options) {
    const id = this.identifiers.discord;
    if (!id) return null;
    return this.client.users.fetch(id, options);
  }
}

module.exports = Player;
