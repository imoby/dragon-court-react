class UserRoutes {
  constructor(app) {
    this.app = app;
    this.router = app.express.Router();
  }

  init() {
    this.router.get('/login/', (req, res) => {
      res.render('user-login', {
        layout: 'site',
        pageTitle: 'Login'
      });
    });
    this.router.get('/register/', (req, res) => {
      res.render('user-register', {
        layout: 'site',
        pageTitle: 'Register'
      });
    });
    return this.router;
  }

}

module.exports = app => {
  const UR = new UserRoutes(app);
  return UR.init();
};