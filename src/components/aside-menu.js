import React, { Component } from 'react';
import { NavLink as Link } from "react-router-dom";
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Aside } from 'variables/styles';

const ASIDE_MENU_ITEMS = {
  sessions: [{
    path: "/channel/dan-abramov-201804",
    title: "dan-abramov-201804",
    description: ""
  }, {
    path: "/channel/sibelius-201803",
    title: "sibelius-201803",
    description: ""
  }],
  authors: [{
    path: "/author/dan-abramov",
    title: "dan-abramov"
  }, {
    path: "/author/sibelius",
    title: "sibelius"
  }],
}

class AsideMenu extends Component {
  render() {
    return (
      <Aside className={this.props.className}>
        <h1>React Brasil <sub>Q&A</sub></h1>

        <PerfectScrollbar>
          <ol>
            <li>
              <span className="title">Sessions</span>
              <dl className="channels">
                {ASIDE_MENU_ITEMS.sessions.map((session) =>
                  <Link to={session.path} key={session.path}>
                    <dt>{session.title}</dt>
                    <dd>{session.description}</dd>
                  </Link>
                )}
              </dl>
            </li>
            <li>
              <span className="title">Autores</span>
              <dl className="authors">
                {ASIDE_MENU_ITEMS.authors.map((author) =>
                  <Link to={author.path} key={author.path}>
                    <dt>{author.title}</dt>
                  </Link>
                )}
              </dl>
            </li>
          </ol>
        </PerfectScrollbar>
      </Aside>
    );
  }
}

export default styled(AsideMenu)`
  flex: 0 0 220px;
  background-color: #4D394B;
  color: #cac4c9;
  border: none;

  h1 {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 12px 10px 15px;
    margin-bottom: 10px;
    color: #fff;

    sub {
      display: block;
      font-size: 14px;
      font-weight: normal;
      opacity: 0.6;
      padding: 5px 0;

      &:before {
        content: "⚫";
        margin-right: 5px;
        color: #4C9689;
      }
    }
  }

  .title, a {
    padding: 0 12px 5px 15px;
  }

  a {
    display: block;

    &:hover {
      background: #3E313C;
      text-decoration: none;
    }

    &:active,
    &.active {
      background: #4C9689;
      color: #fff !important;
    }
  }

  ol > li {
    line-height: 26px;
  }

  dl {
    line-height: 26px;

    dd {
      font-style: italic;
      font-size: 14px;
      line-height: 14px;
      opacity: 0.6;
    }

    dt:before {
      content: '#';
      margin-right: 5px;
      opacity: 0.6;
    }

    &.authors dt:before {
      content: '⚫';
    }
  }
`;
