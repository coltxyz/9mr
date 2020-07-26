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
            activeFrameId="help"
            onLinkClick={ this.onLinkClick }
          />
          <div
            className="content-main"
            id="scrollContainer"
          >
            <div className="module" data-frameid="need" id="module--need">
              <div className="row">
                <div className="col col-1">
                  We provide free food for anyone in need.
                  <br/>
                  <br/>
                  Visit our pantry located at Evangel Church, 39-21 Crescent Street in Long Island City, NY 11101. We’re open from 9AM to 4PM Monday through Friday, and 9AM to 12PM on Saturdays.
                  <br/>
                  <br/>
                  Please note that the current wait time can be up to 4 hours long.
                  <br/>
                  <br/>
                  We recommend bringing:
                  <br/>
                  <ul>
                  <li>A cart that can carry 50 pounds of groceries or more</li>
                  <li>Water to help you stay hydrated</li>
                  <li>An umbrella, in the event of inclement weather</li>
                  </ul>

                  If you are unable to visit us in person and want to request free grocery delivery, please call us at (718) 361-5454. We will get food to you, but there could be a wait of 2 to 3 weeks.
                  <br/>
                  <br/>
                  Expect a variety of food: raw vegetables, fresh fruit, frozen meat and cheese, canned goods, grains, and milk. Things can change based on our donation, but we are able to provide one bag from each of our sections.

                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
