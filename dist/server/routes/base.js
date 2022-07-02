const jwt = require('jsonwebtoken');

class BaseRoutes {
  constructor(app) {
    this.app = app;
    this.router = app.express.Router();
  }

  init() {
    this.router.get('/game', async (req, res) => {
      const token = req.body.token || req.query.token || req.cookies.token || null;

      if (token !== null) {
        try {
          const data = await jwt.verify(token, this.app.config.secret);
          const user = await this.app.services.user.getUser(data.data);
          res.render('game-main', {
            layout: 'game',
            pageTitle: 'Play ' + req.app.locals.globals.sitename,
            User: user
          });
        } catch (err) {
          res.redirect('/user/login/');
        }
      }
    });
    this.router.get("/", (req, res) => {
      res.render('site-home', {
        layout: 'site',
        pageTitle: 'Home ' + req.app.locals.globals.sitename
      });
    });
    return this.router;
  }

}

module.exports = app => {
  const BR = new BaseRoutes(app);
  return BR.init();
};