const { Base } = require('discord.js');
const PlayerManager = require('../managers/PlayerManager');

class Server extends Base {
    constructor(client, data) {
        super(client);

        this.players = new PlayerManager(this.client);

        this.id = null;

        this._interval = null;

        this._patch(data);
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
        this.lastSeen = data.Data.lastSeen;
        this.iconVersion = data.Data.iconVersion;

        const playerIndex = {};
        for (const player of data.Data.players) {
            playerIndex[player.id] = player;
            this.players._add(player, true, { id: player.id, extras: [ this ] });
        }
        this.players.cache.forEach(player => {
            if (!playerIndex[player.id]) this.players.cache.get(player.id)._patch({ left: true });
        })
    }
}

module.exports = Server;