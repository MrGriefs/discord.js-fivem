const axios = require('axios').default;
const { Endpoints } = require('./util/Constants');

class RESTManager {
    constructor(client) {
        this.client = client;
    }

    async request(root, endpoint = '', { method = 'GET', timeout = 1000 } = {}) {
        if (Endpoints[endpoint]) endpoint = Endpoints[endpoint](root)
        else endpoint = root + endpoint;
        return await axios.request({
            method: method,
            timeout,
            url: endpoint,
        })
    }
}

module.exports = RESTManager;