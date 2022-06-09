const fs = require("fs");
const gPlay = require("google-play-scraper");

const gameList = [
  {
    name: "Epic Summoners",
    appId: "com.feelingtouch.idl",
  },
  {
    name: "Zombie Frontier 4",
    appId: "com.feelingtouch.zfsniper",
  },
  {
    name: "Clone Evolution",
    appId: "com.feelingtouch.clonewar",
  },
  {
    name: "Battle Night",
    appId: "com.feelingtouch.bn",
  },
  {
    name: "Don of Dons",
    appId: "com.feelingtouch.dons",
  },
  {
    name: "Random TD",
    appId: "com.feelingtouch.rtd",
  },
];

module.exports = function writeData() {
  gameList.forEach((game) => {
    gPlay
      .reviews({
        appId: game.appId,
        sort: gPlay.sort.RATING,
        num: 20,
      })
      .then((data) => {
        fs.writeFileSync(
          `./data/${game.name}.json`,
          JSON.stringify(JSON.parse(JSON.stringify(data)))
        );
      }, console.log);
  });
};
