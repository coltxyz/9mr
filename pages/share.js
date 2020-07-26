import Router from 'next/router';
import { get } from 'dotty';
import { debounce } from 'throttle-debounce'

import Background from '../components/background.js';
import Nav from '../components/nav.js';
import "../styles/styles.scss";
// import { contentQuery } from '../lib/queries';
import Layout from '../components/layout';
// import sanity from '../lib/sanity'


export default class Donate extends React.Component {

  render() {
    return (
      <Layout { ...this.props }>
        <Background activeFrameIde="home" />
        <div className="scroll-hider">
          <Nav
            activeFrameId="share"
            onLinkClick={ this.onLinkClick }
          />
          <div
            className="content-main"
            id="scrollContainer"
          >
            <div className="module space-between" data-frameid="home" id="module--home">
              <div className="row">
                <div className="col col-2">
                  We’re NYC’s largest, donation-based community food pantry. We provide free food for anyone in need.
                </div>
                <div className="col col-1">
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  Do you want to help us?
                </div>
                <div className="col col-1">
                  <ul>
                    <li>
                      <a href="/volunteer" data-frameid="volunteer" onClick={ this.onLinkClick }>Volunteer</a>
                    </li>
                    <li>
                      <a href="/donate" data-frameid="donate" onClick={ this.onLinkClick }>Donate</a>
                    </li>
                    <li>
                      <a href="/share" data-frameid="share" onClick={ this.onLinkClick }>Share</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  Do you need groceries?
                </div>
                <div className="col col-1">
                  <ul>
                    <li>
                      <a href="/food" data-frameid="need" onClick={ this.onLinkClick } >Get Food</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  Who are we?
                </div>
                <div className="col col-1">
                  <ul>
                    <li>
                      <a href="#about" data-frameid="about" onClick={ this.onLinkClick } >About</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
