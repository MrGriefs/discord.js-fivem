const { CachedManager } = require('discord.js');
const Player = require('../structures/Player');

class PlayerManager extends CachedManager {
    constructor(client, iterable) {
        super(client, Player, iterable);
    }
}

module.exports = PlayerManager;