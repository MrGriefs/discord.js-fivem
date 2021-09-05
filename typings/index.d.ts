import { Client, Base, CachedManager, User, ClientOptions, Collection } from 'discord.js';

export class ServerManager extends CachedManager<string, Server, ServerResolvable> {
    public constructor(client: Client, iterable?: unknown);
    public cache: Collection<string, Server>;
    public fetch(id: string, options: ServerFetchOptions): Promise<Server>;
}

export class PlayerManager extends CachedManager<number, Player, number> {
    public constructor(client: Client, iterable?: unknown);
    public cache: Collection<number, Player>;
}

export class FiveMClient<T extends boolean = boolean> extends Client<T> {
    public constructor(options: ClientOptions);
    public restFiveM: unknown;
    public server: ServerManager;
}

export class Server extends Base {
    public constructor(client: Client, data: unknown);
    public players: PlayerManager;
    public id: string;
    public name: string;
    public clients: number;
    public gametype: string;
    public mapname: string;
    public maxClients: number;
    public enhancedHostSupport: boolean;
    public resources: string[];
    public server: string;
    public vars: {[k: string]: string};
    public selfReportedClients: number;
    public ownerID: number;
    public private: boolean;
    public fallback: boolean;
    public connectEndPoints: string[];
    public upvotePower: number;
    public supportStatus: string;
    public ownerName: string;
    public ownerProfile: string;
    public ownerAvatar: string;
    public lastSeen: Date;
    public get hostname(): string;
    private _interval: NodeJS.Timeout;
    private _patch(data: unknown): void;
}

export class Player extends Base {
    public constructor(client: Client, data: unknown, server: Server);
    public server: Server;
    public id: number;
    public ping: number;
    public name: string;
    public joinedAt: Date;
    public leftAt?: Date;
    public left: boolean;
    public get identifiers(): Identifiers;
    public get user(): User|null;
    public fetch(): Promise<User|null>;
    private _identifiers: string[];
    private _patch(data: unknown): void;
}

export class Identifiers {
    public constructor(identifiers: string[]);
    public array: string[];
    public raw: {[k: string]: string};
    public get(identifier: string): string|null;
    public get steam(): string|null;
    public get license(): string|null;
    public get license2(): string|null;
    public get discord(): string|null;
    public get xbl(): string|null;
    public get live(): string|null;
    public get fivem(): string|null;
    public get ip(): string|null;
}

export interface ServerFetchOptions {
    cache?: boolean;
    force?: boolean;
    update?: number;
}

export type ServerResolvable = string|Player|Server;
export type PlayerResolvable = string|Player;

export { BaseFetchOptions } from 'discord.js';
