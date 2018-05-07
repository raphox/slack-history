import React, { Component } from 'react';
import styled from 'styled-components';
import Avatar from 'react-avatar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Aside } from 'variables/styles';

class ChannelSidebar extends Component {
  handlerClickMessage = (id) => {
    this.props.onClickMessage(document.getElementById(id).offsetTop);
  }

  renderMessage(message, question = false) {
    return (
      <li className="list_item message" key={message.id}
        onClick={() => this.handlerClickMessage(message.id)}>
        <div className="gutter">
          <Avatar name={message.username} size={36} />
        </div>
        <div className="content">
          {question && <FontAwesomeIcon icon="question" size="3x" color="white" pull="right"/>}
          <div className="content_header">
            <span className="sender">
              {message.username}
            </span>
          </div>
          <span className="body" dangerouslySetInnerHTML={{__html: this.truncateMessage(message.msg)}} />
        </div>
      </li>
    );
  }

  renderHighlight(key, term) {
      return (
        <li key={key} onClick={() => this.props.onClickFilter(`#${term.synonymous.join('|')}`)}>
          { this.props.selectedHighlights.includes(key)
            ? <a className="active">{key} ({term.count})</a>
            : <a>{key} ({term.count})</a>
          }
        </li>
      );
  }

  truncateMessage(message) {
    const maxlenght = 100;
    return (message.length > maxlenght) ? message.substr(0, maxlenght-1) + '&hellip;' : message;
  }

  render() {
    const {title, session, isFetching, search, match} = this.props;

    return (
      <Aside>
        {!isFetching && search && session.resultSearch &&
          <SearchResult>
            <h2>
              <FontAwesomeIcon icon="search" color="#717274" fixedWidth />
              Search results {session.resultSearch.length ? `(${session.resultSearch.length} messages)` : ''}:
            </h2>
            <PerfectScrollbar className="limited">
              {session.resultSearch.length > 0
                ? <ul className="list">{ session.resultSearch.map((message) => this.renderMessage(message))}</ul>
                : <p>No messages found.</p>
              }
            </PerfectScrollbar>
          </SearchResult>
        }

        <h2>About #{title}</h2>
        <PerfectScrollbar>
          {!isFetching && ['qa', 'channel'].indexOf(match.params.session) !== -1 &&
            <section>
              <h3><FontAwesomeIcon icon="info-circle" color="#717274" fixedWidth /> Details</h3>
              <div dangerouslySetInnerHTML={{__html: session.info.details}} />
            </section>
          }

          {!isFetching &&
            <section>
              <h3><FontAwesomeIcon icon="bolt" color="#2d9ee0" fixedWidth /> Hightlights ({Object.keys(session.info.highlights).length})</h3>
                <ul className="highlights">{Object.keys(session.info.highlights).map((key) =>
                  this.renderHighlight(key, session.info.highlights[key])
                )}</ul>
            </section>
          }

          {!isFetching && ['qa', 'channel'].indexOf(match.params.session) !== -1 &&
            <section>
              <h3><FontAwesomeIcon icon="user" color="#2ea664" fixedWidth /> Members ({session.info.authors.length})</h3>
              <ul className="list-users">
                {session.info.authors.map((author) =>
                  <li key={author} onClick={() => this.props.onClickFilter(`@${author}`)}>
                    { this.props.selectedAuthors.includes(author)
                      ? <a className="active"><Avatar name={author} size={20} />{author}</a>
                      : <a><Avatar name={author} size={20} />{author}</a>
                    }
                  </li>
                )}
              </ul>
            </section>
          }
        </PerfectScrollbar>
      </Aside>
    );
  }
}

const SearchResult = styled.section`
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
    margin: 12px 0;

    li.list_item.message {
      font-size: 15px;
      padding: 6px;

      &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }

      .gutter {
        width: 50px;
        padding-right: 8px;
        float: left;
        text-align: right;
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

          p { padding: 0; }
        }
      }
    }
  }
`;

export default ChannelSidebar;
