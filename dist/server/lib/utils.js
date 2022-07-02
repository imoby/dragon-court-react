const moment = require('moment'),
      nodemailer = require('nodemailer'),
      strings = require('./strings');

class Utils {
  constructor(core) {
    this.core = core;
  }

  normalize(str) {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaeeeeiiiioooouuuunc------";

    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-zA-Z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    return str;
  }

  getEpochTime() {
    return moment().unix();
  }

  getDate(time) {
    return moment(time).format('MMMM Do YYYY, h:mm:ss a');
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
      host: 'localhost',
      tls: {
        rejectUnauthorized: false
      }
    });
    const message = {
      from: 'noreply@' + this.core.config.servername,
      to: to,
      subject: subject,
      text: msg,
      html: '<p>' + msg + '</p>'
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        return console.log(error);
      }

      console.log('Message sent: %s', info.messageId);
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

  encounterBlurb() {
    const main = strings.encounter['main'][Math.floor(Math.random() * strings.encounter['main'].length)];
    const attack = strings.encounter['attack'][Math.floor(Math.random() * strings.encounter['attack'].length)];
    const flee = strings.encounter['flee'][Math.floor(Math.random() * strings.encounter['flee'].length)];
    return {
      main,
      attack,
      flee
    };
  }

  shopBlurb(shop) {
    return strings.shops[shop][Math.floor(Math.random() * strings.shops[shop].length)];
  }

  awakenText(place, loc) {
    let text = '',
        stipend = false;

    if (global.User.firstRun) {
      text = strings.awaken.first;
    } else {
      text = strings.awaken.start;

      switch (global.User.region) {
        case 'town':
          switch (place) {
            case 'tavern':
              text += strings.awaken.place.tavern;

              switch (loc) {
                case 'floor':
                  text += strings.awaken.location.floor;
                  break;

                case 'room':
                  text += strings.awaken.location.room;
                  break;

                case 'suite':
                  text += strings.awaken.location.suite;
                  break;
              }

              break;

            case 'outside':
              break;
          }

          break;

        case 'fields':
          break;
      }

      if (global.Player.rankString != 'Peasant') {
        stipend = true;
      }

      if (stipend) {
        const base = 2048;
        const gain = Math.floor(base * global.Player.rank * (global.Player.level / 2));
        global.Player.cashToday = global.Player.cashToday + gain;
        global.Player.cash = global.Player.cash + gain;
        text += '<br><br>' + this.format(strings.awaken.stipend, gain);
      }
    }

    return text;
  }

  generateBackstory() {
    const r = strings.creation.race[Math.floor(Math.random() * strings.creation.race.length)],
          a = strings.creation.adj[Math.floor(Math.random() * strings.creation.adj.length)],
          l = strings.creation.loc[Math.floor(Math.random() * strings.creation.loc.length)],
          d = strings.creation.desc[Math.floor(Math.random() * strings.creation.desc.length)];
    const story = ["You are a " + a + " " + r + " from " + l + ", who " + d + "."];
  }

}

module.exports = core => {
  return new Utils(core);
};