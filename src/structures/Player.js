const { Base } = require('discord.js');
const Identifiers = require('../util/Identifiers')

class Player extends Base {
    constructor(client, data, server) {
        super(client);
        
        this.id = data.id;
        
        this.server = server;
        
        this.ping = null;
        
        this.name = null;
        
        this.joinedAt = new Date();
        
        this.leftAt = null;

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

    fetch(force = true) {
        return this.server.players.fetch(this.id, { force });
    }

    toJSON(...props) {
        return super.toJSON(...props);
    }

    get identifiers() {
        return new Identifiers(this._identifiers);
    }

    get user() {
        if (this.identifiers.discord) {
            return this.client.users.resolve(this.identifiers.discord)
        }
        return null;
    }
}

module.exports = Player;