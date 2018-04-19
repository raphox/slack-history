const argv = require('argv');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const jsonfile = require('jsonfile');
const marked = require('marked');
const emoji = require('emoji-js');
const uuid = require('uuid/v4');

const options = [{
  name: 'path',
  short: 'p',
  type: 'path',
  description: "Defines an path to load session file. Session file is a TXT file with CTRL+C/V from a Slack's channel.",
	example: "'script --path=value' or 'script -p value'"
}];

var args = argv.option(options).run();

if (!args.options.path) {
  console.log("Error: 'path' argument is required.");
  console.log("Eg:" + options.find(item => item.name == 'path').example)
} else {
  const file_path = args.options.path;

  if (fs.existsSync(file_path)) {
    console.log('File found.');

    const destination = "./public/sessions";
    !fs.existsSync(destination) && fs.mkdirSync(destination);

    let obj = {
      info: {
        details: "",
        highlights: {},
        authors: {}
      },
      messages: []
    }

    let messages = [];
    const regex = /^(.+)\[(.+)\]$/;

    const rl = readline.createInterface({
      input: fs.createReadStream(file_path),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      // discard empty lines
      if (line) messages.push(line);
    }).on('close', () => {
      let j = 0;
      let author = time = "";
      let message, last_message, data_match;

      for (let i = 0; i < messages.length; i++) {
        message = messages[i];
        const highlights = highlightsTerms(message, obj.info.highlights);

        if (message != '---') {
          last_message = messages[i - 1];
          data_match = regex.exec(message);

          if (data_match) {
            author = data_match[1].replace("@", '').trim();
            time = data_match[2].trim();

            obj.info.authors[author] = true;

            if (!last_message || last_message == '---') {
              message = messages[++i];

              obj.messages[j] = {
                id: uuid(),
                img: null,
                username: author,
                time: time,
                msg: convertMessage(message.trim()),
                messages: [],
                highlights: highlightsTerms(message, {})
              };
            }
          } else {
            let last_message = obj.messages[j].messages[obj.messages[j].messages.length - 1];

            if (!last_message || last_message.username != author) {
              obj.messages[j].messages.push({
                id: uuid(),
                img: null,
                username: author,
                time: time,
                msg: convertMessage(message.trim()),
                highlights: highlightsTerms(message, {})
              });
            } else {
              last_message.msg += convertMessage(message.trim());
              last_message.highlights = highlightsTerms(last_message.msg, {});
            }
          }
        } else {
          j++;
        }
      }

      obj.info.authors = Object.keys(obj.info.authors).sort();
      obj.info.highlights = Object.keys(obj.info.highlights)
        .sort((a, b) => obj.info.highlights[b] - obj.info.highlights[a])
        .reduce((a, v) => {
          a[v] = obj.info.highlights[v];
          return a;
        }, {});

      jsonfile.writeFileSync(path.join(destination, path.basename(file_path, '.txt') + '.json'), obj, { spaces: 2 });
    });
  } else {
    console.log("Error: File in 'path' not found.");
  }
}

/**
 * Convert markdown message to HTML
 */
const emojiConvertor = new emoji.EmojiConvertor();
emojiConvertor.replace_mode = 'unified';
emojiConvertor.allow_native = true;
const convertMessage = (message) => emojiConvertor.replace_colons(marked(message.trim()));

/**
 * Process the message and count the times a important word occurs
 *
 * @param {string} message
 * @param {object} highlights
 */
const highlightsTerms = (message, highlights = {}) => {
  const terms = [
    ["android"],
    ["animation", "animations", "animação", "animações"],
    ["apollo"],
    ["async"],
    ["babel"],
    ["backend"],
    ["bitbucket"],
    ["book", "books", "livro", "livros"],
    ["cocoapod"],
    ["component", "components", "componente", "componentes"],
    ["css"],
    ["desktop"],
    ["flow"],
    ["form"],
    ["frontend"],
    ["fullstack"],
    ["git"],
    ["github"],
    ["gradle"],
    ["graphql"],
    ["ios"],
    ["javascrip", "js"],
    ["jsx"],
    ["linux"],
    ["meteor"],
    ["mobile"],
    ["native"],
    ["open source"],
    ["package", "packages", "pacote", "pacotes"],
    ["pwa"],
    ["react"],
    ["reasonml"],
    ["redux"],
    ["relay"],
    ["repository", "repositories", "repositorio", "repositorios"],
    ["spa"],
    ["ssr"],
    ["styled", "styleds", "estilo", "estilos"],
    ["sync"],
    ["typescript"],
    ["ui"],
    ["ux"],
    ["web"],
    ["windows"],
  ];

  let collection = {};

  for (let synonymous of terms) {
    let count = highlights[synonymous[0]] || 0;

    for (let term of synonymous) {
      let re = new RegExp(` ${term}\\W`);
      let total = message.toLowerCase().split(re).length - 1;

      if (total > 0) count += total;
    }

    if (count > 0) {
      highlights[synonymous[0]] = count;
      for (let term of synonymous) collection[term] = true;
    }
  }

  return Object.keys(collection).join(' ');
};
