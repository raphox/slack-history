This project designed for Slack users to store relevant messages in their repositories in Github. It contains:

* JSON [generation script](https://github.com/raphox/slack-history/blob/master/scripts/generate-session-object.js) based on TXT files ([sample](https://github.com/raphox/slack-history/blob/master/data/qa/dan-abramov-201804.txt)) generated through Ctrl+c/v;
* Stored message viewer, developed with React (React-router, Redux and Styled-components);
* The viewer also has an advanced offline search system through [elasticlunr](http://elasticlunr.com/);
* Github page access https://raphox.github.io/slack-history;

This repository can be cloned by anyone and used to store any type of message or group. We are currently working on storing messages from https://react-brasil.slack.com
