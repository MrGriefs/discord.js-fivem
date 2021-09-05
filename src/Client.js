'use strict';

const { Client } = require('discord.js');
const RESTManager = require('./RESTManager');
const ServerManager = require('./managers/ServerManager');

/**
 * The extended client
 * @extends {Client}
 */
class FiveMClient extends Client {
  constructor(options) {
    super(options);

    this.restFiveM = new RESTManager(this);

    /**
     * This client's server manager
     * @type {ServerManager}
     */
    this.servers = new ServerManager(this);
  }
}

module.exports = FiveMClient;
