import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Avatar from 'react-avatar';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { connect } from 'react-redux';
import { selectSession, fetchSessionIfNeeded, filterSessionMessages } from 'actions';

import { Wrapper, Content } from 'variables/styles';
import Header from 'components/channel-header';
import Sidebar from 'components/channel-sidebar';

class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      selectedHighlights: [],
      selectedAuthors: []
    }
  }

  componentDidMount() {
    this.props.fetchSessionIfNeeded();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.channel !== prevProps.title && this.props.match.params.channel) {
      this.props.fetchSessionIfNeeded();
      this.props.selectSession();

      this.setState({
        search: '',
        selectedHighlights: [],
        selectedAuthors: []
      });

      this.refs.contentScroll._container.scrollTop = 0;
    }
  }

  handlerClickMessage = (scrollTop) => {
    this.refs.contentScroll._container.scrollTop = scrollTop;
  }

  handlerFilter = (str) => {
    this.setState({
      search: '',
      selectedHighlights: [],
      selectedAuthors: []
    }, () => {
      let _str = String(str).replace(/^#|@/, '');

      if (str && str[0] === '#') this.setState({ selectedHighlights: [_str] });
      if (str && str[0] === '@') this.setState({ selectedAuthors: [_str] });

      this.setState({ search: str }, () => {
        this.props.filterSessionMessages(str);
      });
    });
  }

  render() {
    const { session, isFetching } = this.props;

    return (
      <Wrapper>
        <Header {...this.props}
          search={this.state.search}
          contentScroll={this.refs.contentScroll}
          onClickFilter={this.handlerFilter} />
        <Content>
          <Article>
            <PerfectScrollbar ref="contentScroll">
              <ul className="list">
                {!isFetching && session.messages.map((message) => this.renderMessage(message, true))}
              </ul>
            </PerfectScrollbar>
          </Article>
          <Sidebar {...this.props }
            search={this.state.search}
            selectedHighlights={this.state.selectedHighlights}
            selectedAuthors={this.state.selectedAuthors}
            onClickMessage={this.handlerClickMessage}
            onClickFilter={this.handlerFilter} />
        </Content>
      </Wrapper>
    );
  }

  renderAnswers(question) {
    if (question.messages && question.messages.length > 0) {
      return (
        <ul>
          { question.messages.map((message) => this.renderMessage(message))}
        </ul>
      );
    }
  }

  renderMessage(message, question = false) {
    return (
      <li className="list_item message" key={message.id} id={message.id}>
        <div className="gutter">
          <Link to={`/author/${message.username}`}>
            <Avatar name={message.username} size={36} />
          </Link>
        </div>
        <div className="content">
          <div className="content_header">
            <span className="sender">
              {message.username}
            </span>
          </div>
          <span className="body" dangerouslySetInnerHTML={{__html: message.msg}} />
        </div>
        { this.renderAnswers(message) }
      </li>
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

    &> li {
      padding-top: 20px !important;
    }

    li.list_item.message {
      font-size: 15px;
      padding: 6px 20px 6px 6px;

      ul {
        margin: 26px -20px -6px -6px;
        border-bottom: 1px dashed #e8e8e8;
      }

      &:hover {
        background-color: #f5f5f5;

        ul {
          background-color: #fff;
        }
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
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  const { selectedSession: title, sessionByTitle } = state
  const {
    isFetching,
    lastUpdated,
    data: session,
    index
  } = sessionByTitle[title] || {
    isFetching: true,
    data: []
  }

  return {
    title,
    session,
    index,
    isFetching,
    lastUpdated
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { session, index } = stateProps;
  const { dispatch } = dispatchProps;
  const { match } = ownProps;

  return {
    ...stateProps,
    ...ownProps,
    fetchSessionIfNeeded: () => dispatch(fetchSessionIfNeeded(match.params.channel, match.params.session)),
    selectSession: () => dispatch(selectSession(match.params.channel)),
    filterSessionMessages: (str) => {
      if (!index) return null;

      const docs = index.documentStore.docs;
      const founds = str
        ? index.search(str.split('|')[0])
        : [];

      // filter messages by ID from index search and convert `Object` to `Array`
      // and push `resultSearch` with result on current session
      session.resultSearch = Object.keys(docs).filter((i) => {
        const item = docs[i];
        return founds.filter((j) => j.ref === item.id).length > 0
      }).reduce((collection, key) => {
        collection.push(docs[key]);
        return collection;
      }, []);

      dispatch(filterSessionMessages(match.params.channel, session));
    },
  };
}

export default connect(mapStateToProps, null, mergeProps)(Channel);
