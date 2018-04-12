import React, { Component } from 'react';

import { Wrapper, Content, Footer } from 'variables/styles';

import AsideMenu from 'components/aside-menu';
import Channel from 'components/channel';

import '@fortawesome/fontawesome-free-solid';

import 'react-perfect-scrollbar/dist/css/styles.css';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Content>
          <AsideMenu />
          <Channel />
        </Content>
        <Footer>
          <p align="center">
            Developed by <a href="http://me.qrimb.com/" target="_blank" rel="noopener noreferrer">raphox</a> with contribution by <a href="https://github.com/react-brasil" target="_blank" rel="noopener noreferrer">React Brasil</a>.
          </p>
        </Footer>
      </Wrapper>
    );
  }
}

export default App;
