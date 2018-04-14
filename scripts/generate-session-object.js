const argv = require('argv');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const jsonfile = require('jsonfile');
const marked = require('marked');
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

        if (message != '---') {
          last_message = messages[i - 1];
          data_match = regex.exec(message);

          if (data_match) {
            author = data_match[1].trim();
            time = data_match[2].trim();

            obj.info.authors[author] = true;

            if (!last_message || last_message == '---') {
              obj.messages[j] = {
                id: uuid(),
                img: null,
                username: author,
                time: time,
                msg: marked(messages[++i].trim()),
                messages: []
              };
            }
          } else {
            highlights_terms(message, obj.info.highlights);

            let last_message = obj.messages[j].messages[obj.messages[j].messages.length - 1];

            if (!last_message || last_message.username != author) {
              obj.messages[j].messages.push({
                id: uuid(),
                img: null,
                username: author,
                time: time,
                msg: marked(message.trim())
              });
            } else {
              last_message.msg += marked(message.trim());
            }
          }
        } else {
          j++;
        }
      }

      obj.info.authors = Object.keys(obj.info.authors).sort();
      obj.info.highlights = Object.keys(obj.info.highlights)
        .sort((a, b) => {
          return obj.info.highlights[b] - obj.info.highlights[a]
        })
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
 * Process the message and count the times a important word occurs
 *
 * @param {string} message
 * @param {object} highlights
 */
const highlights_terms = (message, highlights = {}) => {
  const terms = ["react", "redux", "pacote", "package", "github", "bitbucket", "repositorio", "repository", "native", "mobile", "desktop", "ios", "android", "windows", "linux", "web", "animations", "cocoapod", "gradle", "open source", "async", "apollo", "relay", "graphql", "meteor", "styled", "components", "backend", "frontend", "fullstack", "form", "ui", "ux", "css", "typescript", "babel", "thread", "jsx", "reasonml", "ssr", "spa", "pwa", "book"];

  for (let term of terms) {
    let count = message.toLowerCase().split(term).length - 1 + (highlights[term] || 0);
    if (count > 0) highlights[term] = count;
  }
};
