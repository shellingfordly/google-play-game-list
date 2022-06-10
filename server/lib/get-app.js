var request = require("request");
var cheerio = require("cheerio");

module.exports = {
  getAppData: function (bundleId) {
    var baseUrl = `https://play.google.com/store/apps/details?id=${bundleId}&hl=Zh-ch`;

    return new Promise((resolve, reject) => {
      request(baseUrl, function (err, res, html) {
        if (err) {
          reject(err);
          return;
        }

        if (res.statusCode == 404) {
          resolve(null);
          return;
        }

        const app = {
          packageId: bundleId,
          appName: null,
          developer: null,
          // appIcon: null,
          // appImage: null,
          // appVideo: null,
          description: null,
          // appImageList: [],
          updateTime: null,
          ratingCount: null,
          score: null,
          newFeatures: null,
          category: [],
        };

        try {
          var $ = cheerio.load(html);

          app.appName = $(".Fd93Bb span").html();
          app.developer = $(".Vbfug a span").html();
          // app.appIcon = $(".qxNhq img").attr("src");
          // app.appImage = $(".oiEt0d").attr("poster");
          // app.appVideo = $(".oiEt0d source").attr("src");
          // 更新时间
          app.updateTime = $(".xg1aie").html();
          // 评论数
          app.ratingCount = $(".g1rdde").html();
          // 新功能
          app.newFeatures = $(".SfzRHd div[itemprop=description]").html();
          // 评分
          app.score = $(".jILTFe").html();
          // 游戏描述
          app.description = $(".bARER").html();

          // 游戏图片
          // $(".Atcj9b img").each((_, item) => {
          //   app.appImageList.push($(item).attr("src"));
          // });

          // 分类
          $(".Uc6QCc .VfPpkd-vQzf8d").each((_, item) => {
            app.category.push($(item).html());
          });
        } catch (ex) {}

        resolve(app);
      });
    });
  },
};
