import React, { Component } from 'react';
import Avatar from 'react-avatar';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Wrapper, Content } from 'variables/styles';
import { Header, Article, Aside, Search, AsideMenu, Footer } from 'variables/styles/appStyle';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';

import 'react-perfect-scrollbar/dist/css/styles.css';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Content>
          <AsideMenu>
            <h1>React Brasil <sub>Q&A</sub></h1>

            <PerfectScrollbar>
              <ol>
                <li>
                  <span className="title">Sessions</span>
                  <dl>
                    <a href="#" className="active">
                      <dt>raphael 2018-03</dt>
                      <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</dd>
                    </a>

                    <a href="#">
                      <dt>raphael 2018-03</dt>
                      <dd>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</dd>
                    </a>
                  </dl>
                </li>
                <li>
                  <span className="title">Autores</span>
                  <dl>
                    <a href="#" className="active">
                      <dt>raphael</dt>
                    </a>
                    <a href="#">
                      <dt>raphael</dt>
                    </a>
                  </dl>
                </li>
              </ol>
            </PerfectScrollbar>
          </AsideMenu>
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
              <Search style={{border: 'none'}}>
                <FontAwesomeIcon icon="search" color="#a0a0a2" />
                <input type="text" placeholder="Search" />
              </Search>
            </Header>
            <Content>
              <Article>
                <PerfectScrollbar>
                  <ul className="list">
                    <li className="list_item message">
                      <div className="gutter">
                        <a href="/team/U777SJDPE" target="_blank" className="avatar">
                          <Avatar name="sergiohpreis" size="36px" />
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
                          alguem sabe como indentifico esses casos:
                        </span>
                      </div>
                    </li>
                    <li className="list_item message">
                      <div className="gutter">
                        <a href="/team/U777SJDPE" target="_blank" className="avatar">
                        <Avatar name="sergio almeida" size="36px" />
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
                          <Avatar src="https://ca.slack-edge.com/T1EEGNUP4-U777SJDPE-5689266c484e-48" size="36px" />
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
              <Aside>
                <PerfectScrollbar>
                  <h2>About #channel</h2>

                  <h3><FontAwesomeIcon icon="info-circle" color="#717274" fixedWidth /> Details</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras maximus, magna eget suscipit tincidunt, libero est accumsan lorem, et rhoncus libero turpis vitae lectus. Etiam in nunc et risus aliquam aliquam. Sed et ligula non augue ultrices ullamcorper. Aenean hendrerit risus at ligula vehicula, eu vestibulum velit viverra. Curabitur eu est ullamcorper, tincidunt nisi id, luctus massa. Fusce eu metus vitae nulla pulvinar hendrerit. Mauris porta nulla vitae suscipit imperdiet.</p>

                  <h3><FontAwesomeIcon icon="bolt" color="#2d9ee0" fixedWidth /> Hightlights</h3>
                  <ul className="highlights">
                    <li><a href="/tags/react">React (2)</a></li>
                    <li><a href="/tags/react">Node (1)</a></li>
                    <li><a href="/tags/react">Javascript (1)</a></li>
                  </ul>

                  <h3><FontAwesomeIcon icon="user" color="#2ea664" fixedWidth /> Members</h3>

                  <ul className="list-users">
                    <li><a href="/author/raphox"><Avatar name="raphox" size="20px" />raphox</a></li>
                    <li><a href="/author/raphox"><Avatar name="renato" size="20px" />renato</a></li>
                    <li><a href="/author/raphox"><Avatar name="joao" size="20px" />joao</a></li>
                  </ul>
                </PerfectScrollbar>
              </Aside>
            </Content>
          </Wrapper>
        </Content>
        <Footer>
          <p align="center">
            Developed by <a href="/author/raphox">raphox</a> with contribution by <a href="http://www.reactbrasil.com.br">React Brasil</a>.
          </p>
        </Footer>
      </Wrapper>
    );
  }
}

export default App;
