import React, { Component } from 'react';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Aside } from 'variables/styles';

class AsideMenu extends Component {
  render() {
    return (
      <Aside className={this.props.className}>
        <h1>React Brasil <sub>Q&A</sub></h1>

        <PerfectScrollbar>
          <ol>
            <li>
              <span className="title">Sessions</span>
              <dl>
                <a href="#anchor" className="active">
                  <dt>raphael 2018-03</dt>
                  <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</dd>
                </a>

                <a href="#anchor">
                  <dt>raphael 2018-03</dt>
                  <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</dd>
                </a>
              </dl>
            </li>
            <li>
              <span className="title">Autores</span>
              <dl>
                <a href="#anchor" className="active">
                  <dt>raphael</dt>
                </a>
                <a href="#anchor">
                  <dt>raphael</dt>
                </a>
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
    padding: 10px;
    margin-bottom: 10px;
    color: #fff;

    sub {
      display: block;
      font-size: 14px;
      font-weight: normal;
      opacity: 0.6;
      padding: 5px 0;

      &:before {
        content: "⚫ ";
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
      content: '# ';
    }
  }
`;
