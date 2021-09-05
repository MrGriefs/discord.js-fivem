const { Collection } = require('@discordjs/collection');
const { Client } = require('discord.js');
const ServerManager = require('./managers/ServerManager');
const RESTManager = require('./RESTManager');

class ExtendedClient extends Client {
    constructor(options) {
        super(options);

        this.restFiveM = new RESTManager(this, process.env.FIVEM_IP_ADDRESS);

        this.servers = new ServerManager(this);
    }
}

module.exports = ExtendedClient;