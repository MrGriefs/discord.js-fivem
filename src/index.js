'use strict';

module.exports = {
  Client: require('./Client'),
  Player: require('./structures/Player'),
  Server: require('./structures/Server'),
  ServerManager: require('./managers/ServerManager'),
  PlayerManager: require('./managers/PlayerManager'),
  Identifiers: require('./util/Identifiers'),
  Constants: require('./util/Constants'),
};

/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/stable/class/Client}
 */

/**
 * @external User
 * @see {@link https://discord.js.org/#/docs/main/stable/class/User}
 */

/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/collection/main/class/Collection}
 */

/**
 * @external BaseFetchOptions
 * @see {@link https://discord.js.org/#/docs/main/stable/typedef/BaseFetchOptions}
 */
