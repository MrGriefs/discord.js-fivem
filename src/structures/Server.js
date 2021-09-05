'use strict';

const { Base } = require('discord.js');
const PlayerManager = require('../managers/PlayerManager');

/**
 * A Server object
 * @extends {Base}
 */
class Server extends Base {
  constructor(client, data) {
    super(client);

    /**
     * The players this server has
     * @type {PlayerManager}
     */
    this.players = new PlayerManager(this);

    /**
     * The server's id
     * @type {string}
     */
    this.id = null;

    /**
     * This server's name
     * @type {string}
     */
    this.name = null;

    /**
     * The amount of clients connected to this server
     * @type {number}
     */
    this.clients = null;

    /**
     * This server's game type
     * @type {string}
     */
    this.gametype = null;

    /**
     * This server's map name
     * @type {string}
     */
    this.mapname = null;

    /**
     * The server's max client limit
     * @type {number}
     */
    this.maxClients = null;

    /**
     * Undocumented
     * @type {boolean}
     */
    this.enhancedHostSupport = null;

    /**
     * The resources this server uses
     * @type {Array<string>}
     */
    this.resources = [];

    /**
     * The server's user-agent, I think
     * @type {string}
     */
    this.server = null;

    /**
     * The variables this server shares with clients
     * @type {Object<string, string>}
     */
    this.vars = null;

    /**
     * The amount of clients this server has, reported by the server itself
     * @type {number}
     */
    this.selfReportedClients = null;

    /**
     * The fivem ID of the server's owner
     * @type {number}
     */
    this.ownerID = null;

    /**
     * Whether this server is a private server
     * @type {boolean}
     */
    this.private = null;

    /**
     * Whether this server is a fallback server
     * @type {boolean}
     */
    this.fallback = null;

    /**
     * The endpoints used to connect to this server
     * @type {Array<string>}
     */
    this.connectEndPoints = null;

    /**
     * The amount of boosts this server has
     * @type {number}
     */
    this.upvotePower = null;

    /**
     * Undocumented
     * @type {string}
     */
    this.supportStatus = null;

    /**
     * The server owner's FiveM username
     * @type {string}
     */
    this.ownerName = null;

    /**
     * The URL to the server owner's FiveM profile
     * @type {string}
     */
    this.ownerProfile = null;

    /**
     * The URL to the server owner's FiveM profile avatar
     * @type {string}
     */
    this.ownerAvatar = null;

    /**
     * The last time this server was seen online
     * @type {Date}
     */
    this.lastSeen = null;

    this._interval = null;

    this._patch(data);
  }

  /**
   * Alias for `this.name`
   * @returns {string}
   */
  get hostname() {
    return this.name;
  }

  _patch(data) {
    this.id = data.EndPoint;
    this.name = data.Data.hostname;
    this.clients = data.Data.clients;
    this.gametype = data.Data.gametype;
    this.mapname = data.Data.mapname;
    this.maxClients = data.Data.sv_maxclients;
    this.enhancedHostSupport = data.Data.enhancedHostSupport;
    this.resources = data.Data.resources;
    this.server = data.Data.server;
    this.vars = data.Data.vars ?? {};
    this.selfReportedClients = data.Data.selfReportedClients;
    this.ownerID = data.Data.ownerID;
    this.private = data.Data.private;
    this.fallback = data.Data.fallback;
    this.connectEndPoints = data.Data.connectEndPoints;
    this.upvotePower = data.Data.upvotePower;
    this.supportStatus = data.Data.support_status;
    this.ownerName = data.Data.ownerName;
    this.ownerProfile = data.Data.ownerProfile;
    this.ownerAvatar = data.Data.ownerAvatar;
    if ('lastSeen' in data.Data) this.lastSeen = new Date(data.Data.lastSeen);
    this.iconVersion = data.Data.iconVersion;

    const playerIndex = {};
    for (const player of data.Data.players) {
      playerIndex[player.id] = player;
      this.players._add(player, true, { id: player.id, extras: [this] });
    }
    this.players.cache.forEach(player => {
      if (!playerIndex[player.id]) this.players.cache.get(player.id)._patch({ left: true });
    });
  }
}

module.exports = Server;
