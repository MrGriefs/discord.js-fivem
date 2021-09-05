const { CachedManager } = require('discord.js');
const Server = require('../structures/Server');

class ServerManager extends CachedManager {
    constructor(client, iterable) {
        super(client, Server, iterable);
    }

    async fetch(id, { cache = true, force = false, update = 120000 } = {}) {
        if (!force) {
            const existing = this.cache.get(id);
            if (existing) return existing;
        }

        const data = await this.client.restFiveM.request(id, 'single')
            .catch(e => { throw e })
            .then(r => r.data);
        const entry = this._add(data, cache, { id, extras: [ update ] });
        if (entry._interval) clearInterval(entry._interval);
        if (typeof update === 'number' && update > 0) entry._interval = setTimeout(() => {
            this.fetch(id)
        }, update)
        return entry;
    }
}

module.exports = ServerManager;