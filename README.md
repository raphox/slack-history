This project designed for Slack users to store relevant messages in their repositories in Github. It contains:

* JSON [generation script](https://github.com/raphox/slack-history/blob/master/scripts/generate-session-object.js) based on TXT files ([sample](https://github.com/raphox/slack-history/blob/master/data/qa/dan-abramov-201804.txt)) generated through Ctrl+c/v;
* Stored message viewer, developed with React (React-router, Redux and Styled-components);
* The viewer also has an advanced offline search system through [elasticlunr](http://elasticlunr.com/);
* Github page access https://raphox.github.io/slack-history;

This repository can be cloned by anyone and used to store any type of message or group. We are currently working on storing messages from https://react-brasil.slack.com

## Using generation script

To generate or update a JSON file from a channel, simply change the desired file ([sample](https://github.com/raphox/slack-history/blob/master/data/channel/general.txt)) and generate a new version of JSON containing the new changes. The generation of the new version of the JSON file is done by script () through the command:

```sh
node scripts/generate-session-object.js -p data/channel/general.txt
```

This command will generate or update the 'public/data/channel/general.json' file.

> Attention: For now, the system still does not automatically generate menus for new created channels. To do this you should change the file [src/components/aside-menu.js](https://github.com/raphox/slack-history/blob/master/src/components/aside-menu.js).

## Publishing the new history files

We are using the [gh-pages](https://github.com/tschaub/gh-pages) package to generate and publish our data in https://raphox.github.io/slack-history.

To generate the files and send them to the Github pages, simply execute the command:

```sh
npm run deploy
```

## React-brasil developers

If you are a member of https://react-brasil.slack.com and want to make some highlight in our history (https://raphox.github.io/slack-history). Send us a PR following the same pattern of the PR (https://github.com/raphox/slack-history/pull/1), sending us a list of messages or a new channel. So we can share with everyone.
