import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Avatar from 'react-avatar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { Aside } from 'variables/styles';

class ChannelSidebar extends Component {
  render() {
    const {title, session, isFetching} = this.props;

    return (
      <Aside>
        <h2>About #{title}</h2>

        {!isFetching &&
          <PerfectScrollbar>
            <h3><FontAwesomeIcon icon="info-circle" color="#717274" fixedWidth /> Details</h3>
            <div dangerouslySetInnerHTML={{__html: session.info.details}} />

            <h3><FontAwesomeIcon icon="bolt" color="#2d9ee0" fixedWidth /> Hightlights</h3>
            <ul className="highlights">
              {Object.keys(session.info.highlights).map((key) =>
                <li key={key}><Link to={`/channel/${title}?highlight=${key}`}>{key} ({session.info.highlights[key]})</Link></li>
              )}
            </ul>

            <h3><FontAwesomeIcon icon="user" color="#2ea664" fixedWidth /> Members</h3>
            <ul className="list-users">
              {session.info.authors.map((author) =>
                <li key={author}><Link to={`/author/${author}`}><Avatar name={author} size={20} />{author}</Link></li>
              )}
            </ul>
          </PerfectScrollbar>
        }
      </Aside>
    );
  }
}

export default ChannelSidebar;
