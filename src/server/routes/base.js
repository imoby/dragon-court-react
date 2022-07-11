const jwt = require("jsonwebtoken");

class BaseRoutes {
  constructor(app) {
    this.app = app;
    this.router = app.express.Router();
  }

  init() {
    this.router.get("/game", async (req, res) => {
      const token =
        req.body.token || req.query.token || req.cookies.token || null;
      const params = {};
      let template = "";

      if (token !== null) {
        try {
          const data = await jwt.verify(token, this.app.config.secret);

          const user = await this.app.services.user.getUser(data.data);

          if (user.hasChar) {
            const player = await this.app.services.player.getPlayer(user.id);

            template = "game-main";
            params.title = "Play " + req.app.locals.globals.sitename;
            params.Player = player.data;
            params.layout = "game";
            params.layout = "game";
          } else {
            template = "creation";
            params.layout = "creation";
            params.freePts = 20;
            params.title = "Character Creation";
          }

          params.User = user;

          res.render(template, params);
        } catch (err) {
          console.log(err);
          res.redirect("/user/login/");
        }
      }
    });

    this.router.get("/", (req, res) => {
      res.render("site-home", {
        layout: "site",
        pageTitle: "Home " + req.app.locals.globals.sitename,
      });
    });

    return this.router;
  }
}

module.exports = (app) => {
  const BR = new BaseRoutes(app);
  return BR.init();
};
