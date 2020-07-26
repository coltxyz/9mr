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
        <div className="scroll-hider">
          <Nav
            activeFrameId="donate"
            onLinkClick={ this.onLinkClick }
          />
          <div
            className="content-main"
            id="scrollContainer"
          >
            <div className="module" data-frameid="donate" id="module--donate">
              <div className="row">
                <div className="col col-1">
                  You can make tax deductible donations through our GoFundMe or through
                  our PayPal. If you choose PayPal, we get a greater percentage of the money, and encourage you to make a monthly contribution if you can
                  <br/>
                  <br/>
                  <br/>
                  &nbsp;&nbsp; Here is where your funds are going:
                  <br/>
                  <br/>
                </div>
              </div>
              <div className="row">
                <div className="col col-2">
                  <ul>
                    <li>Expand fridge space</li>
                    <li>Two box trucks</li>
                    <li>PPE for volunteers</li>
                    <li>Diapers and hygiene</li>
                    <li>Rice, beans, and fruit</li>
                    <li>Plastic Bags</li>
                    <li>Uline</li>
                    <li>Delivery expenses</li>
                    <li>Port-o-potty</li>
                  </ul>
                </div>
                <div className="col col-1">
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                  <div>$1000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
