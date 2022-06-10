const fs = require("fs");
const gPlay = require("google-play-scraper");
const { getAppData } = require("./get-app");
const { gameList } = require("./contants");

// get reviews

Promise.all(
  gameList.map((game) =>
    gPlay.reviews({
      appId: game.appId,
      sort: gPlay.sort.NEWEST,
      num: 1000,
      lang: "Zh-ch",
    })
  )
).then((list) => {
  function mapFn(item) {
    const { userName, date, score, text } = item;
    return { userName, date, score, text };
  }
  function filterFn(item) {
    return item.score >= 4;
  }

  const data = list.map((v) => v.data.map(mapFn).filter(filterFn));
  const result = {};

  gameList.forEach((game, i) => {
    result[game.name] = data[i];
  });

  fs.writeFileSync(
    `./data/reviews.json`,
    JSON.stringify(JSON.parse(JSON.stringify(result)))
  );
});

Promise.all(gameList.map((game) => getAppData(game.appId))).then((list) => {
  fs.writeFileSync(`./data/app.json`, JSON.stringify(list));
});
