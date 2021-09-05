'use strict';

const { CachedManager } = require('discord.js');
const Player = require('../structures/Player');
const Server = require('../structures/Server');

/**
 * Stores the cache for FiveM Servers
 * @extends {CachedManager}
 */
class ServerManager extends CachedManager {
  constructor(client, iterable) {
    super(client, Server, iterable);
  }

  /**
   * The cache of this Manager
   * @type {Collection<string, Server>}
   * @name ServerManager#cache
   */

  /**
   * Options used to fetch data from fivem
   * @typedef {Object} ServerFetchOptions
   * @property {boolean} [cache=true] - Whether to cache the fetched data if it wasn't already
   * @property {boolean} [force=false] - Whether to skip the cache check and request the API
   * @property {number} [update=120000] - The amount of time to "refresh" this server
   */

  /**
   * Data that resolves to give a Server object. This can be:
   * * A Player object
   * * A Server id
   * @typedef {string|Player|Server} ServerResolvable
   */

  /**
   * Fetch a FiveM server
   * @param {ServerResolvable} id - The server's id. Can be found in the cfx.re/join url
   * @param {ServerFetchOptions} [options] - The options to use
   * @example
   * await client.servers.fetch('734okr')
   * @returns {Promise<Server>}
   */
  async fetch(id, { cache = true, force = false, update = 120000 } = {}) {
    if (!force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    const data = await this.client.restFiveM
      .request(id, 'single')
      .catch(e => {
        throw e;
      })
      .then(r => r.data);
    const entry = this._add(data, cache, { id });
    if (entry._interval) clearInterval(entry._interval);
    if (typeof update === 'number' && update > 0) {
      entry._interval = setTimeout(() => {
        this.fetch(id);
      }, update);
    }
    return entry;
  }

  /**
   * Resolves a ServerResolvable to a Server object.
   * @method resolve
   * @memberof ServerManager
   * @instance
   * @param {ServerResolvable} server The server resolvable to identify
   * @returns {?Server}
   */
  resolve(server) {
    if (server instanceof Player) return super.resolve(server.server);
    return super.resolve(server);
  }

  /**
   * Resolves a {@link ServerResolvable} to a {@link Server} id string.
   * @method resolveId
   * @memberof ServerManager
   * @instance
   * @param {ServerResolvable} server The server resolvable to identify
   * @returns {?string}
   */
  resolveId(server) {
    if (server instanceof Player) return super.resolve(server.server.id);
    return super.resolve(server);
  }
}

module.exports = ServerManager;
