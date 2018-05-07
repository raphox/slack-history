import React, { Component } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import '@fortawesome/fontawesome-free-solid';

import 'react-perfect-scrollbar/dist/css/styles.css';

import { Wrapper, Content, Footer } from 'variables/styles';

import AsideMenu from 'components/aside-menu';
import Channel from 'components/channel';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Wrapper>
          <Content>
            <AsideMenu />
            <Switch>
              <Redirect exact from='/' to="/qa/dan-abramov-201804"/>
              <Route path='/:session/:channel' component={Channel}/>
            </Switch>
          </Content>
          <Footer>
            <p align="center">
              Developed by <a href="http://me.qrimb.com/" target="_blank" rel="noopener noreferrer">raphox</a> with contribution by <a href="https://github.com/react-brasil" target="_blank" rel="noopener noreferrer">React Brasil</a>.
            </p>
          </Footer>
        </Wrapper>
      </HashRouter>
    );
  }
}

export default App;
