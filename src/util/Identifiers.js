class Identifiers {
    constructor(identifiers = []) {
        this.array = identifiers;
        this.raw = {};
        for (const identifier of this.array) {
            const prefix = identifier.replace(/:\d+$/, '');
            this.raw[prefix] = identifier.slice(prefix.length + 1);
        }
    }

    get(identifier) {
        return this.raw[identifier] ?? null;
    }

    get steam() {
        return this.raw.steam ?? null;
    }

    get license() {
        return this.raw.license ?? null;
    }

    get license2() {
        return this.raw.license2 ?? null;
    }

    get discord() {
        return this.raw.discord ?? null;
    }

    get xbl() {
        return this.raw.xbl ?? null;
    }

    get live() {
        return this.raw.live ?? null;
    }

    get fivem() {
        return this.raw.fivem ?? null;
    }

    get ip() {
        return this.raw.ip ?? null;
    }
}

module.exports = Identifiers;