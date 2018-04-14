import React, { Component } from 'react';
import Avatar from 'react-avatar';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Wrapper, Content, Header, Aside } from 'variables/styles';

class Author extends Component {
  render() {
    return (
      <Wrapper>
        <Header>
          <Aside style={{flex: 'auto', border: 'none'}}>
            <h1>raphael 2018-03</h1>
            <ul>
              <li><FontAwesomeIcon icon="user" /> 1,251</li>
              <li><FontAwesomeIcon icon="thumbtack" /> 1,251</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a tortor et enim euismod bibendum.</li>
            </ul>
          </Aside>
        </Header>
        <Content>
          <Article>
            <PerfectScrollbar>
              <ul className="list">
                <li className="list_item message">
                  <div className="gutter">
                    <a href="/team/U777SJDPE" target="_blank" className="avatar">
                      <Avatar name="sergiohpreis" size={36} />
                    </a>
                  </div>
                  <div className="content">
                    <div className="content_header">
                      <span className="sender">
                        <a className="sender_link" href="/team/U777SJDPE" target="_blank">sergiohpreis</a>
                      </span>
                    </div>
                    <span className="body">
                      Insiro o native no input e boa<br />
                      <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus, magna eget suscipit tincidunt, libero est accumsan lorem, et rhoncus libero turpis vitae lectus. Etiam in nunc et risus aliquam aliquam. Sed et ligula non augue ultrices ullamcorper. Aenean hendrerit risus at ligula vehicula, eu vestibulum velit viverra. Curabitur eu est ullamcorper, tincidunt nisi id, luctus massa.</blockquote>
                      alguem sabe como indentifico esses casos:
                    </span>
                  </div>
                </li>
                <li className="list_item message">
                  <div className="gutter">
                    <a href="/team/U777SJDPE" target="_blank" className="avatar">
                    <Avatar name="sergio almeida" size={36} />
                    </a>
                  </div>
                  <div className="content">
                    <div className="content_header">
                      <span className="sender">
                        <a className="sender_link" href="/team/U777SJDPE" target="_blank">sergiohpreis</a>
                      </span>
                    </div>
                    <span className="body">
                      Insiro o native no input e boa<br />
                      <pre>ReactDOM.render(<br />&nbsp;&nbsp;&lt;HelloMessage name=&quot;Taylor&quot; /&gt;,<br />&nbsp;&nbsp;mountNode<br />);</pre>
                    </span>
                  </div>
                </li>
                <li className="list_item message">
                  <div className="gutter">
                    <a href="/team/U777SJDPE" target="_blank" className="avatar">
                      <Avatar src="https://ca.slack-edge.com/T1EEGNUP4-U777SJDPE-5689266c484e-48" size={36} />
                    </a>
                  </div>
                  <div className="content">
                    <div className="content_header">
                      <span className="sender">
                        <a className="sender_link" href="/team/U777SJDPE" target="_blank">sergiohpreis</a>
                      </span>
                    </div>
                    <span className="body">
                      Insiro o native no input e boa<br />
                      alguem sabe como indentifico <code>React</code> esses casos:
                    </span>
                  </div>
                </li>
              </ul>
            </PerfectScrollbar>
          </Article>
        </Content>
      </Wrapper>
    );
  }
}

const Article = styled.article`
  flex-flow: row wrap;
  flex-grow: 1;

  a {
    color: #0576b9;
  }

  code {
    font-family: Monaco, Menlo, Consolas, "Courier New", monospace!important;
    font-size: 12px;
    line-height: 12px;
    color: #d72b3f;
    background-color: #f7f7f9;
    border: 1px solid #e1e1e8;
    padding: 2px 3px 1px;
  }

  pre {
    color: #333;
    display: block;
    padding: 8px;
    margin: 5px 0;
    font-size: 12px;
    line-height: 18px;
    background-color: #f5f5f5;
    border: 1px solid #e1e1e8;
    border-radius: 3px;
    font-family: Monaco,Menlo,Consolas,"Courier New",monospace!important;
  }

  blockquote {
    position: relative;
    margin: .25rem 0;
    padding-left: 16px;

    &:before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      display: block;
      width: 4px;
      border-radius: 8px;
      background: #e3e4e6;
      content: '';
    }
  }

  ul.list {
    margin: 12px 0 45px 0;

    li.list_item.message {
      font-size: 15px;
      padding: 6px 20px 6px 6px;

      &:hover {
        background-color: #f5f5f5;
      }

      .gutter {
        width: 50px;
        padding-right: 8px;
        float: left;
        text-align: right;

        .sb-avatar {
          line-height: 36px;
        }
      }

      .content {
        width: 100%;
        .content_header {
          font-weight: bold;

          a { color: #2c2d30; }
        }
        .body {
          margin: 4px 0 -4px 58px;
          line-height:1.46668;
          display: block;
        }
      }
    }
  }
`;

export default Author;
