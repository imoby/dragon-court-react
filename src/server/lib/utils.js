const moment = require("moment"),
  nodemailer = require("nodemailer");

class Utils {
  constructor(core) {
    this.core = core;
  }

  normalize(str) {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();

    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaeeeeiiiioooouuuunc------";

    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-zA-Z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    return str;
  }

  getEpochTime() {
    return moment().unix();
  }

  getDate(time) {
    return moment(time).format("MMMM Do YYYY, h:mm:ss a");
  }

  getShortDate(time) {
    return moment(time).format("MMM Do 'YY, h:mm a");
  }

  getTimeSince(date) {
    return moment(date * 1000).fromNow();
  }

  sendEmail(to, subject, msg) {
    const transporter = nodemailer.createTransport({
      port: 25,
      host: "localhost",
      tls: { rejectUnauthorized: false },
    });

    const message = {
      from: "noreply@" + this.core.config.servername,
      to: to,
      subject: subject,
      text: msg,
      html: "<p>" + msg + "</p>",
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        return console.log(error);
      }
      this.app.logger.info("Message sent: %s", info.messageId);
    });
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  format(str, args) {
    return str.replace(/\{\{|\}\}|\{(\d+)\}/g, (m, n) => {
      if (m == "{{") {
        return "{";
      }
      if (m == "}}") {
        return "}";
      }
      return args[n];
    });
  }
}

module.exports = (core) => {
  return new Utils(core);
};
