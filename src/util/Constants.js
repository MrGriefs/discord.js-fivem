'use strict';

exports.Endpoints = {
  info: root => `${root}/info.json`,
  players: root => `${root}/players.json`,
  dynamic: root => `${root}/dynamic.json`,
  single: root => `https://servers-frontend.fivem.net/api/servers/single/${root}`,
};
