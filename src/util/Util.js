class Util extends null {
    static async isOnline(client) {
        return await client.restFiveM.request()
            .then(r => r && r.data)
            .catch(_ => false);
    }

    static async getInfo(client) {
        return await client.restFiveM.request('info')
            .then(r => r.data)
            .catch(_ => null);
    }

    static async getPlayers(client) {
        return await client.restFiveM.request('players')
            .then(r => r.data)
            .catch(_ => null);
    }

    static async getDynamic(client) {
        return await client.restFiveM.request('dynamic')
            .then(r => r.data)
            .catch(_ => null);
    }
}

module.exports = Util;