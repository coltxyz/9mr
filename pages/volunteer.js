import Router from 'next/router';
import { get } from 'dotty';
import { debounce } from 'throttle-debounce'

import Background from '../components/background.js';
import Nav from '../components/nav.js';
import "../styles/styles.scss";
// import { contentQuery } from '../lib/queries';
import Layout from '../components/layout';
// import sanity from '../lib/sanity'


export default class Home extends React.Component {

  render() {
    return (
      <Layout { ...this.props }>
        <div className="scroll-hider">
          <Nav
            activeFrameId="volunteer"
            onLinkClick={ this.onLinkClick }
          />
          <div
            className="content-main"
            id="scrollContainer"
          >
            <div className="module" data-frameid="volunteer" id="module--volunteer">
              <div className="row">
                <div className="col col-1">
                  We are always looking for volunteers to help at our food pantry located at Evangel Church in Long Island City. Our volunteers work on one of three projects: packing groceries, delivering them, and answering phone calls for orders.
                  <br/>
                  <br/>
                  To sign up:<br/>
                  <ul>
                    <li>Set up an account with New York Cares and complete the 10-minute orientation.</li>
                    <li>Use <a href="https://www.newyorkcares.org/search/projects/results?keywords=evangel%20church]">this link</a> to find a role and a shift that works for you</li>
                  </ul>
                  <br/>
                  Every shift has a limited number of sign-up slots available. If you don’t see any shifts for a particular day, it means that volunteer sign-ups are full—but we still might need help! Feel free to call us at 718-361-2817 to see if there are any cancellations, or pick a later date.
                  <br/>
                  <br/>
                  9 Million Reasons is committed to providing a safe, inclusive, and accessible working environment for all volunteers, including members of the LGBTQ+ community and people with disabilities (we can make accommodations). We do not tolerate sexual or racial harassment of any kind. In light of Covid-19, we are also following all current CDC guidelines to ensure the safety of our volunteers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
