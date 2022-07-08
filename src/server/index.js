const application = require("./lib/application");

process.on("uncaughtException", (err) => {
  console.error(
    new Date().toUTCString() + " uncaught Exception: ",
    err.message
  );
  console.error(err.stack);
  process.exit(1);
});

(async () => {
  const app = await application.initialize();
  app.start();
})();
