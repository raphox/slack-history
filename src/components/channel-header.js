import React, { Component } from 'react';
import qstring from 'query-string';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { filterSessionMessages } from 'actions';

import { Aside, Header } from 'variables/styles';

class ChannelHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  handlerQuery = () => {
    const query = qstring.parse(this.props.location.search);

    if (query && query.highlight) {
      this.setState({
        search: `#${query.highlight}`
      });
    }

    if (this.props.index && this.state.search) {
      const str = this.state.search.replace(/^(#|@)/, '');
      this.props.dispatch(filterSessionMessages(this.props.title, this.props.session, str, this.props.index));
    }
  }

  componentDidMount() {
    this.handlerQuery();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.handlerQuery();
    }
  }

  render() {
    const { title, session, isFetching} = this.props;

    return (
      <Header>
        <Aside style={{flex: 'auto', border: 'none'}}>
          <h1>{ title }</h1>
          {!isFetching &&
            <ul>
              <li><FontAwesomeIcon icon="user" fixedWidth/> { session.info.authors.length } authors</li>
              <li><FontAwesomeIcon icon="thumbtack" fixedWidth/> { session.messages.length } messages</li>
              <li>{ session.info.details }</li>
            </ul>}
        </Aside>
        <Search style={{border: 'none'}}>
          <FontAwesomeIcon icon="search" color="#a0a0a2" />
          <input type="text" placeholder="Search" value={this.state.search} />
        </Search>
      </Header>
    );
  }
}

const Search = Aside.extend`
  position: relative;

  svg {
    position: absolute;
    top: 12px;
    left: 10px;
  }

  input {
    padding: 2px 12px 2px 30px;
    display: flex;
    height: 35px;
    width: 365px;
    border-radius: 3px;
    border: 1px solid #a0a0a2;
    font-family: 'Font Awesome 5 Free', 'Lato', sans-serif;
  }
`;

export default connect()(ChannelHeader);
