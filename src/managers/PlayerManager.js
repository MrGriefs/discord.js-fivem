'use strict';

const { CachedManager } = require('discord.js');
const Player = require('../structures/Player');

/**
 * Stores the cache for Players
 * @extends {CachedManager}
 */
class PlayerManager extends CachedManager {
  constructor(server, iterable) {
    super(server.client, Player, iterable);

    /**
     * The server this manager belongs to
     * @type {Server}
     */
    this.server = server;
  }
}

/**
 * The cache of this Manager
 * @type {Collection<number, Player>}
 * @name PlayerManager#cache
 */

/**
 * Data that resolves to give a Player object. This can be:
 * * A Player object
 * * A Player id
 * @typedef {string|Player} PlayerResolvable
 */

/**
 * Resolves a PlayerResolvable to a Player object.
 * @method resolve
 * @memberof PlayerManager
 * @name PlayerManager#resolve
 * @instance
 * @param {PlayerResolvable} player The player resolvable to identify
 * @returns {?Player}
 */

/**
 * Resolves a {@link PlayerResolvable} to a {@link Player} id number.
 * @method resolveId
 * @memberof PlayerManager
 * @name PlayerManager#resolveId
 * @instance
 * @param {PlayerResolvable} player The player resolvable to identify
 * @returns {?number}
 */

module.exports = PlayerManager;
