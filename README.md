<h2 align="center">Discord.js FiveM</h2>

<p align="center">
<a href="https://patreon.com/yeen"><img alt="Patreon" src="https://img.shields.io/badge/patreon-donate?color=F77F6F&labelColor=F96854&logo=patreon&logoColor=ffffff"></a>
<a href="https://discord.gg/2crnTXwQmN"><img alt="Discord" src="https://img.shields.io/discord/368557500884189186?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff"></a>
<img href="https://www.npmjs.com/package/discord.js-fivem" alt="David" src="https://img.shields.io/david/MrGriefs/discord.js-fivem">
<img href="https://www.npmjs.com/package/discord.js-fivem" alt="node-current" src="https://img.shields.io/node/v/discord.js-fivem">
<img href="https://www.npmjs.com/package/discord.js-fivem" alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/MrGriefs/discord.js-fivem">
<a href="https://npm.runkit.com/discord.js-fivem"><img alt="RunKit" src="https://img.shields.io/badge/Run-Kit-red"></a>
</p>

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Example](#example)
- [Documentation](#documentation)

## About

discord.js-fivem allows you to intergrate your FiveM server's data with Discord.js, allowing you to monitor your server's players, availability and ping.  

## Installation

With npm:  

```bash
$ npm install discord.js-fivem
```

With yarn:  

```bash
$ yarn add discord.js-fivem
```

## Example

In the file containing client.login:  

```javascript
const { Client } = require('discord.js-fivem');
const { Intents } = require('discord.js');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
})

client.on('ready', async () => {
  // fetch your server. the server data will automatically refetch after 2 minutes
  const server = await client.servers.fetch('734okr', {
    cache: true, // whether to cache this server
    force: false, // whether to fetch from fivem even if it's in cache
    update: 120000, // the amount of time (in ms) before updating this server
  })

  // do something with this information
  const guild = client.guilds.resolve('1234')
  const channel = guild.channels.resolve('5678')
  channel.send(`There are currently ${server.players.cache.size} players in the server!`)
})

client.login('your-token-here')
```

## Documentation

You can view the [documentation here](https://mrgriefs.github.io/discord.js-fivem).
